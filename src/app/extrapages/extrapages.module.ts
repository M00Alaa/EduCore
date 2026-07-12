import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgbDropdownModule, NgbModalModule, NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgOtpInputModule } from 'ng-otp-input';
import { SwiperDirective } from '../shared/directives/swiper.directive';
import { ExtrapagesRoutingModule } from './extrapages-routing.module';
import { Page403Component } from './page403/page403.component';
import { Page404Component } from './page404/page404.component';
// Step 1: Add the following line...
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { register } from 'swiper/element/bundle';
import { ScrollXComponent } from '../shared/components/scroll-x/scroll-x.component';
import { RoleDirective } from '../shared/directives/app-permissions.directive';
import { IsRequiredPipe } from '../shared/pipes/is-required.pipe';

// Step 2: Add the following line...
register();
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ExtrapagesRoutingModule,
    SwiperDirective,
    CarouselModule,
    NgOtpInputModule,
    NgbPaginationModule,
    NzTableModule,
    NzSwitchModule,
    RoleDirective,
    NzDatePickerModule,
    FormsModule,
    NgbNavModule,
    NzInputModule,
    ReactiveFormsModule,
    ScrollXComponent,
    NgbDropdownModule,
    NzFormModule,
    NzButtonModule,
    IsRequiredPipe,
    NgbModalModule,
    TranslateModule,
    NzCheckboxModule,
    NgSelectModule,
    NgxDropzoneModule,
    Page404Component,
    Page403Component
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ExtrapagesModule {
}
