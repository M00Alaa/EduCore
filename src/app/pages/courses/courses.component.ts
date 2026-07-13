import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SearchFilterComponent, FilterConfig } from 'src/app/shared/components/search-filter/search-filter.component';
import { ScrollXComponent } from 'src/app/shared/components/scroll-x/scroll-x.component';
import { CourseStatusBadgeComponent } from 'src/app/shared/components/status-badge/status-badge.component';
import { exportToExcel, ExportColumn, SWALConfirmation, SWAL } from 'src/app/app-const';
import { Course, CourseStatus } from './courses.model';
import { CoursesService, CourseStats } from './courses.service';

type SortKey = 'id' | 'courseName' | 'instructorName' | 'category' | 'duration' | 'price' | 'status' | 'createdDate';
type SortDir = 'asc' | 'desc';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    NgbPaginationModule,
    NzTableModule,
    NzSkeletonModule,
    TranslateModule,
    SearchFilterComponent,
    ScrollXComponent,
    CourseStatusBadgeComponent
  ],
  templateUrl: './courses.component.html'
})
export class CoursesComponent implements OnInit {
  stats: CourseStats = { total: 0, active: 0, draft: 0, archived: 0 };
  allCourses: Course[] = [];
  filteredCourses: Course[] = [];

  searchTerm = '';
  private activeFilters: any = {};

  statusOptions: { label: string; value: CourseStatus | 'All' }[] = [
    { label: 'SHARED.FILTERS.ALL', value: 'All' },
    { label: 'COURSES.STATUSES.ACTIVE', value: 'Active' },
    { label: 'COURSES.STATUSES.DRAFT', value: 'Draft' },
    { label: 'COURSES.STATUSES.ARCHIVED', value: 'Archived' }
  ];
  categoryOptions: { label: string; value: string }[] = [
    { label: 'SHARED.FILTERS.ALL', value: 'All' },
    { label: 'Frontend', value: 'Frontend' },
    { label: 'Backend', value: 'Backend' },
    { label: 'Design', value: 'Design' },
    { label: 'Mobile', value: 'Mobile' },
    { label: 'DevOps', value: 'DevOps' }
  ];

  filterConfigs: FilterConfig[] = [
    {
      key: 'status',
      label: 'COURSES.FILTERS.STATUS',
      type: 'select',
      placeholder: 'COURSES.FILTERS.SELECT_STATUS',
      options: this.statusOptions
    },
    {
      key: 'category',
      label: 'COURSES.FILTERS.CATEGORY',
      type: 'select',
      placeholder: 'COURSES.FILTERS.SELECT_CATEGORY',
      options: this.categoryOptions
    },
    {
      key: 'price',
      label: 'COURSES.FILTERS.PRICE',
      type: 'range',
      min: 0,
      max: 500,
      step: 10
    }
  ];

  sortKey: SortKey = 'id';
  sortDir: SortDir = 'asc';

  page = 1;
  pageSize = 8;
  total = 0;

  isLoading = false;
  isError = false;

