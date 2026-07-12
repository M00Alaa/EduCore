import { Component, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";
import { NgbCalendar, NgbDate, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import {
    ApexAxisChartSeries,
    ApexChart,
    ApexDataLabels,
    ApexGrid,
    ApexLegend,
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexStroke,
    ApexTooltip,
    ApexXAxis,
    ApexYAxis,
} from "ng-apexcharts";
import { finalize } from "rxjs";
import { DashboardBranchOption, DashboardBreakdownRow, DashboardStatisticsResponse } from "src/app/core/backend/academy/models/dashboard-manual.models";
import { DashboardManualService } from "src/app/core/backend/academy/services/dashboard-manual.service";
import { AuthenticationService } from "src/app/core/services/auth.service";

type AxisChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels?: ApexDataLabels;
    plotOptions?: ApexPlotOptions;
    stroke?: ApexStroke;
    colors?: string[];
    xaxis?: ApexXAxis;
    yaxis?: ApexYAxis;
    grid?: ApexGrid;
    legend?: ApexLegend;
    tooltip?: ApexTooltip;
};

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

type DashboardSectionKey =
    | "branchSubscriptions"
    | "subscriptions"
    | "activities"
    | "dailyRevenue"
    | "expenses"
    | "revenue";

@Component({
    selector: 'app-academy-admin-dashboard',
    templateUrl: './academy-admin-dashboard.component.html',
    standalone: false,
})
export class AcademyAdminDashboardComponent implements OnInit {
    private calendar = inject(NgbCalendar);
    private router = inject(Router);

    zatcaActivated: boolean = false;
    zatcaBannerDismissed: boolean = false;

    constructor(
        private dashboardService: DashboardManualService,
        private translate: TranslateService,
        private authService: AuthenticationService,
    ) { }

    readonly branchColors = ['#49B6FF', '#faad14', '#4f7cff', '#6b7280', '#faad14', '#7850f0'];
    readonly progressTypes = ['info', 'success', 'warning'];

    isLoading = false;
    dashboard: DashboardStatisticsResponse | null = null;
    branches: DashboardBranchOption[] = [];
    selectedDate: NgbDateStruct | null = null;

    readonly sectionKeys: DashboardSectionKey[] = [
        "branchSubscriptions",
        "subscriptions",
        "activities",
        "dailyRevenue",
        "expenses",
        "revenue",
    ];

    sectionBranchFilters: Record<DashboardSectionKey, number | 0 | null> = {
        branchSubscriptions: 0,
        subscriptions: 0,
        activities: 0,
        dailyRevenue: 0,
        expenses: 0,
        revenue: 0,
    };

    sectionLoading: Record<DashboardSectionKey, boolean> = {
        branchSubscriptions: false,
        subscriptions: false,
        activities: false,
        dailyRevenue: false,
        expenses: false,
        revenue: false,
    };

    branchSubscriptionsOptions: Partial<AxisChartOptions> = {};
    messagesDonutOptions: Partial<DonutChartOptions> = {};
    activitiesDonutOptions: Partial<DonutChartOptions> = {};
    dailyRevenueOptions: Partial<AxisChartOptions> = {};
    subscriptionsSummaryData: DashboardStatisticsResponse["subscriptions"] | null = null;
    expensesSummaryData: DashboardStatisticsResponse["expenses"] | null = null;
    revenueSummaryData: DashboardStatisticsResponse["revenue"] | null = null;

    ngOnInit(): void {
        this.loadDashboard();

        this.zatcaActivated = this.authService.currentUserValue?.zatca ?? false;
    }

    isDisabled = (date: NgbDate, current?: { year: number; month: number }): boolean => {
        if (!current) return false;
        const today = new NgbDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
        return date.after(today);
    };

    isWeekend = (date: NgbDate) => this.calendar.getWeekday(date) >= 6;

    onSectionBranchChange(section: DashboardSectionKey): void {
        this.loadSection(section);
    }

    onSelectedDateChange(): void {
        this.loadDashboard();
    }

    clearSelectedDate(): void {
        this.selectedDate = null;
        this.loadDashboard();
    }

    get subscriberRows() {
        return this.dashboard?.subscribers.branches ?? [];
    }

    get subscriptionsSummary(): DashboardStatisticsResponse["subscriptions"] {
        return this.subscriptionsSummaryData
            ?? this.dashboard?.subscriptions
            ?? { total: 0, active: 0, expired: 0, near_expiry: 0, incomplete: 0, stopped: 0, refunded: 0 };
    }

    get revenueSummary(): DashboardStatisticsResponse["revenue"] {
        return this.revenueSummaryData
            ?? this.dashboard?.revenue
            ?? { total: 0, daily: [], breakdown: [] };
    }

    get expensesSummary(): DashboardStatisticsResponse["expenses"] {
        return this.expensesSummaryData
            ?? this.dashboard?.expenses
            ?? { total: 0, breakdown: [] };
    }

    get revenueBreakdown(): DashboardBreakdownRow[] {
        return this.revenueSummary.breakdown ?? [];
    }

    get expensesBreakdown(): DashboardBreakdownRow[] {
        return this.expensesSummary.breakdown ?? [];
    }

    getSegmentColor(index: number): string {
        return this.branchColors[index % this.branchColors.length];
    }

    getSegmentWidth(value: number, total: number): number {
        if (!total || total <= 0) return 0;
        return (value / total) * 100;
    }

    getProgressType(index: number): string {
        return this.progressTypes[index % this.progressTypes.length];
    }

    activateZatca(): void {
        this.router.navigate(['/settings/zatca-activate']);
    }

    dismissZatcaBanner(): void {
        this.zatcaBannerDismissed = true;
    }

    private loadDashboard(): void {
        this.isLoading = true;
        this.dashboardService.getStatistics({
            selected_date: this.formatSelectedDate(),
        }).pipe(
            finalize(() => { this.isLoading = false; })
        ).subscribe({
            next: (response) => {
                this.dashboard = response;
                this.branches = response.branches;
                this.messagesDonutOptions = this.buildMessagesDonutOptions(response);
                this.initializeSectionBranchFilters(response.scope.selected_branch_id ?? 0);
                this.reloadAllSections();
            },
            error: () => {
                this.dashboard = null;
                this.branches = [];
                this.branchSubscriptionsOptions = {};
                this.activitiesDonutOptions = {};
                this.messagesDonutOptions = {};
                this.dailyRevenueOptions = {};
                this.subscriptionsSummaryData = null;
                this.expensesSummaryData = null;
                this.revenueSummaryData = null;
            },
        });
    }

    private initializeSectionBranchFilters(defaultBranchId: number | 0): void {
        const validBranchIds = new Set<number>([0, ...this.branches.map((branch) => Number(branch.id))]);
        this.sectionKeys.forEach((section) => {
            const currentValue = Number(this.sectionBranchFilters[section] ?? defaultBranchId ?? 0);
            this.sectionBranchFilters[section] = validBranchIds.has(currentValue)
                ? currentValue
                : defaultBranchId;
        });
    }

    private reloadAllSections(): void {
        this.sectionKeys.forEach((section) => this.loadSection(section));
    }

    private loadSection(section: DashboardSectionKey): void {
        this.sectionLoading[section] = true;
        this.dashboardService.getStatistics({
            branch_id: this.sectionBranchFilters[section],
            selected_date: this.formatSelectedDate(),
        }).pipe(
            finalize(() => { this.sectionLoading[section] = false; })
        ).subscribe({
            next: (response) => {
                this.applySectionResponse(section, response);
            },
            error: () => {
                this.resetSection(section);
            },
        });
    }

    private applySectionResponse(section: DashboardSectionKey, response: DashboardStatisticsResponse): void {
        switch (section) {
            case "branchSubscriptions":
                this.branchSubscriptionsOptions = this.buildBranchSubscriptionsOptions(response);
                break;
            case "subscriptions":
                this.subscriptionsSummaryData = response.subscriptions;
                break;
            case "activities":
                this.activitiesDonutOptions = this.buildActivitiesDonutOptions(response);
                break;
            case "dailyRevenue":
                this.dailyRevenueOptions = this.buildDailyRevenueOptions(response);
                break;
            case "expenses":
                this.expensesSummaryData = response.expenses;
                break;
            case "revenue":
                this.revenueSummaryData = response.revenue;
                break;
            default:
                break;
        }
    }

    private resetSection(section: DashboardSectionKey): void {
        switch (section) {
            case "branchSubscriptions":
                this.branchSubscriptionsOptions = {};
                break;
            case "subscriptions":
                this.subscriptionsSummaryData = null;
                break;
            case "activities":
                this.activitiesDonutOptions = {};
                break;
            case "dailyRevenue":
                this.dailyRevenueOptions = {};
                break;
            case "expenses":
                this.expensesSummaryData = null;
                break;
            case "revenue":
                this.revenueSummaryData = null;
                break;
            default:
                break;
        }
    }

    private buildBranchSubscriptionsOptions(data: DashboardStatisticsResponse): Partial<AxisChartOptions> {
        return {
            series: [
                { name: this.translate.instant("DASHBOARD_PAGE.BRANCH_SUBSCRIPTIONS.REVENUE"), data: data.subscriptions_chart.revenue },
                { name: this.translate.instant("DASHBOARD_PAGE.BRANCH_SUBSCRIPTIONS.SUBSCRIPTIONS_COUNT"), data: data.subscriptions_chart.subscriptions_count },
            ],
            chart: { height: 222, type: "bar", toolbar: { show: false } },
            plotOptions: { bar: { columnWidth: "38%", borderRadius: 6 } },
            dataLabels: { enabled: false },
            stroke: { show: true, width: 0, colors: ["transparent"] },
            colors: ["#49B6FF", "#4f7cff"],
            xaxis: { categories: data.subscriptions_chart.categories },
            yaxis: { labels: { formatter: (value) => `${value}` } },
            grid: { strokeDashArray: 3 },
            legend: { show: false },
            tooltip: { y: { formatter: (value) => `${value}` } },
        };
    }

    private buildMessagesDonutOptions(data: DashboardStatisticsResponse): Partial<DonutChartOptions> {
        return {
            series: [data.messages.replied, data.messages.unread, data.messages.not_replied],
            chart: { type: "donut", height: 250 },
            labels: [
                this.translate.instant("DASHBOARD_PAGE.MESSAGES_CARD.REPLIED"),
                this.translate.instant("DASHBOARD_PAGE.MESSAGES_CARD.UNREAD"),
                this.translate.instant("DASHBOARD_PAGE.MESSAGES_CARD.NOT_REPLIED"),
            ],
            colors: ["#1b84ff", "#faad14", "#faad14"],
            legend: { show: false },
            dataLabels: { enabled: false },
            stroke: { width: 4, colors: ["#ffffff"] },
            plotOptions: {
                pie: {
                    startAngle: -90, endAngle: 90, expandOnClick: false,
                    dataLabels: { offset: 0, minAngleToShowLabel: 360 },
                    donut: { size: "70%", labels: { show: false } },
                },
            },
        };
    }

    private buildActivitiesDonutOptions(data: DashboardStatisticsResponse): Partial<DonutChartOptions> {
        return {
            series: [data.activities.active, data.activities.inactive],
            chart: { type: "donut", height: 220 },
            labels: [
                this.translate.instant("DASHBOARD_PAGE.ACTIVITIES_CARD.ACTIVE"),
                this.translate.instant("DASHBOARD_PAGE.ACTIVITIES_CARD.INACTIVE"),
            ],
            colors: ["#64bdc6", "#49B6FF"],
            legend: { show: false },
            dataLabels: { enabled: false },
            stroke: { width: 4, colors: ["#ffffff"] },
            plotOptions: {
                pie: {
                    expandOnClick: false,
                    dataLabels: { offset: 0, minAngleToShowLabel: 360 },
                    donut: { size: "70%", labels: { show: false } },
                },
            },
        };
    }

    private buildDailyRevenueOptions(data: DashboardStatisticsResponse): Partial<AxisChartOptions> {
        return {
            series: [{ name: this.translate.instant("DASHBOARD_PAGE.REVENUE_CARD.TITLE"), data: data.revenue.daily.map((item) => item.amount) }],
            chart: { height: 255, type: "bar", toolbar: { show: false } },
            plotOptions: { bar: { columnWidth: "48%", borderRadius: 6 } },
            dataLabels: { enabled: false },
            stroke: { show: false },
            colors: ["#23c16b"],
            xaxis: { categories: data.revenue.daily.map((item) => this.getDayLabel(item.date)) },
            yaxis: { labels: { formatter: (value) => `${value}` } },
            grid: { strokeDashArray: 4 },
            tooltip: { y: { formatter: (value) => `${value}` } },
        };
    }

    private formatSelectedDate(): string | null {
        if (!this.selectedDate) return null;
        const year = String(this.selectedDate.year);
        const month = String(this.selectedDate.month).padStart(2, '0');
        const day = String(this.selectedDate.day).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    private getDayLabel(date: string): string {
        const locale = this.translate.currentLang === 'en' ? 'en-US' : 'ar-EG';
        return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(new Date(`${date}T12:00:00`));
    }
}
