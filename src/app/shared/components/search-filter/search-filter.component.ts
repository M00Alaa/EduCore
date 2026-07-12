import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { FormSharedModule } from "../../modules/nz-form-full/nz-form-full.module";
import { TranslateModule } from '@ngx-translate/core';
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

export interface FilterConfig {
    key: string;
    label: string;
    type: 'text' | 'select' | 'date' | 'dateRange' | 'number' | 'range';
    placeholder?: string;
    options?: { label: string; value: any }[];
    multiple?: boolean;
    min?: number;
    max?: number;
    step?: number;
}

@Component({
    selector: 'mg-search-filter',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzDatePickerModule,
        NzSelectModule,
        NzSliderModule,
        FormSharedModule,
        TranslateModule,
        NgbDatepickerModule
    ],
    templateUrl: './search-filter.component.html',
    styleUrl: './search-filter.component.scss'
})
export class SearchFilterComponent implements OnInit, OnChanges, OnDestroy {
    hoveredDate: NgbDateStruct | null = null;
    fromDate: NgbDateStruct | null = null;
    toDate: NgbDateStruct | null = null;
    @Input() filters: FilterConfig[] = [];
    @Input() searchPlaceholder: string = 'بحث';
    @Input() initialSearchTerm: string = '';
    @Input() showSearch: boolean = true;
    @Input() showFilter: boolean = true;
    @Input() isLoading: boolean = false;

    @Output() onSearch = new EventEmitter<string>();
    @Output() onFilterChange = new EventEmitter<any>();
    @Output() onApplyFilters = new EventEmitter<any>();
    @Output() onResetFilters = new EventEmitter<void>();
    @Output() onFilterOpen = new EventEmitter<void>();

    filterForm: FormGroup;
    isFilterOpen = false;
    activeFiltersCount = 0;
    searchValue = '';
    private formChangesSubscription?: Subscription;

    constructor(private fb: FormBuilder) {
        this.filterForm = this.fb.group({});
    }

