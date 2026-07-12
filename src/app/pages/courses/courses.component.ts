import { Component, DestroyRef, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, distinctUntilChanged, finalize, take } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { FilterConfig } from 'src/app/shared/components/search-filter/search-filter.component';
import { exportToExcel, ExportColumn, errorCallback, SWALConfirmation, noWhitespaceValidator } from 'src/app/app-const';
import { CoursesService } from './courses.service';
import { Course, CourseStatus } from './courses.model';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  @ViewChild('addCourseModal') addCourseModal!: TemplateRef<any>;
  @ViewChild('viewCourseModal') viewCourseModal!: TemplateRef<any>;

  private readonly search$ = new Subject<string>();
  private readonly destroyRef = inject(DestroyRef);
  editingCourseId: number | null = null;

  _page = 1;
  _pageSize = 10;
  _total = 0;
  isLoading = false;
  isSaving = false;
  selectedCourse: Course | null = null;
  viewCourseTab = 'details';

  courseList: Course[] = [];
  filteredCourses: Course[] = [];
  statusOptions: CourseStatus[] = ['Active', 'Draft', 'Archived'];
  statusSelectOptions: { label: string; value: string }[] = [];

  private activeFilters: any = {};
  private searchTerm = '';

  // Filter configuration
  filterConfigs: FilterConfig[] = [
    {
      key: 'status',
      label: 'COURSES.FILTERS.STATUS',
      type: 'select',
      placeholder: 'COURSES.FILTERS.SELECT_STATUS',
      options: []
    }
  ];

  courseForm = this.fb.group({
    courseName: ['', [Validators.required, noWhitespaceValidator]],
    instructorName: ['', [Validators.required, noWhitespaceValidator]],
    category: ['', [Validators.required, noWhitespaceValidator]],
    duration: [0, [Validators.required, Validators.min(1)]],
    price: [0, [Validators.min(0)]],
    status: ['Active' as CourseStatus, [Validators.required]],
    description: ['']
  });

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.search$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.searchTerm = value || '';
        this.loadData(1);
      });

    this.statusSelectOptions = this.statusOptions.map((status) => ({
      label: `COURSES.STATUSES.${status.toUpperCase()}`,
      value: status,
    }));

    this.syncFilterOptions();
    this.loadData(1);
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
      { header: this.translate.instant('COURSES.EXPORT_COLUMNS.ID'), key: 'id', width: 10 },
      { header: this.translate.instant('COURSES.EXPORT_COLUMNS.COURSE_NAME'), key: 'courseName', width: 25 },
      { header: this.translate.instant('COURSES.EXPORT_COLUMNS.INSTRUCTOR'), key: 'instructorName', width: 20 },
      { header: this.translate.instant('COURSES.EXPORT_COLUMNS.CATEGORY'), key: 'category', width: 15 },
      { header: this.translate.instant('COURSES.EXPORT_COLUMNS.DURATION'), key: 'duration', width: 10 },
      { header: this.translate.instant('COURSES.EXPORT_COLUMNS.PRICE'), key: 'price', width: 10 },
      { header: this.translate.instant('COURSES.EXPORT_COLUMNS.STATUS'), key: 'status', width: 10 },
    ];

    const exportRows = this.filteredCourses.map((item) => ({
      id: item.id,
      courseName: item.courseName,
      instructorName: item.instructorName,
      category: item.category,
      duration: item.duration,
      price: item.price,
      status: item.status,
    }));

    exportToExcel(exportRows, columns, {
      fileName: this.translate.instant('COURSES.EXPORT_FILE_NAME', { date: dateStr }),
      sheetName: this.translate.instant('COURSES.EXPORT_SHEET_NAME'),
      button: button
    });
  }

  openAddCourseModal(): void {
    this.editingCourseId = null;
    this.resetCourseForm();
    this.modalService.open(this.addCourseModal, { size: 'lg', centered: true });
  }

  editCourse(course: Course): void {
    this.editingCourseId = course.id;
    this.resetCourseForm(course);
    this.modalService.open(this.addCourseModal, { size: 'lg', centered: true });
  }

  viewCourse(course: Course): void {
    this.selectedCourse = course;
    this.viewCourseTab = 'details';
    this.modalService.open(this.viewCourseModal, { size: 'lg', centered: true });
  }

  deleteCourse(course: Course): void {
    if (!course?.id) {
      return;
    }

    SWALConfirmation(
      'warning',
      'COURSES.DELETE_CONFIRM_TITLE',
      this.coursesService.deleteCourse(course.id),
      'COURSES.DELETE_SUCCESS',
      'COURSES.DELETE_CONFIRM_BUTTON'
    ).then((res) => {
      if (res) {
        this.loadData();
      }
    });
  }

  saveCourse(): void {
    if (this.courseForm.invalid) {
      Object.keys(this.courseForm.controls).forEach(key => {
        const control = this.courseForm.get(key);
        control?.markAsTouched();
        control?.updateValueAndValidity();
      });
      return;
    }

    const payload = this.buildPayloadFromForm();
    if (!payload) {
      return;
    }

    this.isSaving = true;

    if (this.editingCourseId) {
      this.coursesService
        .updateCourse(this.editingCourseId, payload)
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

    this.coursesService
      .createCourse(payload)
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

    this.isLoading = true;

    this.coursesService
      .getAllCourses()
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.courseList = response || [];
          this.applyFilters();
          this._total = this.filteredCourses.length;
        },
        error: (error) => errorCallback(error),
      });
  }

  private applyFilters(): void {
    this.filteredCourses = this.courseList.filter(course => {
      const matchesSearch = !this.searchTerm ||
        course.courseName.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.activeFilters?.status === 'All' || !this.activeFilters?.status || course.status === this.activeFilters.status;
      return matchesSearch && matchesStatus;
    });
  }

  private syncFilterOptions(): void {
    this.filterConfigs = [
      {
        key: 'status',
        label: 'COURSES.FILTERS.STATUS',
        type: 'select',
        placeholder: 'COURSES.FILTERS.SELECT_STATUS',
        options: [
          { label: 'SHARED.FILTERS.ALL', value: 'All' },
          ...this.statusSelectOptions
        ],
      }
    ];
  }

  private resetCourseForm(course?: Course): void {
    if (!course) {
      this.courseForm.reset({
        courseName: '',
        instructorName: '',
        category: '',
        duration: 0,
        price: 0,
        status: 'Active',
        description: '',
      });
      return;
    }

    this.courseForm.reset({
      courseName: course.courseName,
      instructorName: course.instructorName,
      category: course.category,
      duration: course.duration,
      price: course.price,
      status: course.status,
      description: course.description || '',
    });
  }

  private buildPayloadFromForm(): Partial<Course> | null {
    const formValue = this.courseForm.getRawValue();
    const courseName = (formValue.courseName || '').trim();
    const instructorName = (formValue.instructorName || '').trim();
    const category = (formValue.category || '').trim();

    if (!courseName || !instructorName || !category) {
      return null;
    }

    return {
      courseName,
      instructorName,
      category,
      duration: Number(formValue.duration) || 0,
      price: Number(formValue.price) || 0,
      status: formValue.status as CourseStatus,
      description: formValue.description ? String(formValue.description).trim() : undefined,
    };
  }

  private getExportDate(): string {
    const currentDate = new Date();
    return currentDate.getFullYear() +
      String(currentDate.getMonth() + 1).padStart(2, '0') +
      String(currentDate.getDate()).padStart(2, '0');
  }
}