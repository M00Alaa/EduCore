import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, forkJoin, Observable, Subject, debounceTime, distinctUntilChanged, take, of, tap } from 'rxjs';
import { LookupsApiFilterService, PackagesService, SportsService } from 'src/app/core/backend/common/services';
import { FilterConfig, SearchFilterComponent } from 'src/app/shared/components/search-filter/search-filter.component';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LookupsApiFilterGetAcademyBranchesLookupResponseDataItem,
  LookupsApiFilterGetPackageTypesResponseDataItem,
  PackagesGetAllPackagesResponseDataItem,
  PackagesGetSinglePackageResponseData,
  SportsGetAllSportsResponseDataItem
} from 'src/app/core/backend/common/models';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ROLES, errorCallback, SWAL, SWALConfirmation, noWhitespaceValidator } from 'src/app/app-const';
import { CredentialsModalComponent } from 'src/app/shared/components/credentials-modal/credentials-modal.component';
import { PermissionDirective } from "../../directives/permission.directive";
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from "ng-zorro-antd/radio";
import { FormSharedModule } from "../../modules/nz-form-full/nz-form-full.module";
import { ScrollXComponent } from "../scroll-x/scroll-x.component";
import { NzSpinModule } from "ng-zorro-antd/spin";

@Component({
  selector: 'mo-shared-packages',
  imports: [CommonModule, PermissionDirective, TranslateModule, NzFormModule, NzRadioModule, FormSharedModule, SearchFilterComponent, ScrollXComponent, NzSpinModule],
  templateUrl: './shared-packages.component.html',
  styleUrl: './shared-packages.component.scss'
})
export class SharedPackagesComponent {
  @Input() set permPrefix(value: string) {
    this.addPerm = `${value}.add`;
    this.editPerm = `${value}.edit`;
    this.deletePerm = `${value}.delete`;
  }
  addPerm = 'settings.add';
  editPerm = 'settings.edit';
  deletePerm = 'settings.delete';

  @ViewChild('packageModal') packageModal!: TemplateRef<any>;
  private destroyRef = inject(DestroyRef);

  // State & Data
  isLoading = false;
  isSaving = false;
  isToggling = false;
  isLoadingLookups = false;
  isModalLoading = false;
  modalDataLoaded = false;
  packages: PackagesGetAllPackagesResponseDataItem[] = [];
  packageTypes: LookupsApiFilterGetPackageTypesResponseDataItem[] = [];
  branches: LookupsApiFilterGetAcademyBranchesLookupResponseDataItem[] = [];
  activities: SportsGetAllSportsResponseDataItem[] = [];
  selectedPackage: PackagesGetAllPackagesResponseDataItem | null = null;
  selectedSportId: number | null = null;
  selectedSessionCount: number | null | undefined = undefined;
  customSessionCount = false;
  isBranchManager = false;
  currentBranchId: number | null = null;
  currentAcademyPackagesEnabled = false;

  // Pagination
  _page = 1;
  _pageSize = 10;
  _total = 0;

  // Filters
  private search$ = new Subject<string>();
  private activeFilters: any = {};
  private searchTerm = '';

  sessionCounts = [4, 8, 12, 16, 20, 24];

  readonly durationPresets: Array<{
    value: string;
    labelKey: string;
    durationType: number;
    days: number;
  }> = [
      { value: 'week', labelKey: 'SETTINGS.PACKAGES.MODAL.DURATION_WEEK', durationType: 5, days: 7 },
      { value: 'two_weeks', labelKey: 'SETTINGS.PACKAGES.MODAL.DURATION_TWO_WEEKS', durationType: 5, days: 14 },
      { value: 'month', labelKey: 'SETTINGS.PACKAGES.MODAL.DURATION_MONTH', durationType: 1, days: 30 },
      { value: 'two_months', labelKey: 'SETTINGS.PACKAGES.MODAL.DURATION_TWO_MONTHS', durationType: 5, days: 60 },
      { value: 'three_months', labelKey: 'SETTINGS.PACKAGES.MODAL.DURATION_THREE_MONTHS', durationType: 2, days: 90 },
      { value: 'six_months', labelKey: 'SETTINGS.PACKAGES.MODAL.DURATION_SIX_MONTHS', durationType: 3, days: 180 },
      { value: 'year', labelKey: 'SETTINGS.PACKAGES.MODAL.DURATION_YEAR', durationType: 4, days: 365 },
    ];

