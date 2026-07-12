import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbDropdownModule, NgbModalModule, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { IsRequiredPipe } from '../../pipes/is-required.pipe';
import { NzControlErrorTempComponent } from '../../components/nz-control-error-temp/nz-control-error-temp.component';
import { PasswordInputComponent } from '../../components/password-input/password-input.component';



@NgModule({
  imports: [IsRequiredPipe,
    NzControlErrorTempComponent,
    PasswordInputComponent,
  ],
  exports: [
    NgbPaginationModule,
    NgbAccordionModule,
    NzTableModule,
    NzSwitchModule,
    NzDatePickerModule,
    NzControlErrorTempComponent,
    NgxDropzoneModule,
    NzImageModule,
    FormsModule,
    NgbNavModule,
    NgbTooltipModule,
    NzInputModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NzFormModule,
    NzButtonModule,
    IsRequiredPipe,
    NgbModalModule,
    TranslateModule,
    NzCheckboxModule,
    NgSelectModule,
    PasswordInputComponent,
  ]
})
export class FormSharedModule { }
