import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SWAL } from '../../../app-const';
import { ActivatedRoute, Router } from '@angular/router';
import { Course, CourseStatus } from '../courses.model';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-add-edit-form',
  standalone: false,
  templateUrl: './add-edit-form.component.html',
  styleUrl: './add-edit-form.component.scss'
})
export class AddEditFormComponent implements OnInit {
  courseForm: FormGroup;
  isEditMode = false;
  courseId: number | null = null;
  loading = false;
  submitting = false;

  statusOptions: CourseStatus[] = ['Active', 'Draft', 'Archived'];
  categoryOptions = ['Frontend', 'Backend', 'Design', 'Mobile', 'DevOps', 'Data Science', 'AI', 'Other'];

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.courseForm = this.fb.group({
      courseName: ['', [Validators.required, Validators.minLength(3)]],
      instructorName: ['', Validators.required],
      category: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      status: ['', Validators.required],
      description: ['', [Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    this.isEditMode = !!this.courseId;

    if (this.isEditMode && this.courseId) {
      this.loading = true;
      this.coursesService.getCourseById(this.courseId).subscribe({
        next: (course) => {
          if (course) {
            this.courseForm.patchValue(course);
          }
          this.loading = false;
        },
        error: (err) => {
          SWAL('error', 'Failed to load course');
          this.loading = false;
          this.router.navigate(['/courses']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const courseData: Course = {
      ...this.courseForm.value,
      id: this.isEditMode ? this.courseId! : Date.now(),
      createdDate: this.isEditMode ? this.courseForm.value.createdDate : new Date().toISOString().split('T')[0]
    };

    const operation = this.isEditMode
      ? this.coursesService.updateCourse(this.courseId!, courseData)
      : this.coursesService.createCourse(courseData);

    operation.subscribe({
      next: () => {
        SWAL('success', `Course ${this.isEditMode ? 'updated' : 'created'} successfully`);
        this.router.navigate(['/courses']);
      },
      error: (err) => {
        SWAL('error', `Failed to ${this.isEditMode ? 'update' : 'create'} course`);
        this.submitting = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/courses']);
  }

  // Helper methods for template
  get courseName() { return this.courseForm.get('courseName'); }
  get instructorName() { return this.courseForm.get('instructorName'); }
  get category() { return this.courseForm.get('category'); }
  get duration() { return this.courseForm.get('duration'); }
  get price() { return this.courseForm.get('price'); }
  get status() { return this.courseForm.get('status'); }
  get description() { return this.courseForm.get('description'); }
}