  readonly customDurationPresetValue = 'custom';

  private readonly defaultDurationPreset = 'year';
  private readonly subscriptionValueRangeMin = 0;
  private readonly subscriptionValueRangeMax = 5000;
  private readonly subscriptionValueRangeStep = 10;

  filterConfigs: FilterConfig[] = [
    { key: 'sport', label: 'SHARED.FILTERS.SPORT', type: 'select', placeholder: 'SHARED.FILTERS.SELECT_SPORT', options: [] },
    { key: 'type', label: 'SETTINGS.PACKAGES.TABLE.TYPE', type: 'select', placeholder: 'SETTINGS.PACKAGES.MODAL.PACKAGE_TYPE', options: [] },
    {
      key: 'subscriptionValueRange',
      label: 'SETTINGS.PACKAGES.TABLE.VALUE',
      type: 'range',
      min: this.subscriptionValueRangeMin,
      max: this.subscriptionValueRangeMax,
      step: this.subscriptionValueRangeStep
    },
    { key: 'branch', label: 'SHARED.FILTERS.BRANCH', type: 'select', placeholder: 'SHARED.FILTERS.SELECT_BRANCH', options: [] }
  ];

  form = new FormGroup({
    name: new FormControl<string | undefined>(undefined, [Validators.required, noWhitespaceValidator]),
    packageType: new FormControl<number | undefined>(undefined, [Validators.required]),
    sessionCount: new FormControl<number | undefined>(undefined),
    durationPreset: new FormControl<string | undefined>(undefined),
    customDurationDays: new FormControl<number | undefined>(undefined),
    includeSubscription: new FormControl<string>('yes', [Validators.required]),
    subscriptionValue: new FormControl<number | undefined>(undefined, [Validators.required]),
    branch: new FormControl<number[] | undefined>(undefined, [Validators.required])
  });

  get selectedPackageType(): LookupsApiFilterGetPackageTypesResponseDataItem | undefined {
    const typeId = this.form.value.packageType;
    return this.packageTypes.find(t => t.id === typeId);
  }

  get isClassesOnly(): boolean {
    return this.form.value.packageType === 1
      || this.selectedPackageType?.name?.toLowerCase().includes('classes only')
      || this.selectedPackageType?.name?.toLowerCase().includes('حصص فقط')
      || false;
  }

  get isDurationOnly(): boolean {
    return this.form.value.packageType === 2
      || this.selectedPackageType?.name?.toLowerCase().includes('duration only')
      || this.selectedPackageType?.name?.toLowerCase().includes('مدة فقط')
      || false;
  }

  get isClassesAndDuration(): boolean {
    return this.form.value.packageType === 3
      || this.selectedPackageType?.name?.toLowerCase().includes('classes and duration')
      || this.selectedPackageType?.name?.toLowerCase().includes('حصص ومدة')
      || false;
  }

  get canSetClassesOnlyDuration(): boolean {
    return this.isClassesOnly && this.resolveSelectedTargetPackagesEnabled();
  }

  get showDurationField(): boolean {
    return this.isDurationOnly || this.isClassesAndDuration || this.canSetClassesOnlyDuration;
  }

  get isCustomDurationSelected(): boolean {
    return this.form.value.durationPreset === this.customDurationPresetValue;
  }

