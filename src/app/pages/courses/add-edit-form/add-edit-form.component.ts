import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CourseStatus } from 'src/app/core/backend/courses/models/courses.model';
import { CoursesBackendService } from 'src/app/core/backend/courses/services/courses.service';
import { ShowSWAL } from 'src/app/app-const';
import { FormSharedModule } from 'src/app/shared/modules/nz-form-full/nz-form-full.module';
import { CustomDropzonePreviewComponent } from 'src/app/shared/components/custom-image-previewer/custom-dropzone-preview.component';

@Component({
  selector: 'app-add-edit-form',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormSharedModule, CustomDropzonePreviewComponent],
  templateUrl: './add-edit-form.component.html',
  styleUrl: './add-edit-form.component.scss'
})
export class AddEditFormComponent implements OnInit {
  courseForm: FormGroup;
  isEditMode = false;
  courseId: number | null = null;
  loading = false;
  submitting = false;
  imagePreviewUrl: string | null = null;

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
    private coursesBackend: CoursesBackendService,
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
      imageUrl: [''],
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
      this.coursesBackend.getById(this.courseId).subscribe({
        next: (course) => {
          if (course) {
            this.courseForm.patchValue(course);
            if (course.imageUrl) {
              this.imagePreviewUrl = course.imageUrl;
            }
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
      Object.values(this.courseForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }

    this.submitting = true;
    const formValue = this.courseForm.value;

    const operation = this.isEditMode
      ? this.coursesBackend.update(this.courseId!, formValue)
      : this.coursesBackend.create(formValue);

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

  onFileSelect(event: any): void {
    const files: File[] = event.addedFiles || event.target?.files || [];
    if (files.length > 0) {
      const file = files[0];
      this.imagePreviewUrl = URL.createObjectURL(file);
      this.courseForm.patchValue({ imageUrl: this.imagePreviewUrl });
    }
  }

  onRemoveImage(): void {
    if (this.imagePreviewUrl) {
      URL.revokeObjectURL(this.imagePreviewUrl);
    }
    this.imagePreviewUrl = null;
    this.courseForm.patchValue({ imageUrl: '' });
  }

  get f() {
    return this.courseForm.controls;
  }
}
