import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { mustNumberPattern, numberMoreThanZeroPattern, userNamePattern } from 'src/app/app-const';

@Component({
  selector: 'app-nz-control-error-temp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nz-control-error-temp.component.html',
  styleUrls: ['./nz-control-error-temp.component.scss']
})
export class NzControlErrorTempComponent  {
  @Input({required: true}) control: FormControl | undefined;
  mustNumberPattern = mustNumberPattern;
  numberMoreThanZeroPattern = numberMoreThanZeroPattern;
  userNamePattern = userNamePattern;

  get serverErrorMessage(): string {
    const serverError = this.control?.errors?.['server'];

    if (typeof serverError === 'string' && serverError.trim() !== '') {
      return serverError;
    }

    if (serverError && typeof serverError.message === 'string' && serverError.message.trim() !== '') {
      return serverError.message;
    }

    return 'المدخل غير صحيح';
  }

  get outsideAcademyTimeMessage(): string {
    const outsideAcademyTime = this.control?.errors?.['outsideAcademyTime'];

    if (!outsideAcademyTime) {
      return 'وقت العمل يجب أن يكون ضمن نطاق وقت الأكاديمية';
    }

    if (typeof outsideAcademyTime === 'object') {
      const start = String((outsideAcademyTime as { start?: unknown }).start ?? '').trim();
      const end = String((outsideAcademyTime as { end?: unknown }).end ?? '').trim();

      if (start && end) {
        return `وقت العمل يجب أن يكون ضمن نطاق مواعيد الأكاديمية (${start} - ${end})`;
      }
    }

    return 'وقت العمل يجب أن يكون ضمن نطاق وقت الأكاديمية';
  }
}
