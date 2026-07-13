import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { NgApexchartsModule } from "ng-apexcharts";
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

type QuickAction = {
    key: string;
    icon: string;
    route: string;
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

@Component({
    selector: 'app-bm-dashboard',
    templateUrl: './bm-dashboard.component.html',
    standalone: true,
    imports: [
        CommonModule,
        TranslateModule,
        NgApexchartsModule
    ]
})
export class BmDashboardComponent {
    private router = inject(Router);
    private translate = inject(TranslateService);

    // Static data for courses
    coursesActive = 24;
    coursesDraft = 8;
    coursesArchived = 12;

    // Static data for students
    studentsActive = 156;
    studentsInactive = 24;
    studentsTotal = 180;

    // Static data for instructors
    instructorsActive = 12;
    instructorsPending = 3;
    instructorsTotal = 15;

    // Chart options
    coursesDonutOptions: Partial<DonutChartOptions> = {};
    studentsDonutOptions: Partial<DonutChartOptions> = {};
    instructorsDonutOptions: Partial<DonutChartOptions> = {};
    coursesAreaOptions: Partial<AreaChartOptions> = {};

    // Quick actions
    readonly bmQuickActions: QuickAction[] = [
        {
            key: 'DASHBOARD_PAGE.BM.QUICK_ACTIONS.NEW_COURSE',
            icon: 'isax-add-circle',
            route: '/courses',
        },
        {
            key: 'DASHBOARD_PAGE.BM.QUICK_ACTIONS.VIEW_COURSES',
            icon: 'isax-document-text',
            route: '/courses',
        },
        {
            key: 'DASHBOARD_PAGE.BM.QUICK_ACTIONS.NEW_INSTRUCTOR',
            icon: 'isax-teacher',
            route: '/instructors',
        },
        {
            key: 'DASHBOARD_PAGE.BM.QUICK_ACTIONS.VIEW_INSTRUCTORS',
            icon: 'isax-user-group',
            route: '/instructors',
        },
        {
            key: 'DASHBOARD_PAGE.BM.QUICK_ACTIONS.NEW_STUDENT',
            icon: 'isax-user-add',
            route: '/students',
        },
        {
            key: 'DASHBOARD_PAGE.BM.QUICK_ACTIONS.VIEW_STUDENTS',
            icon: 'isax-users',
            route: '/students',
        },
    ];

    get visibleBmQuickActions(): QuickAction[] {
        return this.bmQuickActions;
    }

    ngOnInit(): void {
        this.initCharts();
    }

    navigateTo(route: string): void {
        this.router.navigate([route]);
    }

    private initCharts(): void {
        const isAr = this.translate.currentLang !== 'en';

        // Courses donut chart
        this.coursesDonutOptions = {
            series: [this.coursesActive, this.coursesDraft, this.coursesArchived],
            chart: { type: 'donut', height: 220 },
            labels: [
                this.translate.instant('DASHBOARD_PAGE.BM.COURSES_CARD.ACTIVE'),
                this.translate.instant('DASHBOARD_PAGE.BM.COURSES_CARD.DRAFT'),
                this.translate.instant('DASHBOARD_PAGE.BM.COURSES_CARD.ARCHIVED')
            ],
            colors: ['#4f7cff', '#faad14', '#6b7280'],
            legend: { show: false },
            dataLabels: { enabled: true, formatter: (val: number) => `${Math.round(val)}%` },
            stroke: { width: 4, colors: ['#ffffff'] },
            plotOptions: {
                pie: {
                    donut: {
                        size: '55%',
                        labels: { show: true, total: { show: true, label: '', formatter: () => String(this.coursesActive + this.coursesDraft + this.coursesArchived) } },
                    },
                },
            },
        };

        // Students donut chart
        this.studentsDonutOptions = {
            series: [this.studentsActive, this.studentsInactive],
            chart: { type: 'donut', height: 220 },
            labels: [
                this.translate.instant('DASHBOARD_PAGE.BM.STUDENTS_CARD.ACTIVE'),
                this.translate.instant('DASHBOARD_PAGE.BM.STUDENTS_CARD.INACTIVE')
            ],
            colors: ['#23c16b', '#fa4b42'],
            legend: { show: false },
            dataLabels: { enabled: true, formatter: (val: number) => `${Math.round(val)}%` },
            stroke: { width: 4, colors: ['#ffffff'] },
            plotOptions: {
                pie: {
                    donut: {
                        size: '55%',
                        labels: { show: true, total: { show: true, label: '', formatter: () => String(this.studentsTotal) } },
                    },
                },
            },
        };

        // Instructors donut chart
        this.instructorsDonutOptions = {
            series: [this.instructorsActive, this.instructorsPending],
            chart: { type: 'donut', height: 220 },
            labels: [
                this.translate.instant('DASHBOARD_PAGE.BM.INSTRUCTORS_CARD.ACTIVE'),
                this.translate.instant('DASHBOARD_PAGE.BM.INSTRUCTORS_CARD.PENDING')
            ],
            colors: ['#49B6FF', '#faad14'],
            legend: { show: false },
            dataLabels: { enabled: true, formatter: (val: number) => `${Math.round(val)}%` },
            stroke: { width: 4, colors: ['#ffffff'] },
            plotOptions: {
                pie: {
                    donut: {
                        size: '55%',
                        labels: { show: true, total: { show: true, label: '', formatter: () => String(this.instructorsTotal) } },
                    },
                },
            },
        };

        // Courses area chart
        const monthLabels = isAr
            ? ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
            : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        this.coursesAreaOptions = {
            series: [{ name: this.translate.instant('DASHBOARD_PAGE.BM.COURSES_CARD.ACTIVE'), data: [12, 15, 18, 22, 20, 24, 22, 20, 18, 16, 14, 12] }],
            chart: { type: 'area', height: 250, toolbar: { show: false }, zoom: { enabled: false } },
            stroke: { curve: 'smooth', width: 2 },
            fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0.4, stops: [0, 100] } },
            colors: ['#4f7cff'],
            dataLabels: { enabled: false },
            xaxis: { categories: monthLabels, labels: { style: { fontSize: '11px' } } },
            yaxis: { min: 0, max: 30, tickAmount: 4, labels: { formatter: (v) => `${v}` } },
            grid: { strokeDashArray: 3 },
            legend: { show: false },
            tooltip: { y: { formatter: (v) => `${v}` } },
        };
    }
}
