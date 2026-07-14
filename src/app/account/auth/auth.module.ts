import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule, NgbDropdownModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { NgOtpInputModule } from 'ng-otp-input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CustomDropzonePreviewComponent } from 'src/app/shared/components/custom-image-previewer/custom-dropzone-preview.component';
import { FormSharedModule } from 'src/app/shared/modules/nz-form-full/nz-form-full.module';
import { IsRequiredPipe } from 'src/app/shared/pipes/is-required.pipe';
import { AuthRoutes } from './auth-routing';
import { AuthWrapperComponent } from './auth-wrapper/auth-wrapper.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    NzDividerModule,
    NzCheckboxModule,
    NgSelectModule,
    FormsModule,
    NgbAlertModule,
    NgOtpInputModule,
    NzButtonModule,
    NzRadioModule,
    NzSelectModule,
    NgbPopoverModule,
    RouterModule.forChild(AuthRoutes),
    FormSharedModule,
    NgbDropdownModule,
    CarouselModule,
    AuthWrapperComponent,
    NgxDropzoneModule,
    CustomDropzonePreviewComponent,
    IsRequiredPipe
  ],
})
export class AuthModule { }