    ngOnInit() {
        if (this.initialSearchTerm) {
            this.searchValue = this.initialSearchTerm;
        }
        this.initializeForm();
        this.subscribeToFormChanges();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['initialSearchTerm'] && !changes['initialSearchTerm'].firstChange) {
            this.searchValue = this.initialSearchTerm ?? '';
        }
        if (changes['filters'] && !changes['filters'].firstChange) {
            this.initializeForm(this.filterForm.getRawValue());
            this.subscribeToFormChanges();
            this.calculateActiveFilters();
        }
    }

    ngOnDestroy() {
        this.formChangesSubscription?.unsubscribe();
    }

    initializeForm(currentValues: Record<string, any> = {}) {
        const group: any = {};
        this.filters.forEach(filter => {
            if (filter.type === 'dateRange') {
                group[filter.key] = this.fb.group({
                    from: [currentValues[filter.key]?.from ?? null],
                    to: [currentValues[filter.key]?.to ?? null]
                });
            } else if (filter.type === 'range') {
                group[filter.key] = [currentValues[filter.key] ?? [filter.min || 0, filter.max || 100]];
            } else {
                group[filter.key] = [currentValues[filter.key] ?? null];
            }
        });
        this.filterForm = this.fb.group(group);
    }

    subscribeToFormChanges() {
        this.formChangesSubscription?.unsubscribe();
        this.formChangesSubscription = this.filterForm.valueChanges.subscribe(values => {
            this.calculateActiveFilters();
            this.onFilterChange.emit(values);
        });
    }

    calculateActiveFilters() {
        const values = this.filterForm.value;
        this.activeFiltersCount = Object.keys(values).filter(key => {
            const value = values[key];
            if (value && typeof value === 'object' && 'from' in value && 'to' in value) {
                // For dateRange, count as active only if both from and to are set
                return value.from !== null && value.to !== null;
            }
            // For range type (array), check if it's not the default values
            if (Array.isArray(value) && value.length === 2) {
                const filter = this.filters.find(f => f.key === key);
                if (filter && filter.type === 'range') {
                    return !(value[0] === (filter.min || 0) && value[1] === (filter.max || 100));
                }
            }
            return value !== null && value !== undefined && value !== '';
        }).length;
    }

    handleSearch() {
        this.onSearch.emit(this.searchValue);
    }

    applyFilters() {
        const filterValues = this.filterForm.value;
        this.onApplyFilters.emit(filterValues);
        this.isFilterOpen = false;
    }

    resetFilters(emitEvent = true) {
        this.filterForm.reset();
        this.activeFiltersCount = 0;
        this.fromDate = null;
        this.toDate = null;
        this.hoveredDate = null;
        if (emitEvent) {
            this.onResetFilters.emit();
        }
        // this.isFilterOpen = false;
    }

    resetSearch(emitEvent = true) {
        this.searchValue = '';
        if (emitEvent) {
            this.onSearch.emit('');
        }
    }

    toggleFilterDropdown() {
        this.isFilterOpen = !this.isFilterOpen;
        if (this.isFilterOpen) {
            this.onFilterOpen.emit();
        }
    }

    closeFilterDropdown() {
        this.isFilterOpen = false;
    }

    // Date Range Picker Methods
    onDateSelection(date: NgbDateStruct, filterKey: string) {
        if (!this.fromDate && !this.toDate) {
            this.fromDate = date;
        } else if (this.fromDate && !this.toDate && this.isAfter(date, this.fromDate)) {
            this.toDate = date;
            this.updateDateRangeControl(filterKey);
        } else {
            this.toDate = null;
            this.fromDate = date;
        }
    }

    isHovered(date: NgbDateStruct) {
        return (
            this.fromDate && !this.toDate && this.hoveredDate && this.isAfter(date, this.fromDate) && this.isBefore(date, this.hoveredDate)
        );
    }

    isInside(date: NgbDateStruct) {
        return this.toDate && this.isAfter(date, this.fromDate) && this.isBefore(date, this.toDate);
    }

    isRange(date: NgbDateStruct) {
        return (
            this.equals(date, this.fromDate) ||
            (this.toDate && this.equals(date, this.toDate)) ||
            this.isInside(date) ||
            this.isHovered(date)
        );
    }

    private isAfter(date: NgbDateStruct | null, other: NgbDateStruct | null): boolean {
        if (!date || !other) return false;
        if (date.year !== other.year) return date.year > other.year;
        if (date.month !== other.month) return date.month > other.month;
        return date.day > other.day;
    }

    private isBefore(date: NgbDateStruct | null, other: NgbDateStruct | null): boolean {
        if (!date || !other) return false;
        if (date.year !== other.year) return date.year < other.year;
        if (date.month !== other.month) return date.month < other.month;
        return date.day < other.day;
    }

    private equals(date: NgbDateStruct | null, other: NgbDateStruct | null): boolean {
        if (!date || !other) return false;
        return date.year === other.year && date.month === other.month && date.day === other.day;
    }

    private updateDateRangeControl(filterKey: string) {
        const fromDate = this.fromDate ? this.ngbDateToDate(this.fromDate) : null;
        const toDate = this.toDate ? this.ngbDateToDate(this.toDate) : null;

        this.filterForm.get(filterKey)?.patchValue({
            from: fromDate,
            to: toDate
        });
    }

    private ngbDateToDate(ngbDate: NgbDateStruct): Date {
        return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    }

    getDateRangeText(filterKey: string): string {
        const dateRange = this.filterForm.get(filterKey)?.value;
        if (dateRange?.from && dateRange?.to) {
            const from = new Date(dateRange.from);
            const to = new Date(dateRange.to);
            return `${from.toLocaleDateString()} - ${to.toLocaleDateString()}`;
        }
        return '';
    }
}
