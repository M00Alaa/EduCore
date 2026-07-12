import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";
import { NgbCalendar, NgbDate, NgbDateStruct, NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgApexchartsModule } from "ng-apexcharts";
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import {
    ApexAxisChartSeries,
    ApexChart,
    ApexDataLabels,
    ApexFill,
    ApexGrid,
    ApexLegend,
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexStroke,
    ApexTooltip,
    ApexXAxis,
    ApexYAxis
} from "ng-apexcharts";
import { DashboardStatisticsResponse } from "src/app/core/backend/academy/models/dashboard-manual.models";
import { DashboardManualService } from "src/app/core/backend/academy/services/dashboard-manual.service";
import { FacilitiesReportManualService } from "src/app/core/backend/academy/services/facilities-report-manual.service";
import { FacilitiesReportFilters, FacilitiesReportPayload } from "src/app/core/backend/academy/models/facilities-report-manual.models";
import { PlayersReportManualService } from "src/app/core/backend/academy/services/players-report-manual.service";
import { PlayersReportPayload } from "src/app/core/backend/academy/models/players-report-manual.models";
import { RentalFacility } from "src/app/core/backend/academy/models/rentals-manual.models";
import { RentalsManualService } from "src/app/core/backend/academy/services/rentals-manual.service";
import { AttendanceReportManualService } from "src/app/core/backend/academy/services/attendance-report-manual.service";
import { AttendanceReportFilters, AttendanceReportPayload } from "src/app/core/backend/academy/models/attendance-report-manual.models";
import { AuthenticationService } from "src/app/core/services/auth.service";

type DonutChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    dataLabels?: ApexDataLabels;
    plotOptions?: ApexPlotOptions;
    legend?: ApexLegend;
    stroke?: ApexStroke;
    colors?: string[];
};

type AreaChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels?: ApexDataLabels;
    stroke?: ApexStroke;
    fill?: ApexFill;
    colors?: string[];
    xaxis?: ApexXAxis;
    yaxis?: ApexYAxis;
    grid?: ApexGrid;
    legend?: ApexLegend;
    tooltip?: ApexTooltip;
};

type QuickAction = {
    key: string;
    icon: string;
    route: string;
    permissions: string[];
};

@Component({
    selector: 'app-bm-dashboard',
    templateUrl: './bm-dashboard.component.html',
    standalone: true,
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        NgSelectModule,
        NgApexchartsModule,
        NgbDatepickerModule
    ]
})
export class BmDashboardComponent implements OnInit {
    private router = inject(Router);
    private calendar = inject(NgbCalendar);

    constructor(
        private dashboardService: DashboardManualService,
        private rentalsService: RentalsManualService,
        private facilitiesReportService: FacilitiesReportManualService,
        private playersReportService: PlayersReportManualService,
        private attendanceReportService: AttendanceReportManualService,
        private authService: AuthenticationService,
        private translate: TranslateService,
    ) { }

    bmFacilitiesDonutOptions: Partial<DonutChartOptions> = {};
    bmActivitiesDonutOptions: Partial<DonutChartOptions> = {};
    bmAttendanceDonutOptions: Partial<DonutChartOptions> = {};
    bmPlayersAreaOptions: Partial<AreaChartOptions> = {};
    bmPlayersPeriod: 'daily' | 'weekly' | 'monthly' = 'monthly';
    bmSelectedFacility: number | null = null;
    bmFacilityOptions: RentalFacility[] = [];
    facilityReport: FacilitiesReportPayload | null = null;
    playersReport: PlayersReportPayload | null = null;

    financeRevenue = 1200;
    financeExpenses = 1800;
    financeBalance = 1392;

    subscriptionsActive = 1800;
    subscriptionsNearExpiry = 1200;
    subscriptionsRefunded = 1392;

    facilityRevenue = 73;
    attendanceReport: AttendanceReportPayload | null = null;
    isLoading = false;

    dateFrom: NgbDateStruct | null = null;
    dateTo: NgbDateStruct | null = null;

