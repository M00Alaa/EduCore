import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Course } from 'src/app/core/backend/courses/models/courses.model';
import { CoursesBackendService } from 'src/app/core/backend/courses/services/courses.service';
import { CourseStatusBadgeComponent } from 'src/app/shared/components/status-badge/status-badge.component';
import { SWALConfirmation } from 'src/app/app-const';
import { NzSpinComponent } from "ng-zorro-antd/spin";

interface SyllabusLesson {
    number: number;
    title: string;
    duration: string;
}

@Component({
    selector: 'app-course-details',
    standalone: true,
    imports: [
        CommonModule,
        NzSkeletonModule,
        TranslateModule,
        CourseStatusBadgeComponent,
        NzSpinComponent
    ],
    templateUrl: './course-details.component.html'
})
export class CourseDetailsComponent implements OnInit {
    course: Course | null = null;
    loading = false;
    error = false;
    skeletonRows = Array.from({ length: 4 });

    syllabus: SyllabusLesson[] = [
        { number: 1, title: 'Advanced State Architecture', duration: '2h 15m' },
        { number: 2, title: 'Reactive Patterns & Observables', duration: '1h 45m' },
        { number: 3, title: 'Component Design Systems', duration: '2h 30m' },
        { number: 4, title: 'Performance Optimization', duration: '1h 50m' },
        { number: 5, title: 'Testing Strategies', duration: '2h 00m' },
        { number: 6, title: 'Deployment & CI/CD', duration: '1h 30m' },
    ];

    fullDescription = `This comprehensive course takes you from intermediate to advanced proficiency in modern web development. You will explore sophisticated patterns and architectures that power enterprise-scale applications. Through hands-on projects and real-world scenarios, you will build a deep understanding of how to design, implement, and maintain complex systems.

The curriculum covers cutting-edge techniques including state management, reactive programming, component architecture, and performance optimization. Each module builds upon the previous one, ensuring a solid foundation before moving to more advanced topics.

By the end of this course, you will have the skills and confidence to architect and build production-ready applications that can scale to meet the demands of thousands of users. You will also gain practical experience with industry-standard tools and workflows that are essential for modern development teams.`;

    constructor(
        private coursesBackend: CoursesBackendService,
        private router: Router,
        private route: ActivatedRoute,
        private translate: TranslateService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.params['id'];
        if (id) {
            this.loadCourse(+id);
        }
    }

    loadCourse(id: number): void {
        this.loading = true;
        this.error = false;
        this.coursesBackend.getById(id).subscribe({
            next: (course) => {
                this.course = course || null;
                this.loading = false;
                if (!this.course) {
                    this.error = true;
                }
            },
            error: () => {
                this.loading = false;
                this.error = true;
            }
        });
    }

    goBack(): void {
        this.router.navigate(['/courses']);
    }

    editCourse(): void {
        if (this.course) {
            this.router.navigate(['/courses', 'edit', this.course.id]);
        }
    }

    deleteCourse(): void {
        if (!this.course) return;
        SWALConfirmation(
            'warning',
            this.translate.instant('COURSES.DELETE.TITLE'),
            this.coursesBackend.delete(this.course.id),
            this.translate.instant('COURSES.TOAST.DELETE_SUCCESS'),
            this.translate.instant('COURSES.DELETE.CONFIRM'),
            this.translate.instant('COURSES.DELETE.MESSAGE')
        ).then(() => {
            this.router.navigate(['/courses']);
        });
    }
}
