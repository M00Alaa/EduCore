import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from '../courses.service';
import { Course } from '../courses.model';

@Component({
  selector: 'app-course-details',
  standalone: false,
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})
export class CourseDetailsComponent implements OnInit {
  course: Course | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadCourse(+id);
    }
  }

  loadCourse(id: number): void {
    this.loading = true;
    this.error = null;
    this.coursesService.getCourseById(id).subscribe({
      next: (course) => {
        this.course = course!;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load course details.';
        this.loading = false;
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
}