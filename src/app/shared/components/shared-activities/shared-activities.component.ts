import { Component, DestroyRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, forkJoin, of } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FilterConfig, SearchFilterComponent } from 'src/app/shared/components/search-filter/search-filter.component';
import { exportToExcel, ExportColumn, errorCallback, SWALConfirmation, noWhitespaceValidator } from 'src/app/app-const';
import { SportsService, TeamPositionsService } from 'src/app/core/backend/common/services';
import {
  SportsGetAllSportsResponseDataItem,
  SportsGetAllSportsResponseDataItemSkillsItem,
  SportsGetAvailableSkillsResponseDataItem,
  SportsGetAvailableSkillsResponseDataItemSkillsItem
} from 'src/app/core/backend/common/models';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CredentialsModalComponent } from 'src/app/shared/components/credentials-modal/credentials-modal.component';
import { TeamPosition } from 'src/app/core/backend/academy/models/team-position';
import { NzFormModule } from 'ng-zorro-antd/form';
import { PermissionDirective } from "../../directives/permission.directive";
import { FormSharedModule } from "../../modules/nz-form-full/nz-form-full.module";
import { ScrollXComponent } from "../scroll-x/scroll-x.component";
import { NzColorPickerComponent } from "ng-zorro-antd/color-picker";
import { NzCollapseComponent, NzCollapsePanelComponent } from "ng-zorro-antd/collapse";
import { NzSpinComponent } from "ng-zorro-antd/spin";

@Component({
  selector: 'mo-shared-activities',
  imports: [TranslateModule, NzFormModule, FormsModule, ReactiveFormsModule, SearchFilterComponent, PermissionDirective, FormSharedModule, ScrollXComponent, NzColorPickerComponent, NzCollapseComponent, NzCollapsePanelComponent, NzSpinComponent],
  templateUrl: './shared-activities.component.html',
  styleUrl: './shared-activities.component.scss'
})
export class SharedActivitiesComponent {
  @Input() set permPrefix(value: string) {
    this.addPerm = `${value}.add`;
    this.editPerm = `${value}.edit`;
    this.deletePerm = `${value}.delete`;
  }
  addPerm = 'activities.add';
  editPerm = 'activities.edit';
  deletePerm = 'activities.delete';

  @ViewChild('activityModal') activityModal!: TemplateRef<any>;
  @ViewChild('detailsModal') detailsModal!: TemplateRef<any>;
  @ViewChild('skillsModal') skillsModal!: TemplateRef<any>;
  @ViewChild('skillModal') skillModal!: TemplateRef<any>;
  @ViewChild('categoryModal') categoryModal!: TemplateRef<any>;
  @ViewChild('successModal') successModal!: TemplateRef<any>;
  @ViewChild('centersModal') centersModal!: TemplateRef<any>;
  @ViewChild('viewCentersModal') viewCentersModal!: TemplateRef<any>;
  @ViewChild('positionsModal') positionsModal!: TemplateRef<any>;
  @ViewChild('viewPositionsModal') viewPositionsModal!: TemplateRef<any>;

  searchTerm = '';
  form!: FormGroup;
  skillSearchTerm = '';
  selectedCategoryId: number | null = null;
  selectedSportId: number | null = null;
  isLoading = false;
  isSaving = false;
  isSkillsLoading = false;

  // Pagination properties
  _page = 1;
  _pageSize = 10;
  _total = 0;

  private academySportsBySportId = new Map<number, SportsGetAllSportsResponseDataItem>();
  private selectedSkillIdsBySportId = new Map<number, Set<number>>();
  private centersBySportId = new Map<number, TeamPosition[]>();
  private currentSkillsSportId: number | null = null;

  skillForm = this.fb.group({
    title: ['', [Validators.required, noWhitespaceValidator]],
    categoryId: [null as number | null, [Validators.required]]
  });

  categoryForm = this.fb.group({
    title: ['', [Validators.required, noWhitespaceValidator]]
  });

  centersForm = this.fb.group({
    centers: this.fb.array([]) as FormArray
  });

  positionsForm = this.fb.group({
    positions: this.fb.array([]) as FormArray
  });

