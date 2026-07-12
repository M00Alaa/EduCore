import { Component, DestroyRef, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, distinctUntilChanged, finalize, take } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { FilterConfig } from 'src/app/shared/components/search-filter/search-filter.component';
import { exportToExcel, ExportColumn, errorCallback, SWALConfirmation, noWhitespaceValidator } from 'src/app/app-const';
import { EquipmentService } from 'src/app/core/backend/academy/services/equipment.service';
import {
    AssetMainCategory,
    AssetStatusOption,
    AssetSubCategory,
    MainCategoryPayload,
    SubCategoryPayload,
    SelectOption
} from 'src/app/core/backend/academy/models/equipment.model';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'mo-classifications',
    standalone: false,
    templateUrl: './classifications.component.html',
    styleUrl: './classifications.component.scss'
})
export class ClassificationsComponent implements OnInit {
    @ViewChild('addClassificationModal') addClassificationModal!: TemplateRef<any>;
    @ViewChild('viewSubClassificationsModal') viewSubClassificationsModal!: TemplateRef<any>;

    private readonly search$ = new Subject<string>();
    private readonly destroyRef = inject(DestroyRef);
    private classificationModalRef?: NgbModalRef;
    private currentAcademyId = '';
    editingCategoryId: number | null = null;
    private subCategoriesByMainCategory = new Map<number, AssetSubCategory[]>();

    _page = 1;
    _pageSize = 10;
    _total = 0;
    isLoading = false;
    isSaving = false;
    isLoadingSubCategories = false;
    isLoadingSubClassifications = false;

    classificationsList: AssetMainCategory[] = [];
    filteredClassifications: AssetMainCategory[] = [];
    selectedClassification: {
        id: number;
        name: string;
        subClassifications: Array<{ id: number; name: string }>;
    } | null = null;

    private activeFilters: any = {};
    private searchTerm = '';

    statusFilterOptions: SelectOption<number>[] = [];
    filterConfigs: FilterConfig[] = [
        {
            key: 'status',
            label: 'SHARED.FILTERS.STATUS',
            type: 'select',
            placeholder: 'SHARED.FILTERS.SELECT_STATUS',
            options: []
        }
    ];

    classificationForm = this.fb.group({
        name_ar: ['', [Validators.required, noWhitespaceValidator]],
        description: [''],
        subClassifications: this.fb.array([])
    });

    constructor(
        private modalService: NgbModal,
        private fb: FormBuilder,
        private equipmentService: EquipmentService,
        private authService: AuthenticationService,
        private translate: TranslateService
    ) { }

