import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbDatepickerModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { DashboardComponent } from './dashboard.component';
import { AcademyAdminDashboardComponent } from './academy-admin-dashboard/academy-admin-dashboard.component';
import { BmDashboardComponent } from './bm-dashboard/bm-dashboard.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { RoleDirective } from 'src/app/shared/directives/app-permissions.directive';
import { TrainerDashboardComponent } from './trainer-dashboard/trainer-dashboard.component';

@NgModule({
  declarations: [DashboardComponent, AcademyAdminDashboardComponent, BmDashboardComponent, TrainerDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent
      },
    ]),
    NgApexchartsModule,
    TranslateModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    FormsModule,
    NgbDatepickerModule,
    NgSelectModule,
    NgbProgressbarModule,
    RoleDirective
  ],
})
export class DashboardModule { }
