import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CourseStatus } from '../courses.model';
import { CoursesService } from '../courses.service';
import { ShowSWAL } from 'src/app/app-const';

@Component({
  selector: 'app-add-edit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule, TranslateModule],
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
  categoryOptions = [
    'Frontend',
    'Backend',
    'Design',
    'Mobile',
    'DevOps',
    'Data Science',
    'AI',
    'Other'
  ];

  maxDescription = 500;

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {
    this.courseForm = this.fb.group({
      courseName: ['', [Validators.required, Validators.minLength(3)]],
      instructorName: ['', [Validators.required]],
      category: ['', [Validators.required]],
      duration: [null, [Validators.required, Validators.min(1)]],
      price: [null, [Validators.required, Validators.min(0)]],
      status: ['Active' as CourseStatus, [Validators.required]],
      description: ['', [Validators.maxLength(this.maxDescription)]]
    });
  }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['id']
      ? +this.route.snapshot.params['id']
      : null;
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
        error: () => {
          ShowSWAL('error', this.translate.instant('COURSES.UNEXPECTED_ERROR'), this.translate.instant('COURSES.TOAST.LOAD_FAILED'));
          this.loading = false;
          this.router.navigate(['/courses']);
        }
      });
    }
  }

  get descriptionLength(): number {
    return this.courseForm.get('description')?.value?.length || 0;
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const formValue = this.courseForm.value;

    const operation = this.isEditMode
      ? this.coursesService.updateCourse(this.courseId!, formValue)
      : this.coursesService.createCourse(formValue);

    operation.subscribe({
      next: () => {
        this.submitting = false;
        if (this.isEditMode) {
          ShowSWAL('success', this.translate.instant('COURSES.TOAST.UPDATE_SUCCESS'), formValue.courseName);
        } else {
          ShowSWAL('success', this.translate.instant('COURSES.TOAST.CREATE_SUCCESS'), formValue.courseName);
        }
        this.router.navigate(['/courses']);
      },
      error: () => {
        this.submitting = false;
        ShowSWAL('error', this.translate.instant('COURSES.TOAST.FAILED_SAVE'), this.translate.instant('COURSES.TOAST.SAVE_FAILED_MSG'));
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/courses']);
  }

  get f() {
    return this.courseForm.controls;
  }
}
