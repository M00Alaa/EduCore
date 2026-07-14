import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

interface PageContent {
    icon: string;
    titleKey: string;
    subtitleKey: string;
    messageKey: string;
}

interface RoadmapItem {
    labelKey: string;
    done: boolean;
}

@Component({
    selector: 'app-coming-soon',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    templateUrl: './coming-soon.component.html'
})
export class ComingSoonComponent implements OnInit {
    pageContent!: PageContent;
    roadmapItems: RoadmapItem[] = [
        { labelKey: 'COMING_SOON.ROADMAP.DASHBOARD', done: true },
        { labelKey: 'COMING_SOON.ROADMAP.COURSES', done: true },
        { labelKey: 'COMING_SOON.ROADMAP.STUDENTS', done: false },
        { labelKey: 'COMING_SOON.ROADMAP.INSTRUCTORS', done: false },
        { labelKey: 'COMING_SOON.ROADMAP.REPORTS', done: false },
        { labelKey: 'COMING_SOON.ROADMAP.SETTINGS', done: false },
    ];

    coffeeCups = Array(7);

    private pageContentMap: Record<string, PageContent> = {
        students: {
            icon: 'assets/images/students.svg',
            titleKey: 'COMING_SOON.PAGES.STUDENTS.TITLE',
            subtitleKey: 'COMING_SOON.PAGES.STUDENTS.SUBTITLE',
            messageKey: 'COMING_SOON.PAGES.STUDENTS.MESSAGE',
        },
        instructors: {
            icon: 'assets/images/teachers.svg',
            titleKey: 'COMING_SOON.PAGES.INSTRUCTORS.TITLE',
            subtitleKey: 'COMING_SOON.PAGES.INSTRUCTORS.SUBTITLE',
            messageKey: 'COMING_SOON.PAGES.INSTRUCTORS.MESSAGE',
        },
        reports: {
            icon: 'assets/images/reports.svg',
            titleKey: 'COMING_SOON.PAGES.REPORTS.TITLE',
            subtitleKey: 'COMING_SOON.PAGES.REPORTS.SUBTITLE',
            messageKey: 'COMING_SOON.PAGES.REPORTS.MESSAGE',
        },
        settings: {
            icon: 'assets/images/settings.svg',
            titleKey: 'COMING_SOON.PAGES.SETTINGS.TITLE',
            subtitleKey: 'COMING_SOON.PAGES.SETTINGS.SUBTITLE',
            messageKey: 'COMING_SOON.PAGES.SETTINGS.MESSAGE',
        },
    };

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        const path = this.route.snapshot.url[0]?.path || '';
        this.pageContent = this.pageContentMap[path] || this.pageContentMap['students'];
    }

    goHome(): void {
        this.router.navigate(['/courses']);
    }
}