  constructor(
    private modalService: NgbModal,
    private packagesService: PackagesService,
    private lookupsService: LookupsApiFilterService,
    private sportsService: SportsService,
    private authService: AuthenticationService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.setupSearchAndFilters();
    this.authService.identity()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const user = this.authService.currentUserValue as any;
        this.isBranchManager = Array.isArray(user?.roles) && user.roles.includes(ROLES.BranchManager);
        this.currentBranchId = user?.academy?.id ? Number(user.academy.id) : null;
        this.currentAcademyPackagesEnabled = this.toBooleanFlag(user?.academy?.packages_enabled);
        if (this.isBranchManager && this.currentBranchId) {
          this.form.patchValue({ branch: [this.currentBranchId] });
        }
        this.loadFilterLookups();
        this.loadData();
      });

    this.form.get('packageType')?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.syncDurationFieldState());

    this.form.get('branch')?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.syncDurationFieldState());

    this.form.get('durationPreset')?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (value !== this.customDurationPresetValue) {
          this.form.patchValue({ customDurationDays: undefined }, { emitEvent: false });
        }
      });
  }

  private syncDurationFieldState(): void {
    if (!this.showDurationField) {
      this.form.patchValue({ durationPreset: undefined, customDurationDays: undefined }, { emitEvent: false });
      return;
    }

    if (!this.selectedPackage && !this.form.value.durationPreset) {
      this.form.patchValue({ durationPreset: this.defaultDurationPreset }, { emitEvent: false });
    }
  }

  private setupSearchAndFilters(): void {
    this.search$
      .pipe(debounceTime(1000), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.searchTerm = value || '';
        this._page = 1;
        this.applyFilters();
      });

  }



  onSearch(searchValue: string): void {
    this.search$.next(searchValue || '');
  }

  onFilterChange(filterValues: any): void {
    this.activeFilters = filterValues || {};
  }

  onApplyFilters(filterValues: any): void {
    this.activeFilters = filterValues || {};
    this._page = 1;
    this.applyFilters();
  }

  onResetFilters(): void {
    this.activeFilters = {};
    this.searchTerm = '';
    this._page = 1;
    this.applyFilters();
  }

  onPageChange(page: number): void {
    this._page = page;
    this.loadPageData();
  }

  // Modal actions
  openPackageModal(): void {
    this.selectedPackage = null;
    this.resetForm();
    this.isModalLoading = true;
    const modalRef = this.modalService.open(this.packageModal, { size: 'lg', centered: true, scrollable: true });

    this.loadModalDependencies()
      .pipe(
        take(1),
        finalize(() => this.isModalLoading = false)
      )
      .subscribe({
        next: () => this.applyNewPackageDefaults(),
        error: (error) => {
          errorCallback(error);
          modalRef.dismiss();
        }
      });
  }

  editPackage(item: PackagesGetAllPackagesResponseDataItem): void {
    this.selectedPackage = item;
    this.resetForm();
    this.isModalLoading = true;
    const modalRef = this.modalService.open(this.packageModal, { size: 'lg', centered: true, scrollable: true });

    forkJoin({
      modalData: this.loadModalDependencies(),
      packageDetail: this.packagesService.apiV1PackagesPackageIdGet({ package_id: String(item.id) }).pipe(take(1))
    })
      .pipe(
        take(1),
        finalize(() => this.isModalLoading = false)
      )
      .subscribe({
        next: ({ packageDetail }) => {
          const detail = packageDetail?.data;
          if (detail) {
            this.patchForm(detail);
          } else {
            modalRef.dismiss();
            SWAL('error', 'UI_MESSAGES.COMMON.FAILED_TO_LOAD_DATA');
          }
        },
        error: (error) => {
          modalRef.dismiss();
          errorCallback(error);
        }
      });
  }

  // Form actions
  toggleActivity(activity: SportsGetAllSportsResponseDataItem): void {
    const sportId = activity?.sport?.id ?? null;
    this.selectedSportId = this.selectedSportId === sportId ? null : sportId;
  }

  selectSessionCount(count: number | null): void {
    this.customSessionCount = count === -1;
    this.selectedSessionCount = count;
    this.form.patchValue({ sessionCount: count === -1 ? undefined : count });
  }

  onCustomSessionInput(value: number): void {
    this.form.patchValue({ sessionCount: value });
  }

  savePackage(): void {
    // Validate form
    if (!this.form.valid) {
      Object.values(this.form.controls).forEach(c => c.markAsTouched());
      SWAL('error', 'UI_MESSAGES.SETTINGS_PACKAGES.FILL_REQUIRED');
      return;
    }

    // Validate academy ID
    const academyId = this.academyId;
    if (!academyId) {
      SWAL('error', 'UI_MESSAGES.COMMON.ACADEMY_ID_REQUIRED');
      return;
    }

    // Validate sport selection
    if (!this.selectedSportId) {
      SWAL('error', 'UI_MESSAGES.SETTINGS_PACKAGES.SPORT_REQUIRED');
      return;
    }

    // Validate package type specific fields
    const validationError = this.validatePackageTypeFields();
    if (validationError) {
      SWAL('error', validationError);
      return;
    }

    // Build request body
    const body = this.buildPackageBody();

    // Execute API request
    this.isSaving = true;

    if (this.selectedPackage?.id) {
      // Update existing package
      this.packagesService.apiV1PackagesPackageIdPut({
        package_id: String(this.selectedPackage.id),
        body
      }).pipe(
        take(1),
        finalize(() => {
          this.isSaving = false;
        })
      ).subscribe({
        next: () => {
          this.handleSuccessfulSave(true);
        },
        error: errorCallback
      });
    } else {
      // Create new package
      this.packagesService.apiV1AcademyAcademyIdPackagesPost({
        academy_id: academyId,
        body
      }).pipe(
        take(1),
        finalize(() => {
          this.isSaving = false;
        })
      ).subscribe({
        next: (response) => {
          const newPackageId = response?.data?.id;
          this.handleSuccessfulSave(false, newPackageId);
        },
        error: errorCallback
      });
    }
  }

  private validatePackageTypeFields(): string | null {
    const { sessionCount, durationPreset, customDurationDays } = this.form.value;

    if (this.isClassesOnly && !sessionCount) {
      return 'UI_MESSAGES.SETTINGS_PACKAGES.SESSION_COUNT_REQUIRED';
    }

    if (this.isDurationOnly && !this.hasValidDurationSelection(durationPreset ?? undefined, customDurationDays ?? undefined)) {
      return 'UI_MESSAGES.SETTINGS_PACKAGES.DURATION_REQUIRED';
    }

    if (this.isClassesAndDuration && (!sessionCount || !this.hasValidDurationSelection(durationPreset ?? undefined, customDurationDays ?? undefined))) {
      return 'UI_MESSAGES.SETTINGS_PACKAGES.SESSION_COUNT_AND_DURATION_REQUIRED';
    }

    if (this.canSetClassesOnlyDuration && !this.hasValidDurationSelection(durationPreset ?? undefined, customDurationDays ?? undefined)) {
      return 'UI_MESSAGES.SETTINGS_PACKAGES.DURATION_REQUIRED';
    }

    return null;
  }

  private hasValidDurationSelection(
    durationPreset: string | undefined,
    customDurationDays: number | undefined
  ): boolean {
    if (!durationPreset) {
      return false;
    }

    if (durationPreset === this.customDurationPresetValue) {
      const days = Number(customDurationDays);
      return Number.isFinite(days) && days >= 1;
    }

    return this.durationPresets.some((preset) => preset.value === durationPreset);
  }

  private applyDurationPresetToBody(body: any): void {
    const durationPreset = this.form.value.durationPreset;

    if (durationPreset === this.customDurationPresetValue) {
      const days = Number(this.form.value.customDurationDays);
      if (days >= 1) {
        body.duration_type = 5;
        body.custom_duration_days = days;
      }
      return;
    }

    const preset = this.durationPresets.find((item) => item.value === durationPreset);
    if (!preset) {
      return;
    }

    body.duration_type = preset.durationType;
    body.custom_duration_days = preset.days;
  }

  private shouldIncludeDurationInBody(): boolean {
    if (!this.form.value.durationPreset) {
      return false;
    }

    return this.showDurationField
      || (this.isClassesOnly && this.resolveSelectedTargetPackagesEnabled());
  }

  private buildPackageBody(): any {
    const formValue = this.form.value;
    const branchId = this.isBranchManager
      ? this.currentBranchId
      : (Array.isArray(formValue.branch) ? formValue.branch[0] : formValue.branch);

    const body: any = {
      name: formValue.name,
      package_type: formValue.packageType,
      sport_id: this.selectedSportId,
      branch_id: branchId ? Number(branchId) : undefined,
      amount: formValue.subscriptionValue,
      tax_included: formValue.includeSubscription === 'yes' ? 1 : 0
    };

    // Add classes for Classes Only and Classes & Duration types
    if ((this.isClassesOnly || this.isClassesAndDuration) && formValue.sessionCount) {
      body.classes = formValue.sessionCount;
    }

    // Add duration for Duration Only, Classes & Duration, and enabled Classes Only packages.
    if (this.shouldIncludeDurationInBody()) {
      this.applyDurationPresetToBody(body);
    }

    return body;
  }
  private handleSuccessfulSave(isEdit: boolean = false, newPackageId?: number): void {
    this.modalService.dismissAll();
    this.loadData();

    const fromDeductions = this.route.snapshot.queryParams['action'] === 'create';

    if (fromDeductions && newPackageId) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          tab: 'deductions',
          package_id: newPackageId,
          activity_id: this.selectedSportId,
          action: null // clear action
        },
        queryParamsHandling: 'merge'
      });
      return;
    }

    CredentialsModalComponent.show({
      type: 'success',
      title: this.translate.instant(
        isEdit ? 'UI_MESSAGES.SETTINGS_PACKAGES.UPDATED_SUCCESS' : 'UI_MESSAGES.SETTINGS_PACKAGES.ADDED_SUCCESS'
      ),
      subtitle: this.translate.instant('UI_MESSAGES.SETTINGS_PACKAGES.START_REGISTERING'),
      confirmButtonHtml: `<span class="d-inline-flex align-items-center gap-2"><i class="isax isax-add"></i><span>${this.translate.instant('SHARED.ADD_NEW')}</span></span>`,
      cancelButtonText: this.translate.instant('SHARED.EXIT'),
      confirmOnDismiss: false,
      onConfirm: () => {
        this.openPackageModal();
      }
    });
  }

  toggleStatus(item: PackagesGetAllPackagesResponseDataItem): void {
    if (!item?.id || this.isToggling) return;
    const statusKey = this.isPackageActive(item)
      ? 'UI_MESSAGES.SETTINGS_PACKAGES.DEACTIVATE_ACTION'
      : 'UI_MESSAGES.SETTINGS_PACKAGES.ACTIVATE_ACTION';
    const statusText = this.translate.instant(statusKey);

    this.isToggling = true;
    SWALConfirmation(
      'question',
      this.translate.instant('UI_MESSAGES.SETTINGS_PACKAGES.TOGGLE_CONFIRM', { action: statusText }),
      this.packagesService.apiV1PackagesPackageIdToggleStatusPatch({ package_id: String(item.id) }),
      this.translate.instant('UI_MESSAGES.SETTINGS_PACKAGES.TOGGLE_SUCCESS', { action: statusText }),
      statusText
    ).then((result) => {
      if (result.isConfirmed) this.loadData();
    }).catch((error) => {
      errorCallback(error);
    }).finally(() => {
      this.isToggling = false;
    });
  }

  // Data loading
  loadData(): void {
    this._page = 1;
    this.loadPageData();
  }

  private loadPageData(): void {
    const academyId = this.academyId;
    if (!academyId) return;

    const selectedType = this.normalizeFilterId(this.activeFilters?.type);
    const selectedBranch = this.normalizeFilterId(this.activeFilters?.branch);
    const selectedSport = this.normalizeFilterId(this.activeFilters?.sport);
    const subscriptionValueRange = this.resolveActiveSubscriptionValueRange(
      this.activeFilters?.subscriptionValueRange as [number, number] | undefined
    );

    const params = {
      academy_id: academyId,
      branch: selectedBranch ? String(selectedBranch) : '',
      activity: selectedSport ? String(selectedSport) : '',
      status: '',
      type: selectedType ? String(selectedType) : '',
      amount_from: subscriptionValueRange?.from,
      amount_to: subscriptionValueRange?.to,
      search: this.searchTerm || '',
      per_page: String(this._pageSize),
      page: String(this._page)
    };

    this.isLoading = true;
    this.packagesService.apiV1AcademyAcademyIdPackagesGet(params)
      .pipe(take(1), finalize(() => this.isLoading = false))
      .subscribe({
        next: (res) => {
          this.packages = res?.data || [];
          this._total = res?.meta?.total || res?.total || 0;
        },
        error: (error) => {
          errorCallback(error);
          this.packages = [];
          this._total = 0;
        }
      });
  }

  private normalizeFilterId(value: any): number | null {
    if (Array.isArray(value)) {
      value = value[0];
    }

    if (value && typeof value === 'object') {
      value = value.id ?? value.value;
    }

    const id = Number(value);

    return Number.isFinite(id) && id > 0 ? id : null;
  }

  private resolveActiveSubscriptionValueRange(range: [number, number] | undefined): { from: number; to: number } | undefined {
    if (!Array.isArray(range) || range.length !== 2) {
      return undefined;
    }

    const from = Number(range[0]);
    const to = Number(range[1]);

    if (!Number.isFinite(from) || !Number.isFinite(to)) {
      return undefined;
    }

    if (from === this.subscriptionValueRangeMin && to === this.subscriptionValueRangeMax) {
      return undefined;
    }

    return from <= to ? { from, to } : { from: to, to: from };
  }

  private applyFilters(): void {
    this._page = 1;
    this.loadPageData();
  }

  /**
   * Loads the lookups needed to populate the list-page filter dropdowns
   * (package type + branch). This runs on init so the filters are usable
   * without first opening the Add/Edit modal.
   */
  private loadFilterLookups(): void {
    const academyId = this.academyId;
    if (!academyId) {
      return;
    }

    this.isLoadingLookups = true;

    forkJoin({
      packageTypes: this.lookupsService.apiV1LookupsPackageTypesGet(),
      branches: this.lookupsService.apiV1LookupsAcademyAcademyIdBranchesGet({ academy_id: academyId }),
      activities: this.sportsService.apiV1AcademyAcademyIdSportsGet({ academy_id: academyId })
    }).pipe(take(1), finalize(() => this.isLoadingLookups = false))
      .subscribe({
        next: (res) => {
          this.packageTypes = res.packageTypes?.data || [];
          this.branches = res.branches?.data || [];
          this.activities = res.activities?.data || [];
          this.updateFilterOptions();
        },
        error: (error) => errorCallback(error)
      });
  }

  private loadModalDependencies(): Observable<any> {
    if (this.modalDataLoaded) {
      return of(undefined);
    }

    const academyId = this.academyId;
    if (!academyId) {
      return of(undefined);
    }

    this.isLoadingLookups = true;

    return forkJoin({
      packageTypes: this.lookupsService.apiV1LookupsPackageTypesGet(),
      branches: this.lookupsService.apiV1LookupsAcademyAcademyIdBranchesGet({ academy_id: academyId }),
      activities: this.sportsService.apiV1AcademyAcademyIdSportsGet({ academy_id: academyId })
    }).pipe(
      take(1),
      tap((res) => {
        this.packageTypes = res.packageTypes?.data || [];
        this.branches = res.branches?.data || [];
        this.activities = res.activities?.data || [];
        this.updateFilterOptions();
        this.modalDataLoaded = true;
      }),
      finalize(() => {
        this.isLoadingLookups = false;
      })
    );
  }

  private updateFilterOptions(): void {
    const createOptions = (items: any[]) => items
      .filter(item => item?.id != null)
      .map(item => ({ label: item?.name || '-', value: item?.id }));

    const typeOptions = createOptions(this.packageTypes);
    const branchOptions = createOptions(this.branches);
    const sportOptions = this.activities
      .filter((item) => item?.sport?.id != null)
      .map((item) => ({
        label: item.sport?.localized_title || item.sport?.title || '-',
        value: item.sport?.id
      }));

    const configs: FilterConfig[] = [
      { key: 'sport', label: 'SHARED.FILTERS.SPORT', type: 'select', placeholder: 'SHARED.FILTERS.SELECT_SPORT', options: sportOptions },
      { key: 'type', label: 'SETTINGS.PACKAGES.TABLE.TYPE', type: 'select', placeholder: 'SETTINGS.PACKAGES.MODAL.PACKAGE_TYPE', options: typeOptions },
      {
        key: 'subscriptionValueRange',
        label: 'SETTINGS.PACKAGES.TABLE.VALUE',
        type: 'range',
        min: this.subscriptionValueRangeMin,
        max: this.subscriptionValueRangeMax,
        step: this.subscriptionValueRangeStep
      }
    ];

    // Branch managers only ever see their own branch's packages, so the branch
    // filter is redundant for them (and the branches lookup returns nothing).
    if (!this.isBranchManager) {
      configs.push({ key: 'branch', label: 'SHARED.FILTERS.BRANCH', type: 'select', placeholder: 'SHARED.FILTERS.SELECT_BRANCH', options: branchOptions });
    }

    this.filterConfigs = configs;
  }

  // Form helpers
  private resetForm(): void {
    this.form.reset({
      includeSubscription: 'yes',
      branch: this.isBranchManager && this.currentBranchId ? [this.currentBranchId] : undefined
    });
    this.selectedSessionCount = undefined;
    this.customSessionCount = false;
    this.selectedSportId = null;
  }

  private applyNewPackageDefaults(): void {
    if (this.selectedPackage) {
      return;
    }

    const classesOnlyTypeId = this.resolveClassesOnlyPackageTypeId();
    this.form.patchValue({ packageType: classesOnlyTypeId }, { emitEvent: false });

    if (this.showDurationField) {
      this.form.patchValue({ durationPreset: this.defaultDurationPreset }, { emitEvent: false });
    }
  }

  private resolveClassesOnlyPackageTypeId(): number {
    const fromLookup = this.packageTypes.find(
      (type) => type.name?.toLowerCase().includes('classes only')
        || type.name?.toLowerCase().includes('حصص فقط')
    )?.id;

    return Number(fromLookup ?? 1);
  }

  private patchForm(item: PackagesGetSinglePackageResponseData): void {
    const classes = item?.classes;
    const durationValues = this.resolveDurationFormValues(item);

    this.form.patchValue({
      name: item?.localized_name || item?.name,
      packageType: item?.package_type?.id,
      sessionCount: classes,
      durationPreset: durationValues.durationPreset,
      customDurationDays: durationValues.customDurationDays,
      includeSubscription: item?.tax_included?.id === 1 ? 'yes' : 'no',
      subscriptionValue: item?.amount,
      branch: item?.academy?.id ? [item.academy.id] : undefined
    });

    this.selectedSessionCount = classes && this.sessionCounts.includes(classes) ? classes : classes ? -1 : undefined;
    this.customSessionCount = this.selectedSessionCount === -1;
    this.selectedSportId = item?.sport?.id ?? null;
  }

  private resolveDurationFormValues(item: PackagesGetSinglePackageResponseData): {
    durationPreset?: string;
    customDurationDays?: number;
  } {
    const durationType = Number((item as any)?.duration_type?.id ?? (item as any)?.duration_type ?? 0);
    const days = Number(item?.custom_duration_days ?? (item as any)?.duration_type?.days ?? 0);

    const byType = this.durationPresets.find(
      (preset) => preset.durationType === durationType && durationType !== 5
    );
    if (byType) {
      return { durationPreset: byType.value };
    }

    if (days > 0) {
      const byDays = this.durationPresets.find(
        (preset) => preset.days === days
          && (durationType === 5 ? preset.durationType === 5 : durationType === 0 || durationType === preset.durationType)
      );
      if (byDays) {
        return { durationPreset: byDays.value };
      }

      return {
        durationPreset: this.customDurationPresetValue,
        customDurationDays: days,
      };
    }

    return {};
  }

  private resolveDurationPreset(item: PackagesGetSinglePackageResponseData): string | undefined {
    return this.resolveDurationFormValues(item).durationPreset;
  }

  private resolveSelectedTargetPackagesEnabled(): boolean {
    const selectedPackageAcademy = (this.selectedPackage as any)?.academy;
    if (selectedPackageAcademy && selectedPackageAcademy.packages_enabled !== undefined) {
      return this.toBooleanFlag(selectedPackageAcademy.packages_enabled);
    }

    const formAcademyIds = Array.isArray(this.form.value.branch)
      ? this.form.value.branch
      : (this.form.value.branch ? [this.form.value.branch] : []);
    const selectedAcademyId = Number(formAcademyIds[0] ?? 0);

    if (selectedAcademyId > 0) {
      const branch = this.branches.find((item) => Number(item?.id ?? 0) === selectedAcademyId) as any;
      if (branch?.packages_enabled !== undefined) {
        return this.toBooleanFlag(branch.packages_enabled);
      }
    }

    return this.currentAcademyPackagesEnabled;
  }

  private toBooleanFlag(value: unknown): boolean {
    return value === true || value === 1 || value === '1';
  }

  // Display helpers
  getPackageDurationLabel(item?: PackagesGetAllPackagesResponseDataItem | null): string {
    if (!item) {
      return '-';
    }

    const packageTypeId = Number(item.package_type?.id ?? 0);
    const classes = Number(item.classes ?? 0);
    const durationDays = this.resolvePackageDurationDays(item);
    const shouldShowCombinedDuration = packageTypeId === 3
      || (packageTypeId === 1 && durationDays > 0);

    if (shouldShowCombinedDuration && classes > 0 && durationDays > 0) {
      return this.formatClassesAndDurationLabel(
        classes,
        this.resolveDurationDisplayLabel(item, durationDays)
      );
    }

    if (durationDays > 0) {
      return this.resolveDurationDisplayLabel(item, durationDays);
    }

    if (classes > 0) {
      return `${classes} ${this.translate.instant('SHARED.SESSIONS')}`;
    }

    return '-';
  }

  private resolvePackageDurationDays(item: PackagesGetAllPackagesResponseDataItem): number {
    const fromDurationType = Number(item.duration_type?.days ?? 0);
    if (fromDurationType > 0) {
      return fromDurationType;
    }

    const customDays = Number(item.custom_duration_days ?? 0);
    if (customDays > 0) {
      return customDays;
    }

    const durationTypeId = Number(item.duration_type?.id ?? 0);
    if (durationTypeId > 0 && durationTypeId !== 5) {
      const preset = this.durationPresets.find((option) => option.durationType === durationTypeId);
      if (preset) {
        return preset.days;
      }
    }

    return 0;
  }

  private resolveDurationDisplayLabel(
    item: PackagesGetAllPackagesResponseDataItem,
    durationDays: number
  ): string {
    const durationTypeId = Number(item.duration_type?.id ?? 0);

    if (durationTypeId > 0 && durationTypeId !== 5) {
      const byType = this.durationPresets.find((preset) => preset.durationType === durationTypeId);
      if (byType) {
        return this.translate.instant(byType.labelKey);
      }
    }

    if (durationDays > 0) {
      const byDays = this.durationPresets.find((preset) => preset.days === durationDays);
      if (byDays) {
        return this.translate.instant(byDays.labelKey);
      }

      return `${durationDays} ${this.translate.instant('SHARED.DAY')}`;
    }

    return '-';
  }

  private formatClassesAndDurationLabel(classes: number, durationLabel: string): string {
    const sessionsLabel = this.translate.instant('SHARED.SESSIONS');

    return `${classes} ${sessionsLabel} / ${durationLabel}`;
  }

  isPackageActive(item?: PackagesGetAllPackagesResponseDataItem | null): boolean {
    const statusId = Number(item?.status?.id ?? 0);
    if (statusId > 0) {
      return statusId === 2;
    }

    const statusName = (item?.status?.name || '').trim().toLowerCase();
    return statusName === 'active' || statusName === 'نشط';
  }

  getSportIcon(activity?: SportsGetAllSportsResponseDataItem | null): string {
    const defaultIcon = 'assets/images/icon/activity-ex.svg';
    if (!activity?.sport) return defaultIcon;

    const { icon_url, icon_base_url, icon_path } = activity.sport;
    return icon_url || (icon_base_url && icon_path ? `${icon_base_url}${icon_path}` : defaultIcon);
  }

  private get academyId(): string {
    const user = this.authService.currentUserValue as any;
    const id = user?.academy_id ?? user?.parent_id ?? user?.id ?? user?.academy?.id;
    return id ? String(id) : '';
  }
}