  private skillModalRef?: NgbModalRef;
  private categoryModalRef?: NgbModalRef;
  private centersModalRef?: NgbModalRef;
  private positionsModalRef?: NgbModalRef;
  selectedActivity: SportsGetAllSportsResponseDataItem | null = null;
  selectedActivityForCenters: SportsGetAllSportsResponseDataItem | null = null;
  selectedActivityForPositions: SportsGetAllSportsResponseDataItem | null = null;
  isEditMode = false;
  positionsData: Array<{ id?: number; nameAr: string; nameEn: string }> = [];

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private sportsService: SportsService,
    private authService: AuthenticationService,
    private teamPositionsService: TeamPositionsService,
    private destroyRef: DestroyRef,
    public translate: TranslateService
  ) {
    this.form = this.fb.group({
      primaryColor: ['#2563EB']
    });
  }

  ngOnInit(): void {
    this.filterConfigs = [
      {
        key: 'type',
        label: this.translate.instant('SHARED.FILTERS.ACTIVITY_TYPE_LABEL'),
        type: 'select',
        placeholder: this.translate.instant('SHARED.FILTERS.ACTIVITY_TYPE_PLACEHOLDER'),
        options: [
          { label: this.translate.instant('SHARED.FILTERS.INDIVIDUAL'), value: 'individual' },
          { label: this.translate.instant('SHARED.FILTERS.TEAM'), value: 'team' }
        ]
      },
      {
        key: 'sport',
        label: this.translate.instant('SHARED.FILTERS.SPORT'),
        type: 'select',
        placeholder: this.translate.instant('SHARED.FILTERS.SELECT_SPORT'),
        options: this.activities.map(activity => ({ label: activity.sport?.title!, value: activity.sport?.id }))
      }
    ];

    this.authService.identity()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.loadActivities());
  }

  // Pagination methods
  onPageChange(page: number): void {
    this._page = page;
    this.updatePaginatedData();
  }

  private updatePaginatedData(): void {
    const startIndex = (this._page - 1) * this._pageSize;
    const endIndex = startIndex + this._pageSize;
    this.filteredActivities = this.allFilteredActivities.slice(startIndex, endIndex);
  }

  // Filter configuration
  filterConfigs: FilterConfig[] = [];

  onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this._page = 1;
    this.applyFilters();
  }

  onFilterChange(filters: any): void {
    this.activeFilters = { ...filters };
  }

  onApplyFilters(filters: any): void {
    this.activeFilters = { ...filters };
    this._page = 1;
    this.applyFilters();
  }

  onResetFilters(): void {
    this.activeFilters = {};
    this.searchTerm = '';
    this._page = 1;
    this.applyFilters();
  }

  activities: SportsGetAllSportsResponseDataItem[] = [];
  sportOptions: SportsGetAllSportsResponseDataItem[] = [];
  filteredActivities: SportsGetAllSportsResponseDataItem[] = [];
  allFilteredActivities: SportsGetAllSportsResponseDataItem[] = [];
  private activeFilters: { [key: string]: any } = {};

  openActivityModal(): void {
    this.isEditMode = false;
    this.selectedActivity = null;
    this.resetActivityForm();
    const ref = this.modalService.open(this.activityModal, { size: 'lg', centered: true, scrollable: true });
    ref.result.finally(() => this.resetActivityForm());
  }

  editActivity(activity: SportsGetAllSportsResponseDataItem): void {
    this.resetActivityForm();
    this.isEditMode = true;
    this.selectedActivity = activity || null;

    const sportId = activity?.sport_id ?? activity?.sport?.id ?? null;
    if (sportId != null) {
      this.selectedSportId = sportId;
      this.form.patchValue({
        primaryColor: activity.color || activity.sport?.color || '#2563EB'
      });

      const selectedSkills = new Set<number>();
      (activity.skills || []).forEach((skill: any) => {
        const skillId = Number(skill.id ?? skill.sport_skill_id ?? 0);
        if (skillId) {
          selectedSkills.add(skillId);
        }
      });
      if (selectedSkills.size) {
        this.selectedSkillIdsBySportId.set(sportId, selectedSkills);
      }

      this.loadAvailableSkills(sportId);
    }

    const ref = this.modalService.open(this.activityModal, { size: 'lg', centered: true, scrollable: true });
    ref.result.finally(() => this.resetActivityForm());
  }

  openSkillModal(): void {
    this.skillForm.reset();
    this.skillModalRef = this.modalService.open(this.skillModal, { size: 'md', centered: true });
  }

  openCategoryModal(): void {
    this.categoryForm.reset();
    this.categoryModalRef = this.modalService.open(this.categoryModal, { size: 'md', centered: true });
  }

  openDetailsModal(activity: SportsGetAllSportsResponseDataItem): void {
    this.selectedActivity = activity || null;
    this.modalService.open(this.detailsModal, { size: 'lg', centered: true, scrollable: true });
  }

  openSkillsModal(activity: SportsGetAllSportsResponseDataItem): void {
    this.selectedActivity = activity || null;
    this.modalService.open(this.skillsModal, { size: 'md', centered: true, scrollable: true });
  }

  openCentersModal(activity: SportsGetAllSportsResponseDataItem): void {
    this.selectedActivityForCenters = activity || null;
    this.centersForm = this.fb.group({
      centers: this.fb.array([this.createCenterFormGroup()])
    });
    this.centersModalRef = this.modalService.open(this.centersModal, { size: 'lg', centered: true, scrollable: true });
  }

  openViewCentersModal(activity: SportsGetAllSportsResponseDataItem): void {
    this.selectedActivityForCenters = activity || null;
    const sportId = activity?.sport_id ?? activity?.sport?.id ?? null;
    if (sportId != null && !this.centersBySportId.has(sportId)) {
      this.loadCentersForSport(sportId);
    }
    this.modalService.open(this.viewCentersModal, { size: 'lg', centered: true, scrollable: true });
  }

  get centersArray(): FormArray {
    return this.centersForm.get('centers') as FormArray;
  }

  createCenterFormGroup(): FormGroup {
    return this.fb.group({
      nameAr: ['', [Validators.required]],
      nameEn: ['', [Validators.required]]
    });
  }

  private touchFormArrayControls(formArray: FormArray): void {
    formArray.controls.forEach(control => {
      if (control instanceof FormGroup) {
        Object.values(control.controls).forEach(field => {
          field.markAsTouched();
          field.updateValueAndValidity();
        });
      }
    });
  }

  addCenter(): void {
    this.centersArray.push(this.createCenterFormGroup());
  }

  removeCenter(index: number): void {
    if (this.centersArray.length > 1) {
      this.centersArray.removeAt(index);
    }
  }

  saveCenters(): void {
    if (this.centersForm.invalid) {
      this.touchFormArrayControls(this.centersArray);
      return;
    }

    const sportId = this.selectedActivityForCenters?.sport_id ?? this.selectedActivityForCenters?.sport?.id ?? null;
    if (sportId == null) {
      return;
    }

    const centers = this.centersArray.value as Array<{ nameAr: string; nameEn: string }>;
    const requests = centers.map(center =>
      this.teamPositionsService.apiV1TeamPositionsPost({
        body: {
          sport_id: sportId,
          title: center.nameAr,
          title_en: center.nameEn,
        }
      })
    );

    this.isSaving = true;
    forkJoin(requests)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isSaving = false;
        })
      )
      .subscribe({
        next: () => {
          this.centersModalRef?.close();
          this.loadCentersForSport(sportId);
          CredentialsModalComponent.show({
            type: 'success',
            title: this.translate.instant('ACTIVITIES_MANAGEMENT.ACTIVITIES.CENTERS_ADDED_SUCCESS'),
            subtitle: this.translate.instant('ACTIVITIES_MANAGEMENT.ACTIVITIES.CENTERS_SAVED')
          });
        },
        error: (error) => {
          errorCallback(error);
        }
      });
  }

  getCentersCount(activity: SportsGetAllSportsResponseDataItem | null): number {
    const sportId = activity?.sport_id ?? activity?.sport?.id ?? null;
    if (sportId == null) {
      return 0;
    }
    return this.centersBySportId.get(sportId)?.length ?? 0;
  }

  getCentersList(activity: SportsGetAllSportsResponseDataItem | null): Array<{ nameAr: string, nameEn: string }> {
    const sportId = activity?.sport_id ?? activity?.sport?.id ?? null;
    if (sportId == null) {
      return [];
    }
    const positions = this.centersBySportId.get(sportId) || [];
    return positions.map(p => ({
      nameAr: p.title || '-',
      nameEn: p.title_en || '-'
    }));
  }

  private loadCentersForSport(sportId: number): void {
    this.teamPositionsService.apiV1TeamPositionsGet({
      sport_id: String(sportId),

      status: "",
      search: "",
      per_page: "",

    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.centersBySportId.set(sportId, res?.data || []);
        },
        error: (error) => {
          errorCallback(error);
        }
      });
  }

  private loadAllCenters(): void {
    const sportIds = this.activities
      .map(a => a?.sport_id ?? a?.sport?.id ?? null)
      .filter((id): id is number => id != null);

    if (!sportIds.length) {
      return;
    }

    const requests = sportIds.map(sportId =>
      this.teamPositionsService.apiV1TeamPositionsGet({
        sport_id: String(sportId),
        status: "",
        search: "",
        per_page: "",
      })
    );

    forkJoin(requests)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (results) => {
          results.forEach((res, index) => {
            this.centersBySportId.set(sportIds[index], res?.data || []);
          });
        },
        error: (error) => {
          errorCallback(error);
        }
      });
  }

  // Positions Methods
  private initialPositionIds: number[] = [];
  private removedPositionIds: number[] = [];
  private positionRowUidCounter = 0;
  loadingPositions = false;
  positionsViewMode = false;

  openPositionsModal(activity: SportsGetAllSportsResponseDataItem): void {
    this.selectedActivityForPositions = activity || null;
    const sportId = activity?.sport_id ?? activity?.sport?.id ?? null;

    this.loadingPositions = true;
    this.positionsViewMode = false;

    this.positionsModalRef = this.modalService.open(this.positionsModal, { size: 'lg', centered: true, scrollable: true });
    if (!sportId) {
      this.initialPositionIds = [];
      this.removedPositionIds = [];
      this.resetPositionsFormWithData();
      return;
    }

    this.teamPositionsService.apiV1SportsSportIdPositionsGet({
      sport_id: String(sportId),
      active_only: 'true'
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          const existingPositions = (response.data || []).map((pos) => ({
            id: pos.id,
            nameAr: pos.title || '',
            nameEn: pos.title_en || ''
          }));
          this.initialPositionIds = existingPositions
            .map((item) => Number(item.id || 0))
            .filter((id) => id > 0);
          this.removedPositionIds = [];
          this.resetPositionsFormWithData(existingPositions);
          this.positionsViewMode = existingPositions.length > 0;
          this.loadingPositions = false;
        },
        error: (error) => {
          errorCallback(error);
          this.initialPositionIds = [];
          this.removedPositionIds = [];
          this.positionsViewMode = false;
          this.resetPositionsFormWithData();
          this.loadingPositions = false;
        }
      });
  }

  gettingPositions = false;
  openViewPositionsModal(activity: SportsGetAllSportsResponseDataItem): void {
    this.selectedActivityForPositions = activity || null;
    const sportId = activity?.sport_id ?? activity?.sport?.id ?? null;
    if (sportId) {
      this.gettingPositions = true;
      this.modalService.open(this.viewPositionsModal, { size: 'lg', centered: true, scrollable: true });
      this.teamPositionsService.apiV1SportsSportIdPositionsGet({
        sport_id: String(sportId),
        active_only: 'true'
      })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response) => {
            this.positionsData = [];
            this.positionsData = (response.data || []).map(pos => ({
              id: pos.id,
              nameAr: pos.title || '',
              nameEn: pos.title_en || ''
            }));
            this.gettingPositions = false;
          },
          error: (error) => {
            errorCallback(error);
            this.positionsData = [];
            this.gettingPositions = false;
          }
        });
    } else {
      this.positionsData = [];
      this.modalService.open(this.viewPositionsModal, { size: 'lg', centered: true, scrollable: true });
    }
  }

  get positionsArray(): FormArray {
    return this.positionsForm.get('positions') as FormArray;
  }

  enterPositionsEditMode(): void {
    this.positionsViewMode = false;
  }

  private resetPositionsFormWithData(
    positions: Array<{ id?: number; uid?: string; nameAr?: string; nameEn?: string }> = []
  ): void {
    const rows = positions.length ? positions : [{}];
    this.positionsForm = this.fb.group({
      positions: this.fb.array(rows.map((item) => this.createPositionFormGroup(item)))
    });
  }

  private createPositionRowUid(): string {
    this.positionRowUidCounter += 1;
    return `position-${this.positionRowUidCounter}`;
  }

  createPositionFormGroup(position?: { id?: number; uid?: string; nameAr?: string; nameEn?: string }): FormGroup {
    return this.fb.group({
      uid: [position?.uid ?? this.createPositionRowUid()],
      id: [position?.id ?? null],
      nameAr: [position?.nameAr ?? '', [Validators.required]],
      nameEn: [position?.nameEn ?? '', [Validators.required]]
    });
  }

  addPosition(): void {
    this.positionsArray.push(this.createPositionFormGroup());
  }

  removePosition(index: number): void {
    const row = this.positionsArray.at(index) as FormGroup | null;
    const positionId = Number(row?.get('id')?.value || 0);
    const hasPersistedId = positionId > 0;
    if (hasPersistedId) {
      this.removedPositionIds = [...new Set([...this.removedPositionIds, positionId])];
    }

    if (this.positionsArray.length > 1 || hasPersistedId) {
      this.positionsArray.removeAt(index);
    }
  }

  savingPositions = false;
  deletingPositionId: number | null = null;
  savePositions(): void {
    if (this.positionsForm.invalid) {
      this.touchFormArrayControls(this.positionsArray);
      return;
    }

    const sportId = this.selectedActivityForPositions?.sport_id ?? null;
    if (!sportId) {
      return;
    }

    const positions = this.positionsArray.value.map((pos: any) => ({
      ...(pos.id ? { id: Number(pos.id) } : {}),
      title: pos.nameAr,
      title_en: pos.nameEn
    }));
    const currentIds = positions
      .map((item: any) => Number(item.id || 0))
      .filter((id: number) => id > 0);
    const deleteIds = [
      ...new Set([
        ...this.removedPositionIds,
        ...this.initialPositionIds.filter((id) => !currentIds.includes(id))
      ])
    ];

    this.savingPositions = true;
    this.teamPositionsService.apiV1SportsSportIdPositionsBulkPost({
      sport_id: String(sportId),
      body: { positions, delete_ids: deleteIds } as any
    })
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => {
        this.savingPositions = false;
      }))
      .subscribe({
        next: () => {
          this.initialPositionIds = [];
          this.removedPositionIds = [];
          this.loadActivities();
          this.loadCentersForSport(sportId);
          this.positionsModalRef?.close();
          CredentialsModalComponent.show({
            type: 'success',
            title: this.translate.instant('ACTIVITIES_MANAGEMENT.ACTIVITIES.POSITIONS_ADDED_SUCCESS'),
            subtitle: this.translate.instant('ACTIVITIES_MANAGEMENT.ACTIVITIES.POSITIONS_SAVED')
          });
        },
        error: (error) => errorCallback(error)
      });
  }

  deleteSavedPosition(index: number): void {
    const position = this.positionsData[index];
    const positionId = Number(position?.id || 0);
    if (!positionId || this.deletingPositionId === positionId) {
      return;
    }

    this.deletingPositionId = positionId;

    SWALConfirmation(
      'warning',
      'SETTINGS.ACTIVITIES.VIEW_POSITIONS_MODAL.DELETE_CONFIRM_TITLE',
      this.teamPositionsService.apiV1TeamPositionsPositionIdDelete({
        position_id: String(positionId)
      }),
      'SETTINGS.ACTIVITIES.VIEW_POSITIONS_MODAL.DELETE_SUCCESS',
      'SHARED.DELETE.CONFIRM_BUTTON',
      'SETTINGS.ACTIVITIES.VIEW_POSITIONS_MODAL.DELETE_CONFIRM'
    )
      .then((result) => {
        if (!result.isConfirmed) {
          return;
        }

        this.positionsData.splice(index, 1);
        this.removeDeletedPositionFromCache(positionId);
      })
      .finally(() => {
        this.deletingPositionId = null;
      });
  }

  private removeDeletedPositionFromCache(positionId: number): void {
    if (!positionId) {
      return;
    }

    const sportId = this.selectedActivityForPositions?.sport_id ?? null;
    if (!sportId) {
      return;
    }

    const current = this.centersBySportId.get(sportId) || [];
    this.centersBySportId.set(
      sportId,
      current.filter((item) => Number(item.id || 0) !== positionId)
    );
  }

  getPositionsCount(activity: SportsGetAllSportsResponseDataItem | null): string {
    // You can optionally cache this per sport or just show a placeholder
    // For now, we'll show the count when data is loaded in the view modal
    return '-';
  }

  getPositionsList(activity: SportsGetAllSportsResponseDataItem | null): Array<{ id?: number; nameAr: string; nameEn: string }> {
    return this.positionsData;
  }

  toggleSport(sportId: number, checked: boolean): void {
    if (checked) {
      if (this.selectedSportId !== sportId) {
        this.selectedSportId = sportId;
        this.loadAvailableSkills(sportId);
      }
      return;
    }

    if (this.selectedSportId === sportId) {
      this.selectedSportId = null;
      this.currentSkillsSportId = null;
    }
  }

  saveActivity(): void {
    if (!this.academyId || !this.selectedSportId) {
      return;
    }

    const body = {
      sport_id: this.selectedSportId,
      color: this.form.value.primaryColor || undefined,
      skill_ids: this.getSelectedSkillIds(this.selectedSportId),
      sync_skills: true
    };

    const editingAcademySportId = Number(this.selectedActivity?.id || 0);
    const canUpdateCurrent = this.isEditMode && editingAcademySportId > 0;

    const request = canUpdateCurrent
      ? this.sportsService.apiV1AcademyAcademyIdSportsSportIdPut({
        academy_id: this.academyId,
        sport_id: String(editingAcademySportId),
        body: body as any
      })
      : this.sportsService.apiV1AcademyAcademyIdSportsPost({
        academy_id: this.academyId,
        body
      });

    const isEdit = canUpdateCurrent;

    this.isSaving = true;
    forkJoin([request || of(null)])
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isSaving = false;
        })
      )
      .subscribe({
        next: () => {
          this.modalService.dismissAll();
          this.loadActivities(true);
          CredentialsModalComponent.show({
            type: 'success',
            title: this.translate.instant(
              isEdit
                ? 'ACTIVITIES_MANAGEMENT.ACTIVITIES.UPDATED_SUCCESS'
                : 'ACTIVITIES_MANAGEMENT.ACTIVITIES.ADDED_SUCCESS'
            ),
            subtitle: this.translate.instant('ACTIVITIES_MANAGEMENT.ACTIVITIES.START_REGISTERING'),
            confirmButtonHtml: `<span class="d-inline-flex align-items-center gap-2"><i class="isax isax-add"></i><span>${this.translate.instant('SHARED.ADD_NEW')}</span></span>`,
            cancelButtonText: this.translate.instant('SHARED.EXIT'),
            confirmOnDismiss: false,
            onConfirm: () => {
              this.openActivityModal();
            }
          });
        },
        error: (error) => {
          errorCallback(error);
        }
      });
  }

  savingSkill = false;
  saveSkill(): void {
    if (!this.academyId || !this.selectedSportId) {
      return;
    }
    if (this.skillForm.invalid) {
      return;
    }
    const title = this.skillForm.value.title || '';
    const categoryId = this.skillForm.value.categoryId ?? null;
    if (!title || !categoryId) {
      return;
    }
    this.savingSkill = true;
    this.sportsService.apiV1AcademyAcademyIdSportsSportIdSkillsPost({
      academy_id: this.academyId,
      sport_id: String(this.selectedSportId),
      body: {
        title,
        category_id: categoryId
      }
    })
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => {
        this.savingSkill = false;
      }))
      .subscribe({
        next: () => {
          this.skillForm.reset();
          this.skillModalRef?.close();
          this.loadAvailableSkills(this.selectedSportId!);
        },
        error: (error) => {
          errorCallback(error);
        }
      });
  }


  savingCategory = false;
  saveCategory(): void {
    if (!this.academyId || !this.selectedSportId) {
      return;
    }
    if (this.categoryForm.invalid) {
      return;
    }
    const title = this.categoryForm.value.title || '';
    if (!title) {
      return;
    }
    this.savingCategory = true;
    this.sportsService.apiV1AcademyAcademyIdSportsCategoriesPost({
      academy_id: this.academyId,
      body: {
        sport_id: this.selectedSportId,
        title
      }
    })
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => {
        this.savingCategory = false;
      }))
      .subscribe({
        next: () => {
          this.categoryForm.reset();
          this.categoryModalRef?.close();
          this.loadAvailableSkills(this.selectedSportId!);
        },
        error: (error) => {
          errorCallback(error);
        }
      });
  }

  onSkillToggle(skill: SportsGetAvailableSkillsResponseDataItemSkillsItem, checked: boolean): void {
    if (this.selectedSportId == null) {
      return;
    }
    const skillId = this.getSkillId(skill);
    if (!skillId) {
      return;
    }
    const selectedSet = this.ensureSkillSet(this.selectedSportId);
    if (checked) {
      selectedSet.add(skillId);
    } else {
      selectedSet.delete(skillId);
    }
  }

  private getSkillId(skill?: SportsGetAvailableSkillsResponseDataItemSkillsItem | SportsGetAllSportsResponseDataItemSkillsItem | null): number {
    return Number(
      skill?.id ??
      (skill as any)?.sport_skill_id ??
      (skill as any)?.skill_id ??
      (skill as any)?.sport_skill?.id ??
      0
    );
  }

  private loadActivities(openModal = false): void {
    if (!this.academyId) {
      return;
    }
    this.isLoading = true;
    this.sportsService
      .apiV1AcademyAcademyIdSportsGet({ academy_id: this.academyId })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          const items = res?.data || [];
          const sportOptions = res?.sport_options || items;
          this.mapActivities(items);
          this.mapSportOptions(sportOptions);
          this.applyFilters();
          this.loadAllCenters();
          if (openModal) {
            this.resetActivityForm();
          }
        },
        error: (error) => {
          errorCallback(error);
        }
      });
  }

  exportActivities(button: any): void {
    const rows = this.filteredActivities.map(item => ({
      sport: item.sport?.localized_title || '-',
      type: this.getSportType(item),
      color: this.getSportColor(item),
      skills_count: String(this.getSkillsCount(item)),
      skills: this.getSkillNames(item).join('، ') || '-',
    }));

    const columns: ExportColumn[] = [
      { header: this.translate.instant('SHARED.TABLE.ACTIVITY'), key: 'sport', width: 25 },
      { header: this.translate.instant('SHARED.TABLE.TYPE'), key: 'type', width: 15 },
      { header: this.translate.instant('SHARED.TABLE.COLOR'), key: 'color', width: 15 },
      { header: this.translate.instant('SHARED.TABLE.SKILLS_COUNT'), key: 'skills_count', width: 15 },
      { header: this.translate.instant('SHARED.TABLE.SKILLS'), key: 'skills', width: 40 },
    ];

    const currentDate = new Date();
    const dateStr = currentDate.getFullYear() +
      String(currentDate.getMonth() + 1).padStart(2, '0') +
      String(currentDate.getDate()).padStart(2, '0');

    exportToExcel(rows, columns, {
      fileName: `الانشطة_${dateStr}.xlsx`,
      sheetName: 'الانشطة',
      button: button
    });
  }

  private mapActivities(items: SportsGetAllSportsResponseDataItem[]): void {
    this.academySportsBySportId.clear();
    this.selectedSkillIdsBySportId.clear();

    this.activities = items;

    items.forEach((item) => {
      const sportId = item.sport_id ?? null;
      if (sportId != null) {
        this.academySportsBySportId.set(sportId, item);
      }
    });

    this.updateSportFilterOptions();
  }

  private mapSportOptions(items: SportsGetAllSportsResponseDataItem[]): void {
    const uniqueBySport = new Map<number, SportsGetAllSportsResponseDataItem>();

    (items || []).forEach((item) => {
      const sportId = item.sport_id ?? null;
      if (sportId != null && !uniqueBySport.has(sportId)) {
        uniqueBySport.set(sportId, item);
      }
    });

    this.sportOptions = Array.from(uniqueBySport.values());
  }


  allSkills: Array<SportsGetAvailableSkillsResponseDataItem & { expanded?: boolean }> = [];

  get filteredGroupedSkills(): Array<SportsGetAvailableSkillsResponseDataItem & { expanded?: boolean }> {
    const search = (this.skillSearchTerm || '').trim().toLowerCase();
    return this.allSkills
      .filter(group => !this.selectedCategoryId || group.id === this.selectedCategoryId)
      .map(group => ({
        ...group,
        skills: (group.skills || []).filter(skill => {
          const skillName = this.getSkillName(skill).toLowerCase();
          return !search || skillName.includes(search);
        })
      }))
      .filter(group => (group.skills || []).length > 0);
  }

  isCategorySelected(categoryId: number): boolean {
    if (!this.selectedSportId) {
      return false;
    }
    const group = this.allSkills.find(item => item.id === categoryId);
    if (!group || !(group.skills?.length)) {
      return false;
    }
    const selected = this.ensureSkillSet(this.selectedSportId);
    return group.skills!.every(skill => {
      const skillId = this.getSkillId(skill as any);
      return skillId && selected.has(skillId);
    });
  }

  isCategoryIndeterminate(categoryId: number): boolean {
    if (!this.selectedSportId) {
      return false;
    }
    const group = this.allSkills.find(item => item.id === categoryId);
    if (!group || !(group.skills?.length)) {
      return false;
    }
    const selected = this.ensureSkillSet(this.selectedSportId);
    const total = group.skills!.length;
    const selectedCount = group.skills!.filter(skill => {
      const skillId = this.getSkillId(skill as any);
      return skillId && selected.has(skillId);
    }).length;
    return selectedCount > 0 && selectedCount < total;
  }

  toggleCategory(categoryId: number, checked: boolean): void {
    if (!this.selectedSportId) {
      return;
    }
    const group = this.allSkills.find(item => item.id === categoryId);
    if (!group || !(group.skills?.length)) {
      return;
    }
    const selected = this.ensureSkillSet(this.selectedSportId);
    group.skills!.forEach(skill => {
      const skillId = this.getSkillId(skill as any);
      if (!skillId) {
        return;
      }
      if (checked) {
        selected.add(skillId);
      } else {
        selected.delete(skillId);
      }
    });
  }

  private loadAvailableSkills(sportId: number): void {
    this.isSkillsLoading = true;
    this.currentSkillsSportId = sportId;
    this.sportsService.apiV1SportsSportIdSkillsAvailableGet({
      sport_id: String(sportId),
      academy_id: this.academyId || undefined
    })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isSkillsLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          const data = (res?.data || []).map(category => ({
            ...category,
            expanded: false,
            skills: category.skills || []
          }));
          this.allSkills = data;
        },
        error: (error) => {
          errorCallback(error);
        }
      });
  }



  private updateSportFilterOptions(): void {
    const options = this.activities
      .map(item => ({
        label: item.sport?.localized_title || '-',
        value: item.sport_id ?? null
      }))
      .filter(item => item.value != null) as Array<{ label: string; value: number }>;

    this.filterConfigs = this.filterConfigs.map(filter => {
      if (filter.key === 'sport') {
        return { ...filter, options: options.length ? options : filter.options };
      }
      return filter;
    });
  }

  private applyFilters(): void {
    const searchTerm = (this.searchTerm || '').toLowerCase().trim();
    const typeFilter = this.activeFilters?.type;
    const sportFilter = this.activeFilters?.sport;

    this.allFilteredActivities = this.activities.filter(activity => {
      const name = (activity.sport?.localized_title || '-').toLowerCase();
      const typeKey = this.normalizeType(this.getSportType(activity));
      const sportId = activity.sport_id ?? null;

      const matchesSearch = !searchTerm || name.includes(searchTerm);
      const matchesType = !typeFilter || typeKey === typeFilter;
      const matchesSport = !sportFilter || String(sportId) === String(sportFilter);
      return matchesSearch && matchesType && matchesSport;
    });

    this._total = this.allFilteredActivities.length;
    this._page = Math.max(1, Math.min(this._page, Math.ceil(this._total / this._pageSize) || 1));
    this.updatePaginatedData();
  }

  private normalizeType(type: string): string {
    const value = type.toLowerCase();
    if (value.includes('team') || value.includes('جماعي')) {
      return 'team';
    }
    if (value.includes('individual') || value.includes('فردي')) {
      return 'individual';
    }
    return '';
  }

  private resetActivityForm(): void {
    this.form.reset({ primaryColor: '#2563EB' });
    this.skillSearchTerm = '';
    this.selectedCategoryId = null;
    this.selectedSportId = null;
    this.currentSkillsSportId = null;
    this.selectedActivity = null;
    this.isEditMode = false;
    this.selectedSkillIdsBySportId.clear();
  }

  private ensureSkillSet(sportId: number): Set<number> {
    if (!this.selectedSkillIdsBySportId.has(sportId)) {
      this.selectedSkillIdsBySportId.set(sportId, new Set<number>());
    }
    return this.selectedSkillIdsBySportId.get(sportId)!;
  }

  private getSelectedSkillIds(sportId: number): number[] {
    return Array.from(this.ensureSkillSet(sportId));
  }


  getSportColor(item?: SportsGetAllSportsResponseDataItem | null): string {
    return item?.color || item?.sport?.color || '#2563EB';
  }

  getSportType(item?: SportsGetAllSportsResponseDataItem | null): string {
    return item?.sport?.is_team?.name || '-';
  }

  getSportSkillsLabel(item?: SportsGetAllSportsResponseDataItem | null): string {
    const count = item?.skills_count ?? item?.skills?.length ?? 0;
    return count ? `عرض ${count} مهارات` : 'لا توجد مهارات';
  }

  getSkillsCount(item?: SportsGetAllSportsResponseDataItem | null): number {
    return item?.skills_count ?? item?.skills?.length ?? 0;
  }

  getSkillNames(item?: SportsGetAllSportsResponseDataItem | null): string[] {
    const skills = item?.skills || [];
    return skills
      .map(skill => this.getActivitySkillName(skill))
      .filter(name => name !== '-');
  }

  getActivitySkillName(skill?: SportsGetAllSportsResponseDataItemSkillsItem | null): string {
    return skill?.localized_title || skill?.title || '-';
  }

  getSkillName(skill?: SportsGetAvailableSkillsResponseDataItemSkillsItem | null): string {
    return skill?.localized_name || skill?.name || '-';
  }

  isSkillSelected(skill?: SportsGetAvailableSkillsResponseDataItemSkillsItem | null): boolean {
    if (!this.selectedSportId) {
      return false;
    }
    const skillId = this.getSkillId(skill);
    if (!skillId) {
      return false;
    }
    return this.ensureSkillSet(this.selectedSportId).has(skillId);
  }

  private get academyId(): string {
    // In branch-switch mode, always target the selected branch context.
    try {
      const raw = localStorage.getItem('impersonated_branch_id');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed === 'number') return String(parsed);
        if (typeof parsed === 'string' && parsed.trim() !== '') return parsed;
        if (parsed?.id) return String(parsed.id);
      }
    } catch {
      const raw = localStorage.getItem('impersonated_branch_id');
      if (raw && raw.trim() !== '') return raw;
    }

    return this.authService.currentUserValue?.academy_id || '';
  }
}