  skeletonRows = Array.from({ length: 8 });

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.isError = false;
    this.coursesService.getAllCourses().subscribe({
      next: (courses) => {
        this.allCourses = courses || [];
        this.stats = this.coursesService.getStats();
        this.syncPriceFilterBounds();
        this.applyFilters();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.isError = true;
      }
    });
  }

  private syncPriceFilterBounds(): void {
    if (this.allCourses.length === 0) return;
    const prices = this.allCourses.map((c) => c.price);
    const min = Math.floor(Math.min(...prices));
    const max = Math.ceil(Math.max(...prices));
    this.filterConfigs = this.filterConfigs.map((f) => (f.key === 'price' ? { ...f, min, max } : f));
  }

  onSearch(value: string): void {
    this.searchTerm = value || '';
    this.page = 1;
    this.applyFilters();
  }

  onApplyFilters(filterValues: any): void {
    this.activeFilters = filterValues || {};
    this.page = 1;
    this.applyFilters();
  }

  onResetFilters(): void {
    this.activeFilters = {};
    this.searchTerm = '';
    this.page = 1;
    this.applyFilters();
  }

  applyFilters(): void {
    const term = this.searchTerm.trim().toLowerCase();
    const status = this.activeFilters?.status;
    const category = this.activeFilters?.category;
    const price = this.activeFilters?.price;
    const min = Array.isArray(price) ? price[0] : -Infinity;
    const max = Array.isArray(price) ? price[1] : Infinity;

    let result = this.allCourses.filter((c) => {
      const matchesSearch = !term ||
        c.courseName.toLowerCase().includes(term) ||
        c.instructorName.toLowerCase().includes(term) ||
        c.category.toLowerCase().includes(term);
      const matchesStatus = !status || status === 'All' || c.status === status;
      const matchesCategory = !category || category === 'All' || c.category === category;
      const matchesPrice = c.price >= min && c.price <= max;
      return matchesSearch && matchesStatus && matchesCategory && matchesPrice;
    });

    result = this.sortCourses(result);
    this.filteredCourses = result;
    this.total = result.length;
  }

  private sortCourses(courses: Course[]): Course[] {
    const dir = this.sortDir === 'asc' ? 1 : -1;
    return [...courses].sort((a, b) => {
      const av = (a as any)[this.sortKey];
      const bv = (b as any)[this.sortKey];
      if (typeof av === 'number' && typeof bv === 'number') {
        return (av - bv) * dir;
      }
      return String(av).localeCompare(String(bv)) * dir;
    });
  }

  get pagedCourses(): Course[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredCourses.slice(start, start + this.pageSize);
  }

  get rangeStart(): number {
    return this.total === 0 ? 0 : (this.page - 1) * this.pageSize + 1;
  }
  get rangeEnd(): number {
    return Math.min(this.page * this.pageSize, this.total);
  }

  viewCourse(course: Course): void {
    this.router.navigate(['/courses/details', course.id]);
  }

  editCourse(course: Course): void {
    this.router.navigate(['/courses/edit', course.id]);
  }

  addCourse(): void {
    this.router.navigate(['/courses/add']);
  }

  deleteCourse(course: Course): void {
    SWALConfirmation(
      'warning',
      this.translate.instant('COURSES.DELETE.TITLE'),
      this.coursesService.deleteCourse(course.id),
      this.translate.instant('COURSES.TOAST.DELETE_SUCCESS'),
      this.translate.instant('COURSES.DELETE.CONFIRM'),
      this.translate.instant('COURSES.DELETE.MESSAGE')
    ).then(() => {
      this.loadData();
    });
  }

  exportCourses(): void {
    if (this.filteredCourses.length === 0) {
      SWAL('warning', this.translate.instant('EXPORT.NO_DATA'));
      return;
    }
    const columns: ExportColumn[] = [
      { header: this.translate.instant('COURSES.EXPORT_COLUMNS.ID'), key: 'id' },
      { header: this.translate.instant('COURSES.EXPORT_COLUMNS.COURSE_NAME'), key: 'courseName' },
      { header: this.translate.instant('COURSES.EXPORT_COLUMNS.INSTRUCTOR'), key: 'instructorName' },
      { header: this.translate.instant('COURSES.EXPORT_COLUMNS.CATEGORY'), key: 'category' },
      { header: this.translate.instant('COURSES.EXPORT_COLUMNS.DURATION'), key: 'duration' },
      { header: this.translate.instant('COURSES.EXPORT_COLUMNS.PRICE'), key: 'price' },
      { header: this.translate.instant('COURSES.EXPORT_COLUMNS.STATUS'), key: 'status' }
    ];
    const date = new Date().toISOString().split('T')[0];
    exportToExcel(
      this.filteredCourses,
      columns,
      {
        fileName: this.translate.instant('COURSES.EXPORT_FILE_NAME', { date }),
        sheetName: this.translate.instant('COURSES.EXPORT_SHEET_NAME')
      }
    );
  }
}
