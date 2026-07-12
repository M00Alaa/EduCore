import { Component, DestroyRef, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, distinctUntilChanged, finalize, take } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { FilterConfig } from 'src/app/shared/components/search-filter/search-filter.component';
import { exportToExcel, ExportColumn, errorCallback, SWALConfirmation, noWhitespaceValidator } from 'src/app/app-const';
import { EquipmentService } from 'src/app/core/backend/academy/services/equipment.service';
import {
    AssetItem,
    AssetMainCategory,
    AssetOption,
    AssetPayload,
    AssetSubCategory,
    SelectOption
} from 'src/app/core/backend/academy/models/equipment.model';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'mo-equipment-list',
    standalone: false,
    templateUrl: './equipment-list.component.html',
    styleUrl: './equipment-list.component.scss'
})
export class EquipmentListComponent implements OnInit {
    @ViewChild('addEquipmentModal') addEquipmentModal!: TemplateRef<any>;
    @ViewChild('viewEquipmentModal') viewEquipmentModal!: TemplateRef<any>;

    private readonly search$ = new Subject<string>();
    private readonly destroyRef = inject(DestroyRef);
    editingAssetId: number | null = null;
    private currentAcademyId = '';

    _page = 1;
    _pageSize = 10;
    _total = 0;
    isLoading = false;
    isSaving = false;
    isLoadingLookups = false;
    selectedEquipment: AssetItem | null = null;
    viewEquipmentTab = 'details';

    equipmentList: AssetItem[] = [];
    filteredEquipment: AssetItem[] = [];
    mainCategories: AssetMainCategory[] = [];
    allSubCategories: AssetSubCategory[] = [];
    purchaseConditionOptions: AssetOption[] = [];
    operationStatusOptions: AssetOption[] = [];
    mainCategoryOptions: SelectOption<number>[] = [];
    subCategoryOptions: SelectOption<number>[] = [];
    purchaseConditionSelectOptions: SelectOption<string>[] = [];
    operationStatusSelectOptions: SelectOption<string>[] = [];

    private activeFilters: any = {};
    private searchTerm = '';

    // Filter configuration
    filterConfigs: FilterConfig[] = [
        {
            key: 'main_category_id',
            label: 'EQUIPMENT.FILTERS.CLASSIFICATION',
            type: 'select',
            placeholder: 'EQUIPMENT.FILTERS.SELECT_CLASSIFICATION',
            options: []
        },
        {
            key: 'purchase_condition',
            label: 'EQUIPMENT.FILTERS.PURCHASE_STATUS',
            type: 'select',
            placeholder: 'EQUIPMENT.FILTERS.SELECT_PURCHASE_STATUS',
            options: []
        }
    ];