    ngOnInit(): void {
        this.search$
            .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
            .subscribe((value) => {
                this.searchTerm = value || '';
                this.loadData(1);
            });

        this.authService.identity()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.currentAcademyId = this.academyId;
                if (!this.currentAcademyId) {
                    return;
                }

                this.loadData(1);
                this.loadLookups();
            });
    }

    get subClassificationsArray(): FormArray {
        return this.classificationForm.get('subClassifications') as FormArray;
    }

    createSubClassificationFormGroup(subCategory?: AssetSubCategory): FormGroup {
        return this.fb.group({
            id: [subCategory?.id ?? null],
            name_ar: [subCategory?.name_ar ?? '', [Validators.required, noWhitespaceValidator]],
            status: [subCategory?.status?.id ?? 1]
        });
    }

    addSubClassification(): void {
        this.subClassificationsArray.push(this.createSubClassificationFormGroup());
    }

    removeSubClassification(index: number): void {
        if (index < 0 || index >= this.subClassificationsArray.length) {
            return;
        }

        this.subClassificationsArray.removeAt(index);
    }

    onSearch(searchTerm: string): void {
        this.search$.next(searchTerm || '');
    }

    onApplyFilters(filterValues: any): void {
        this.activeFilters = filterValues || {};
        this.loadData(1);
    }

    onResetFilters(): void {
        this.activeFilters = {};
        this.searchTerm = '';
        this.loadData(1);
    }

    onExport(event?: Event): void {
        const button = event?.target as HTMLElement;
        const dateStr = this.getExportDate();

        const columns: ExportColumn[] = [
            { header: this.translate.instant('EQUIPMENT.EXPORT_CLASSIFICATIONS_COLUMNS.NAME'), key: 'name', width: 25 },
            { header: this.translate.instant('EQUIPMENT.EXPORT_CLASSIFICATIONS_COLUMNS.DESCRIPTION'), key: 'description', width: 40 },
            { header: this.translate.instant('EQUIPMENT.EXPORT_CLASSIFICATIONS_COLUMNS.SUB_CLASSIFICATIONS_COUNT'), key: 'subClassificationsCount', width: 20 }
        ];

        const exportRows = this.filteredClassifications.map((classification) => ({
            name: classification.display_name || classification.name_ar,
            description: classification.description || '-',
            subClassificationsCount: classification.sub_categories_count || 0
        }));

        exportToExcel(exportRows, columns, {
            fileName: this.translate.instant('EQUIPMENT.EXPORT_CLASSIFICATIONS_FILE_NAME', { date: dateStr }),
            sheetName: this.translate.instant('EQUIPMENT.EXPORT_CLASSIFICATIONS_SHEET_NAME'),
            button: button
        });
    }

    openAddClassificationModal(): void {
        this.editingCategoryId = null;
        this.classificationForm.reset({
            name_ar: '',
            description: ''
        });
        this.subClassificationsArray.clear();
        this.addSubClassification();
        this.classificationModalRef = this.modalService.open(this.addClassificationModal, { size: 'lg', centered: true });
    }

    editClassification(classification: AssetMainCategory): void {
        this.editingCategoryId = classification.id;
        this.classificationForm.reset({
            name_ar: classification.name_ar || classification.display_name || '',
            description: classification.description || ''
        });
        this.subClassificationsArray.clear();
        this.isLoadingSubCategories = true;

        this.classificationModalRef = this.modalService.open(this.addClassificationModal, { size: 'lg', centered: true });

        this.ensureSubCategoriesLoaded(classification.id, (subCategories) => {
            if (!subCategories.length) {
                this.addSubClassification();
            } else {
                subCategories.forEach((subCategory) => {
                    this.subClassificationsArray.push(this.createSubClassificationFormGroup(subCategory));
                });
            }
            this.isLoadingSubCategories = false;
        });
    }

    deleteClassification(classification: AssetMainCategory): void {
        if (!classification?.id) {
            return;
        }

        SWALConfirmation(
            'warning',
            'SHARED.DELETE.WARNING_TITLE',
            this.equipmentService.deleteMainCategory(classification.id),
            'SHARED.DELETE.SUCCESS_MESSAGE',
            'SHARED.DELETE.CONFIRM_BUTTON',
            'SHARED.DELETE.WARNING_TEXT'
        ).then((res) => {
            if (res) {
                this.subCategoriesByMainCategory.clear();
                // this.equipmentService.invalidateLookups(this.currentAcademyId);
                this.loadLookups(true);
                this.loadData();
            }
        });
    }

    viewSubClassifications(classification: AssetMainCategory): void {
        this.selectedClassification = null;
        this.isLoadingSubClassifications = true;
        this.modalService.open(this.viewSubClassificationsModal, { size: 'md', centered: true });
        this.ensureSubCategoriesLoaded(classification.id, (subCategories) => {
            this.selectedClassification = {
                id: classification.id,
                name: classification.display_name || classification.name_ar,
                subClassifications: subCategories.map((subCategory) => ({
                    id: subCategory.id,
                    name: subCategory.display_name || subCategory.name_ar
                }))
            };
            this.isLoadingSubClassifications = false;
        });
    }

    saveClassification(): void {
        if (this.classificationForm.invalid) {
            this.markClassificationFormAsTouched();
            return;
        }

        if (!this.currentAcademyId) {
            return;
        }

        const payload = this.buildPayloadFromForm();
        if (!payload) {
            return;
        }

        this.isSaving = true;

        const request$ = this.editingCategoryId
            ? this.equipmentService.updateMainCategory(this.editingCategoryId, payload)
            : this.equipmentService.createMainCategory(this.currentAcademyId, payload);

        request$
            .pipe(
                take(1),
                finalize(() => {
                    this.isSaving = false;
                })
            )
            .subscribe({
                next: () => {
                    this.classificationModalRef?.close();
                    this.subCategoriesByMainCategory.clear();
                    // this.equipmentService.invalidateLookups(this.currentAcademyId);
                    this.loadLookups(true);
                    this.loadData();
                },
                error: (error) => errorCallback(error),
            });
    }

    loadData(page: number = this._page): void {
        this._page = page;

        if (!this.currentAcademyId) {
            return;
        }

        this.isLoading = true;

        this.equipmentService
            .listMainCategories(this.currentAcademyId, {
                page: this._page,
                per_page: this._pageSize,
                search: this.searchTerm || undefined,
                status: this.parseNullableNumber(this.activeFilters?.status),
            })
            .pipe(
                take(1),
                finalize(() => {
                    this.isLoading = false;
                })
            )
            .subscribe({
                next: (response) => {
                    this.classificationsList = response.items || [];
                    this.filteredClassifications = response.items || [];
                    this._total = response.meta.total;
                    this._page = response.meta.current_page;
                    this._pageSize = response.meta.per_page || this._pageSize;
                },
                error: (error) => errorCallback(error),
            });
    }

    private loadLookups(forceRefresh = false): void {
        if (!this.currentAcademyId) {
            return;
        }

        if (forceRefresh) {
            this.subCategoriesByMainCategory.clear();
        }

        this.equipmentService
            .getAssetLookups(this.currentAcademyId)
            .pipe(take(1))
            .subscribe({
                next: (lookups) => {
                    this.statusFilterOptions = (lookups.statuses || []).map((status: AssetStatusOption) => ({
                        label: status.name,
                        value: status.id
                    }));
                    this.syncFilterConfigs();
                },
                error: () => {
                    // lookups are optional in this tab; list endpoint still works without them
                },
            });
    }

    private ensureSubCategoriesLoaded(
        mainCategoryId: number,
        callback: (subCategories: AssetSubCategory[]) => void
    ): void {
        const cachedSubCategories = this.subCategoriesByMainCategory.get(mainCategoryId);
        if (cachedSubCategories) {
            callback(cachedSubCategories);
            return;
        }

        if (!this.currentAcademyId) {
            callback([]);
            return;
        }

        this.equipmentService
            .listSubCategories(this.currentAcademyId, { main_category_id: mainCategoryId })
            .pipe(take(1))
            .subscribe({
                next: (subCategories) => {
                    this.subCategoriesByMainCategory.set(mainCategoryId, subCategories);
                    callback(subCategories);
                },
                error: (error) => {
                    errorCallback(error);
                    callback([]);
                },
            });
    }

    private buildPayloadFromForm(): MainCategoryPayload | null {
        const formValue = this.classificationForm.getRawValue();
        const nameAr = (formValue.name_ar || '').trim();

        if (!nameAr) {
            return null;
        }

        const subCategoriesPayload = this.subClassificationsArray.controls.reduce<SubCategoryPayload[]>((items, control) => {
            const value = control.getRawValue();
            const subCategoryName = (value.name_ar || '').trim();

            if (!subCategoryName) {
                return items;
            }

            const subCategoryPayload: SubCategoryPayload = {
                name_ar: subCategoryName,
                status: this.parseNullableNumber(value.status) ?? 1
            };

            const subCategoryId = this.parseNullableNumber(value.id);
            if (subCategoryId !== null) {
                subCategoryPayload.id = subCategoryId;
            }

            items.push(subCategoryPayload);
            return items;
        }, []);

        return {
            name_ar: nameAr,
            description: formValue.description ? String(formValue.description).trim() : null,
            sub_categories: subCategoriesPayload,
            status: 1,
        };
    }

    private markClassificationFormAsTouched(): void {
        Object.keys(this.classificationForm.controls).forEach((key) => {
            const control = this.classificationForm.get(key);
            if (control instanceof FormArray) {
                control.controls.forEach((group) => {
                    Object.keys((group as FormGroup).controls).forEach((field) => {
                        const fieldControl = (group as FormGroup).get(field);
                        fieldControl?.markAsTouched();
                        fieldControl?.updateValueAndValidity();
                    });
                });
            } else {
                control?.markAsTouched();
                control?.updateValueAndValidity();
            }
        });
    }

    private parseNullableNumber(value: unknown): number | null {
        if (value === null || value === undefined || value === '') {
            return null;
        }

        const parsed = Number(value);
        return Number.isNaN(parsed) ? null : parsed;
    }

    private syncFilterConfigs(): void {
        this.filterConfigs = [
            {
                key: 'status',
                label: 'SHARED.FILTERS.STATUS',
                type: 'select',
                placeholder: 'SHARED.FILTERS.SELECT_STATUS',
                options: this.statusFilterOptions
            }
        ];
    }

    private get academyId(): string {
        const user = this.authService.currentUserValue as any;
        const id = user?.academy_id ?? user?.profile?.academy_id ?? user?.academy?.id ?? null;
        return id ? String(id) : '';
    }

    private getExportDate(): string {
        const currentDate = new Date();
        return currentDate.getFullYear() +
            String(currentDate.getMonth() + 1).padStart(2, '0') +
            String(currentDate.getDate()).padStart(2, '0');
    }
}
