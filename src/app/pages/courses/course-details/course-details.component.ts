import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Course } from '../courses.model';
import { CoursesService } from '../courses.service';
import { CourseStatusBadgeComponent } from 'src/app/shared/components/status-badge/status-badge.component';
import { SWALConfirmation } from 'src/app/app-const';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [
    CommonModule,
    NzSkeletonModule,
    TranslateModule,
    CourseStatusBadgeComponent
  ],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})
export class CourseDetailsComponent implements OnInit {
  course: Course | null = null;
  loading = false;
  error = false;

  skeletonRows = Array.from({ length: 4 });

  constructor(
    private coursesService: CoursesService,
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
    this.coursesService.getCourseById(id).subscribe({
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
      this.coursesService.deleteCourse(this.course.id),
      this.translate.instant('COURSES.TOAST.DELETE_SUCCESS'),
      this.translate.instant('COURSES.DELETE.CONFIRM'),
      this.translate.instant('COURSES.DELETE.MESSAGE')
    ).then(() => {
      this.router.navigate(['/courses']);
    });
  }
}