    equipmentForm = this.fb.group({
        identification_number: ['', [Validators.required, Validators.maxLength(100)]],
        name: ['', [Validators.required, noWhitespaceValidator]],
        main_category_id: [null as number | null, [Validators.required]],
        sub_category_id: [null as number | null],
        brand: [''],
        purchase_condition: [null as string | null, [Validators.required]],
        purchase_price: [0, [Validators.min(0)]],
        operation_status: [null as string | null, [Validators.required]],
        quantity: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
        notes: ['']
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

        this.equipmentForm.get('main_category_id')?.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((mainCategoryId) => {
                this.setSubCategoryOptions(mainCategoryId ? Number(mainCategoryId) : null);
            });

        this.authService.identity()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.currentAcademyId = this.academyId;
                if (!this.currentAcademyId) {
                    return;
                }

                this.loadLookups();
                this.loadData(1);
            });
    }

    onSearch(searchTerm: string): void {
        this.search$.next(searchTerm || '');
    }

    onApplyFilters(filterValues: any) {
        this.activeFilters = filterValues || {};
        this.loadData(1);
    }

    onResetFilters() {
        this.activeFilters = {};
        this.searchTerm = '';
        this.loadData(1);
    }

    onExport(event?: Event): void {
        const button = event?.target as HTMLElement;
        const dateStr = this.getExportDate();

        const columns: ExportColumn[] = [
            { header: this.translate.instant('EQUIPMENT.EXPORT_COLUMNS.ID_NUMBER'), key: 'identificationNumber', width: 20 },
            { header: this.translate.instant('EQUIPMENT.EXPORT_COLUMNS.NAME'), key: 'name', width: 25 },
            { header: this.translate.instant('EQUIPMENT.EXPORT_COLUMNS.CLASSIFICATION'), key: 'classification', width: 20 },
            { header: this.translate.instant('EQUIPMENT.EXPORT_COLUMNS.BRAND'), key: 'brand', width: 20 },
            { header: this.translate.instant('EQUIPMENT.EXPORT_COLUMNS.PURCHASE_STATUS'), key: 'purchaseStatus', width: 15 },
            { header: this.translate.instant('EQUIPMENT.EXPORT_COLUMNS.PURCHASE_PRICE'), key: 'purchasePrice', width: 15 },
            { header: this.translate.instant('EQUIPMENT.EXPORT_COLUMNS.OPERATION_STATUS'), key: 'operationStatus', width: 15 },
            { header: this.translate.instant('EQUIPMENT.EXPORT_COLUMNS.QUANTITY'), key: 'quantity', width: 10 }
        ];

        const exportRows = this.filteredEquipment.map((item) => ({
            identificationNumber: item.identification_number,
            name: item.name,
            classification: item.main_category?.display_name || '-',
            brand: item.brand || '-',
            purchaseStatus: item.purchase_condition?.label || '-',
            purchasePrice: item.purchase_price ?? 0,
            operationStatus: item.operation_status?.label || '-',
            quantity: item.quantity ?? 1,
        }));

        exportToExcel(exportRows, columns, {
            fileName: this.translate.instant('EQUIPMENT.EXPORT_FILE_NAME', { date: dateStr }),
            sheetName: this.translate.instant('EQUIPMENT.EXPORT_SHEET_NAME'),
            button: button
        });
    }

    openAddEquipmentModal(): void {
        this.editingAssetId = null;
        this.resetEquipmentForm();
        this.modalService.open(this.addEquipmentModal, { size: 'lg', centered: true });
    }

    editEquipment(equipment: AssetItem): void {
        this.editingAssetId = equipment.id;
        this.resetEquipmentForm(equipment);
        this.modalService.open(this.addEquipmentModal, { size: 'lg', centered: true });
    }

    viewEquipment(equipment: AssetItem): void {
        this.selectedEquipment = equipment;
        this.viewEquipmentTab = 'details';
        this.modalService.open(this.viewEquipmentModal, { size: 'lg', centered: true });
    }

    deleteEquipment(equipment: AssetItem): void {
        if (!equipment?.id) {
            return;
        }

        SWALConfirmation(
            'warning',
            'SHARED.DELETE.WARNING_TITLE',
            this.equipmentService.deleteAsset(equipment.id),
            'SHARED.DELETE.SUCCESS_MESSAGE',
            'SHARED.DELETE.CONFIRM_BUTTON',
            'SHARED.DELETE.WARNING_TEXT'
        ).then((res) => {
            if (res) {
                this.loadData();
            }
        });
    }

    saveEquipment(): void {
        if (this.equipmentForm.invalid) {
            Object.keys(this.equipmentForm.controls).forEach(key => {
                const control = this.equipmentForm.get(key);
                control?.markAsTouched();
                control?.updateValueAndValidity();
            });
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

        if (this.editingAssetId) {
            this.equipmentService
                .updateAsset(this.editingAssetId, payload)
                .pipe(
                    take(1),
                    finalize(() => {
                        this.isSaving = false;
                    })
                )
                .subscribe({
                    next: () => {
                        this.modalService.dismissAll();
                        this.loadData();
                    },
                    error: (error: unknown) => errorCallback(error),
                });

            return;
        }

        this.equipmentService
            .createAsset(this.currentAcademyId, payload)
            .pipe(
                take(1),
                finalize(() => {
                    this.isSaving = false;
                })
            )
            .subscribe({
                next: () => {
                    this.modalService.dismissAll();
                    this.loadData();
                },
                error: (error: unknown) => errorCallback(error),
            });
    }

    loadData(page: number = this._page): void {
        this._page = page;

        if (!this.currentAcademyId) {
            return;
        }

        this.isLoading = true;

        this.equipmentService
            .listAssets(this.currentAcademyId, {
                page: this._page,
                per_page: this._pageSize,
                search: this.searchTerm || undefined,
                main_category_id: this.parseNullableNumber(this.activeFilters?.main_category_id),
                purchase_condition: this.activeFilters?.purchase_condition || undefined,
            })
            .pipe(
                take(1),
                finalize(() => {
                    this.isLoading = false;
                })
            )
            .subscribe({
                next: (response) => {
                    this.equipmentList = response.items || [];
                    this.filteredEquipment = response.items || [];
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

        this.isLoadingLookups = true;

        this.equipmentService
            .getAssetLookups(this.currentAcademyId)
            .pipe(
                take(1),
                finalize(() => {
                    this.isLoadingLookups = false;
                })
            )
            .subscribe({
                next: (lookups) => {
                    this.mainCategories = lookups.main_categories || [];
                    this.allSubCategories = lookups.sub_categories || [];
                    this.purchaseConditionOptions = lookups.purchase_conditions || [];
                    this.operationStatusOptions = lookups.operation_statuses || [];

                    this.mainCategoryOptions = this.mainCategories.map((category) => ({
                        label: category.display_name || category.name_ar,
                        value: category.id,
                    }));
                    this.purchaseConditionSelectOptions = this.purchaseConditionOptions.map((option) => ({
                        label: option.label,
                        value: option.key,
                    }));
                    this.operationStatusSelectOptions = this.operationStatusOptions.map((option) => ({
                        label: option.label,
                        value: option.key,
                    }));

                    this.setSubCategoryOptions(
                        this.parseNullableNumber(this.equipmentForm.get('main_category_id')?.value)
                    );
                    this.syncFilterOptions();

                    const purchaseConditionControl = this.equipmentForm.get('purchase_condition');
                    if (!purchaseConditionControl?.value && this.purchaseConditionSelectOptions[0]) {
                        purchaseConditionControl?.setValue(this.purchaseConditionSelectOptions[0].value, { emitEvent: false });
                    }

                    const operationStatusControl = this.equipmentForm.get('operation_status');
                    if (!operationStatusControl?.value && this.operationStatusSelectOptions[0]) {
                        operationStatusControl?.setValue(this.operationStatusSelectOptions[0].value, { emitEvent: false });
                    }
                },
                error: (error) => errorCallback(error),
            });
    }

    private syncFilterOptions(): void {
        this.filterConfigs = [
            {
                key: 'main_category_id',
                label: 'EQUIPMENT.FILTERS.CLASSIFICATION',
                type: 'select',
                placeholder: 'EQUIPMENT.FILTERS.SELECT_CLASSIFICATION',
                options: this.mainCategoryOptions,
            },
            {
                key: 'purchase_condition',
                label: 'EQUIPMENT.FILTERS.PURCHASE_STATUS',
                type: 'select',
                placeholder: 'EQUIPMENT.FILTERS.SELECT_PURCHASE_STATUS',
                options: this.purchaseConditionSelectOptions,
            }
        ];
    }

    private setSubCategoryOptions(mainCategoryId: number | null): void {
        if (!mainCategoryId) {
            this.subCategoryOptions = [];
            this.equipmentForm.patchValue({ sub_category_id: null }, { emitEvent: false });
            return;
        }

        this.subCategoryOptions = this.allSubCategories
            .filter((subCategory) => subCategory.main_category_id === mainCategoryId)
            .map((subCategory) => ({
                label: subCategory.display_name || subCategory.name_ar,
                value: subCategory.id,
            }));

        const selectedSubCategoryId = this.parseNullableNumber(this.equipmentForm.get('sub_category_id')?.value);
        const subCategoryExists = this.subCategoryOptions.some((option) => option.value === selectedSubCategoryId);

        if (!subCategoryExists) {
            this.equipmentForm.patchValue({ sub_category_id: null }, { emitEvent: false });
        }
    }

    private resetEquipmentForm(asset?: AssetItem): void {
        if (!asset) {
            this.equipmentForm.reset({
                identification_number: '',
                name: '',
                main_category_id: null,
                sub_category_id: null,
                brand: '',
                purchase_condition: this.purchaseConditionSelectOptions[0]?.value ?? null,
                purchase_price: 0,
                operation_status: this.operationStatusSelectOptions[0]?.value ?? null,
                quantity: 1,
                notes: '',
            });
            this.subCategoryOptions = [];
            return;
        }

        this.equipmentForm.reset({
            identification_number: asset.identification_number,
            name: asset.name,
            main_category_id: asset.main_category_id,
            sub_category_id: asset.sub_category_id ?? null,
            brand: asset.brand ?? '',
            purchase_condition: asset.purchase_condition?.key ?? this.purchaseConditionSelectOptions[0]?.value ?? null,
            purchase_price: asset.purchase_price ?? 0,
            operation_status: asset.operation_status?.key ?? this.operationStatusSelectOptions[0]?.value ?? null,
            quantity: asset.quantity ?? 1,
            notes: asset.notes ?? '',
        });

        this.setSubCategoryOptions(asset.main_category_id);
    }

    private buildPayloadFromForm(): AssetPayload | null {
        const formValue = this.equipmentForm.getRawValue();
        const identificationNumber = (formValue.identification_number || '').trim();
        const name = (formValue.name || '').trim();
        const mainCategoryId = this.parseNullableNumber(formValue.main_category_id);
        const subCategoryId = this.parseNullableNumber(formValue.sub_category_id);
        const purchaseCondition = formValue.purchase_condition || '';
        const operationStatus = formValue.operation_status || '';

        if (!identificationNumber || !name || !mainCategoryId || !purchaseCondition || !operationStatus) {
            return null;
        }

        const purchasePrice = Number(formValue.purchase_price ?? 0);
        const quantity = Number(formValue.quantity ?? 1);

        return {
            identification_number: identificationNumber,
            name,
            main_category_id: mainCategoryId,
            sub_category_id: subCategoryId,
            brand: formValue.brand ? String(formValue.brand).trim() : null,
            purchase_condition: purchaseCondition,
            purchase_price: Number.isNaN(purchasePrice) ? 0 : purchasePrice,
            operation_status: operationStatus,
            quantity: Number.isNaN(quantity) ? 1 : Math.max(1, quantity),
            notes: formValue.notes ? String(formValue.notes).trim() : null,
            status: 1,
        };
    }


    private parseNullableNumber(value: unknown): number | null {
        if (value === null || value === undefined || value === '') {
            return null;
        }

        const parsedValue = Number(value);
        return Number.isNaN(parsedValue) ? null : parsedValue;
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