    readonly bmQuickActions: QuickAction[] = [
        {
            key: 'DASHBOARD_PAGE.BM.QUICK_ACTIONS.REGISTER_SUBSCRIPTION',
            icon: 'isax-receipt-edit',
            route: '/subscriptions/add',
            permissions: ['subscriptions.add', 'subscription-management-parent/add'],
        },
        {
            key: 'DASHBOARD_PAGE.BM.QUICK_ACTIONS.NEW_REGISTRATION',
            icon: 'isax-user-add',
            route: '/subscriptions/registration-qr',
            permissions: ['subscriptions.view', 'subscription-management-parent/view'],
        },
        {
            key: 'DASHBOARD_PAGE.BM.QUICK_ACTIONS.SEND_MESSAGE',
            icon: 'isax-message-edit',
            route: '/communication',
            permissions: ['communication.view', 'chat/view', 'announcement/view'],
        },
        {
            key: 'DASHBOARD_PAGE.BM.QUICK_ACTIONS.ATTEND_PLAYERS',
            icon: 'isax-profile-2user',
            route: '/players-attendance',
            permissions: ['players.attendance.view'],
        },
        {
            key: 'DASHBOARD_PAGE.BM.QUICK_ACTIONS.ATTEND_COACHES',
            icon: 'isax-teacher',
            route: '/trainers',
            permissions: ['trainers.view', 'trainers.management.view', 'trainer/view'],
        },
        {
            key: 'DASHBOARD_PAGE.BM.QUICK_ACTIONS.REGISTER_RENTAL',
            icon: 'isax-building-3',
            route: '/financial/rentals',
            permissions: ['rentals.rentals.add', 'rentals.add', 'rent/add'],
        },
        {
            key: 'DASHBOARD_PAGE.BM.QUICK_ACTIONS.REGISTER_EXPENSE',
            icon: 'isax-money-recive',
            route: '/financial/expenses',
            permissions: ['expenses.expenses.add', 'expenses.add', 'expenses/add'],
        },
        {
            key: 'DASHBOARD_PAGE.BM.QUICK_ACTIONS.STORE',
            icon: 'isax-shop',
            route: '/financial',
            permissions: ['online-store.view', 'online-store.orders.view', 'online-store.products.view', 'orders-management/view', 'products/view'],
        },
    ];

    get visibleBmQuickActions(): QuickAction[] {
        return this.bmQuickActions.filter((action) => this.hasAnyPermission(action.permissions));
    }

    ngOnInit(): void {
        this.initializeDateRange();
        this.loadDashboard();
        this.loadPlayersReport();
    }

    navigateTo(route: string): void {
        this.router.navigate([route]);
    }

    isDisabled = (date: NgbDate, current?: { year: number; month: number }): boolean => {
        if (!current) return false;
        const now = new Date();
        return date.after(new NgbDate(now.getFullYear(), now.getMonth() + 1, now.getDate()));
    };

    applyDateRange(): void {
        this.loadDashboard();
    }

    resetDateRange(): void {
        this.initializeDateRange();
        this.applyDateRange();
    }

    private hasAnyPermission(permissions: string[]): boolean {
        const userPermissions = new Set(
            (this.authService.currentUserValue?.permissions || [])
                .map((permission) => String(permission || '').trim())
                .filter(Boolean)
        );

        return userPermissions.has('*') || permissions.some((permission) => userPermissions.has(permission));
    }

    private canLoadRentalFacilities(): boolean {
        return this.hasAnyPermission([
            'rentals.view',
            'rentals.facilities.view',
            'rentals.rentals.view',
            'facilities/view',
        ]);
    }

    onFacilityChange(): void {
        this.loadFacilityReport();
    }

    onPlayersPeriodChange(): void {
        this.loadPlayersReport();
        this.loadFacilityReport();
    }

    /**
     * Loads facility statistics from the facilities report endpoint. This is the
     * single source of truth for the facilities card: stats are scoped by the
     * current branch, date range and (optionally) the selected facility via its
     * primary key (facility_id) — not by name, which previously matched on a
     * fuzzy LIKE and returned incorrect data.
     */
    private loadFacilityReport(): void {
        const branchId = this.resolveCurrentBranchId();
        const reportParams: FacilitiesReportFilters = {
            chart_period: this.bmPlayersPeriod,
            date_from: this.toApiDate(this.dateFrom),
            date_to: this.toApiDate(this.dateTo),
        };
        if (this.bmSelectedFacility) {
            reportParams.facility_id = this.bmSelectedFacility;
        }
        if (branchId) {
            reportParams.academy_id = branchId;
        }

        this.facilitiesReportService.getReport(reportParams).pipe(
            catchError(() => of(null))
        ).subscribe((report) => {
            if (!report) {
                return;
            }

            this.facilityReport = report;
            this.facilityRevenue = report.summary.total_revenue;
            this.bmFacilitiesDonutOptions = this.buildFacilityStatusDonutOptions(report);
        });
    }

