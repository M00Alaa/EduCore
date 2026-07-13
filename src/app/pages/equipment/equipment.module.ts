import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollXComponent } from 'src/app/shared/components/scroll-x/scroll-x.component';
import { SearchFilterModule } from 'src/app/shared/components/search-filter/search-filter.module';

import { EquipmentComponent } from './equipment.component';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { ClassificationsComponent } from './classifications/classifications.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { IsRequiredPipe } from 'src/app/shared/pipes/is-required.pipe';
import { FormSharedModule } from "src/app/shared/modules/nz-form-full/nz-form-full.module";

const routes: Routes = [
  {
    path: '',
    component: EquipmentComponent
  }
];

@NgModule({
  declarations: [
    EquipmentComponent,
    EquipmentListComponent,
    ClassificationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbNavModule,
    NgbPaginationModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzFormModule,
    NzInputModule,
    TranslateModule,
    ScrollXComponent,
    SearchFilterModule,
    NzTabsModule,
    IsRequiredPipe,
    FormSharedModule
  ]
})
export class EquipmentModule { }