    private loadFacilities(): void {
        if (!this.canLoadRentalFacilities()) {
            return;
        }

        const branchId = this.resolveCurrentBranchId() ?? this.authService.currentUserValue?.academy?.id;
        if (!branchId) {
            return;
        }

        this.rentalsService.listFacilities(String(branchId), { per_page: 100 }).pipe(
            catchError(() => of({ items: [] as RentalFacility[] }))
        ).subscribe((response) => {
            this.bmFacilityOptions = response.items || [];
        });
    }

    private loadDashboard(): void {
        this.isLoading = true;

        const branchId = this.resolveCurrentBranchId();

        this.loadFacilities();
        this.loadFacilityReport();
        this.loadAttendanceReport();

        this.dashboardService.getStatistics({
            branch_id: branchId,
            date_from: this.toApiDate(this.dateFrom),
            date_to: this.toApiDate(this.dateTo),
        }).pipe(
            finalize(() => { this.isLoading = false; })
        ).subscribe({
            next: (dashboard) => {
                this.financeRevenue = dashboard.revenue?.total ?? this.financeRevenue;
                this.financeExpenses = dashboard.expenses?.total ?? this.financeExpenses;
                this.financeBalance = this.financeRevenue - this.financeExpenses;
                this.subscriptionsActive = dashboard.subscriptions?.active ?? this.subscriptionsActive;
                this.subscriptionsNearExpiry = dashboard.subscriptions?.near_expiry ?? this.subscriptionsNearExpiry;
                this.subscriptionsRefunded = dashboard.subscriptions?.refunded ?? this.subscriptionsRefunded;

                this.bmActivitiesDonutOptions = this.buildActivitiesDonutOptions(dashboard);
            },
            error: () => {
                this.buildCharts();
            },
        });
    }

    /**
     * Player attendance summary (present vs absent) for the selected date range.
     * Uses the player attendance report — not the trainer attendance "today"
     * summary that previously (and incorrectly) backed this card.
     */
    private loadAttendanceReport(): void {
        const branchId = this.resolveCurrentBranchId();
        const reportParams: AttendanceReportFilters = {
            date_from: this.toApiDate(this.dateFrom),
            date_to: this.toApiDate(this.dateTo),
        };
        if (branchId) {
            reportParams.academy_id = branchId;
        }

        this.attendanceReportService.getReport(reportParams).pipe(
            catchError(() => of(null))
        ).subscribe((report) => {
            this.attendanceReport = report;
            this.bmAttendanceDonutOptions = this.buildAttendanceDonutOptions(report);
        });
    }

    private buildCharts(): void {
        const donutBase = {
            chart: { type: 'donut' as const, height: 220 },
            legend: { show: false },
            dataLabels: { enabled: true, formatter: (val: number) => `${Math.round(val)}%` },
            stroke: { width: 4, colors: ['#ffffff'] },
        };

        this.bmFacilitiesDonutOptions = {
            ...donutBase,
            series: [0, 0],
            labels: [
                this.translate.instant('DASHBOARD_PAGE.BM.FACILITIES_CARD.BOOKED'),
                this.translate.instant('DASHBOARD_PAGE.BM.FACILITIES_CARD.AVAILABLE'),
            ],
            colors: ['#faad14', '#4f7cff'],
            plotOptions: {
                pie: {
                    donut: {
                        size: '55%',
                        labels: { show: true, total: { show: true, label: '', formatter: () => '0' } },
                    },
                },
            },
        };

        this.bmActivitiesDonutOptions = {
            ...donutBase,
            series: [35, 65],
            labels: [
                this.translate.instant('DASHBOARD_PAGE.BM.ACTIVITIES_CARD.INACTIVE'),
                this.translate.instant('DASHBOARD_PAGE.BM.ACTIVITIES_CARD.ACTIVE'),
            ],
            colors: ['#fa4b42', '#4f7cff'],
            plotOptions: {
                pie: {
                    donut: {
                        size: '55%',
                        labels: { show: true, total: { show: true, label: '', formatter: () => '4,392' } },
                    },
                },
            },
        };

        this.bmAttendanceDonutOptions = {
            ...donutBase,
            series: [0, 0],
            labels: [
                this.translate.instant('DASHBOARD_PAGE.BM.ATTENDANCE_CARD.PRESENT'),
                this.translate.instant('DASHBOARD_PAGE.BM.ATTENDANCE_CARD.ABSENT'),
            ],
            colors: ['#4f7cff', '#fa4b42'],
            plotOptions: {
                pie: {
                    donut: {
                        size: '55%',
                        labels: { show: true, total: { show: true, label: '', formatter: () => '0' } },
                    },
                },
            },
        };

        const isAr = this.translate.currentLang !== 'en';
        const monthLabels = isAr
            ? ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
            : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        this.bmPlayersAreaOptions = {
            series: [{ name: this.translate.instant('DASHBOARD_PAGE.BM.PLAYERS_CARD.LEGEND'), data: [45, 72, 55, 88, 64, 50, 95, 78, 60, 82, 48, 91] }],
            chart: { type: 'area', height: 250, toolbar: { show: false }, zoom: { enabled: false } },
            stroke: { curve: 'smooth', width: 2 },
            fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0.4, stops: [0, 100] } },
            colors: ['#faad14'],
            dataLabels: { enabled: false },
            xaxis: { categories: monthLabels, labels: { style: { fontSize: '11px' } } },
            yaxis: { min: 0, max: 100, tickAmount: 4, labels: { formatter: (v) => `${v}` } },
            grid: { strokeDashArray: 3 },
            legend: { show: false },
            tooltip: { y: { formatter: (v) => `${v}` } },
        };
    }

    /**
     * Donut for the facilities card. Uses only supported business concepts —
     * Booked vs Available facilities — instead of the previous undefined
     * Internal/External/Training booking-type split that has no corresponding
     * field in the facility/rental workflow.
     */
    private buildFacilityStatusDonutOptions(report: FacilitiesReportPayload): Partial<DonutChartOptions> {
        const booked = Number(report.summary.booked_facilities ?? 0);
        const available = Number(report.summary.available_facilities ?? 0);
        const total = booked + available;

        return {
            chart: { type: 'donut' as const, height: 220 },
            legend: { show: false },
            dataLabels: { enabled: true, formatter: (val: number) => `${Math.round(val)}%` },
            stroke: { width: 4, colors: ['#ffffff'] },
            series: [booked, available],
            labels: [
                this.translate.instant('DASHBOARD_PAGE.BM.FACILITIES_CARD.BOOKED'),
                this.translate.instant('DASHBOARD_PAGE.BM.FACILITIES_CARD.AVAILABLE'),
            ],
            colors: ['#faad14', '#4f7cff'],
            plotOptions: {
                pie: {
                    donut: {
                        size: '55%',
                        labels: { show: true, total: { show: true, label: '', formatter: () => String(total) } },
                    },
                },
            },
        };
    }

    private buildActivitiesDonutOptions(data: DashboardStatisticsResponse | null): Partial<DonutChartOptions> {
        const active = data?.activities?.active ?? 65;
        const inactive = data?.activities?.inactive ?? 35;

        return {
            chart: { type: 'donut' as const, height: 220 },
            legend: { show: false },
            dataLabels: { enabled: true, formatter: (val: number) => `${Math.round(val)}%` },
            stroke: { width: 4, colors: ['#ffffff'] },
            series: [inactive, active],
            labels: [
                this.translate.instant('DASHBOARD_PAGE.BM.ACTIVITIES_CARD.INACTIVE'),
                this.translate.instant('DASHBOARD_PAGE.BM.ACTIVITIES_CARD.ACTIVE'),
            ],
            colors: ['#fa4b42', '#4f7cff'],
            plotOptions: {
                pie: {
                    donut: {
                        size: '55%',
                        labels: { show: true, total: { show: true, label: '', formatter: () => String(active + inactive) } },
                    },
                },
            },
        };
    }

    private buildAttendanceDonutOptions(report: AttendanceReportPayload | null): Partial<DonutChartOptions> {
        const present = Number(report?.summary?.total_attendance ?? 0);
        const absent = Number(report?.summary?.total_absent ?? 0);
        const total = present + absent;

        return {
            chart: { type: 'donut' as const, height: 220 },
            legend: { show: false },
            dataLabels: { enabled: true, formatter: (val: number) => `${Math.round(val)}%` },
            stroke: { width: 4, colors: ['#ffffff'] },
            series: [present, absent],
            labels: [
                this.translate.instant('DASHBOARD_PAGE.BM.ATTENDANCE_CARD.PRESENT'),
                this.translate.instant('DASHBOARD_PAGE.BM.ATTENDANCE_CARD.ABSENT'),
            ],
            colors: ['#4f7cff', '#fa4b42'],
            plotOptions: {
                pie: {
                    donut: {
                        size: '55%',
                        labels: { show: true, total: { show: true, label: '', formatter: () => String(total) } },
                    },
                },
            },
        };
    }

    private initializeDateRange(): void {
        const now = new Date();
        this.dateFrom = { year: now.getFullYear(), month: now.getMonth() + 1, day: 1 };
        this.dateTo = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    }

    private toApiDate(date: NgbDateStruct | null): string | undefined {
        if (!date?.year || !date?.month || !date?.day) {
            return undefined;
        }
        const year = String(date.year).padStart(4, '0');
        const month = String(date.month).padStart(2, '0');
        const day = String(date.day).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    private resolveCurrentBranchId(): number | null {
        const impersonatedBranchRaw = localStorage.getItem('impersonated_branch_id');
        const impersonatedBranchId = impersonatedBranchRaw ? Number(impersonatedBranchRaw) : 0;
        if (Number.isInteger(impersonatedBranchId) && impersonatedBranchId > 0) {
            return impersonatedBranchId;
        }

        const currentUser = this.authService.currentUserValue as any;
        if (currentUser?.academy?.parent_id) {
            const userBranchId = Number(currentUser?.academy?.id ?? 0);
            return Number.isInteger(userBranchId) && userBranchId > 0 ? userBranchId : null;
        }

        return null;
    }

    private loadPlayersReport(): void {
        const branchId = this.resolveCurrentBranchId();
        const range = this.resolvePlayersDateRange();
        const reportParams: Record<string, unknown> = {
            chart_period: this.bmPlayersPeriod,
            date_from: range.from,
            date_to: range.to,
            page: 1,
            per_page: 10,
        };
        if (branchId) {
            reportParams.academy_id = branchId;
        }

        this.playersReportService.getReport(reportParams).pipe(
            catchError(() => of(null))
        ).subscribe((report) => {
            if (!report) {
                return;
            }

            this.playersReport = report;
            this.bmPlayersAreaOptions = this.buildPlayersAreaOptionsFromPlayersReport(report);
        });
    }

    /**
     * The players "over time" chart is independent of the dashboard's global
     * date filter (matching the Figma design): it always renders a rolling
     * window sized to the selected period so the trend has enough buckets to
     * draw a curve instead of a single flat point.
     */
    private resolvePlayersDateRange(): { from: string; to: string } {
        const today = new Date();
        const start = new Date(today);

        switch (this.bmPlayersPeriod) {
            case 'daily':
                start.setDate(start.getDate() - 29); // last 30 days
                break;
            case 'weekly':
                start.setDate(start.getDate() - 7 * 11); // last 12 weeks
                break;
            default:
                start.setDate(1);
                start.setMonth(start.getMonth() - 11); // last 12 months, from month start
                break;
        }

        return { from: this.formatApiDate(start), to: this.formatApiDate(today) };
    }

    private formatApiDate(date: Date): string {
        const year = String(date.getFullYear()).padStart(4, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    /** Turns raw backend bucket keys (e.g. "2026-06", "2026-W26") into friendly axis labels. */
    private formatPlayersCategory(raw: string): string {
        const locale = this.translate.currentLang === 'en' ? 'en-US' : 'ar-EG';

        if (this.bmPlayersPeriod === 'monthly') {
            const [year, month] = raw.split('-').map(Number);
            if (year && month) {
                return new Intl.DateTimeFormat(locale, { month: 'short' }).format(new Date(year, month - 1, 1));
            }
            return raw;
        }

        if (this.bmPlayersPeriod === 'weekly') {
            const match = /W(\d+)/i.exec(raw);
            const week = match ? match[1] : raw;
            return this.translate.instant('DASHBOARD_PAGE.BM.PLAYERS_CARD.WEEK_SHORT', { week });
        }

        const parsed = new Date(`${raw}T12:00:00`);
        if (!Number.isNaN(parsed.getTime())) {
            return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' }).format(parsed);
        }
        return raw;
    }

    private buildPlayersAreaOptionsFromPlayersReport(report: PlayersReportPayload): Partial<AreaChartOptions> {
        const series = report.chart.series || [{ name: this.translate.instant('DASHBOARD_PAGE.BM.PLAYERS_CARD.LEGEND'), data: [] }];
        const categories = (report.chart.categories || []).map((category) => this.formatPlayersCategory(category));
        const maxValue = Math.max(...series[0]?.data.map((value) => Number(value)) ?? [100]);

        return {
            series,
            chart: { type: 'area', height: 250, toolbar: { show: false }, zoom: { enabled: false } },
            stroke: { curve: 'smooth', width: 2 },
            fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0.4, stops: [0, 100] } },
            colors: ['#faad14'],
            dataLabels: { enabled: false },
            xaxis: { categories, labels: { style: { fontSize: '11px' } } },
            yaxis: { min: 0, max: Math.max(maxValue, 100), tickAmount: 4, labels: { formatter: (v) => `${v}` } },
            grid: { strokeDashArray: 3 },
            legend: { show: false },
            tooltip: { y: { formatter: (v) => `${v}` } },
        };
    }
}
