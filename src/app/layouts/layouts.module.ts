import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { LangChangerComponent } from './lang-changer/lang-changer.component';

import { NgbCollapseModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';

import { SimplebarAngularModule } from 'simplebar-angular';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { TranslateModule } from '@ngx-translate/core';
import { RoleDirective } from '../shared/directives/app-permissions.directive';
import { PermissionDirective } from '../shared/directives/permission.directive';
import { FooterComponent } from './footer/footer.component';
import { HorizontaltopbarComponent } from './horizontaltopbar/horizontaltopbar.component';
import { LayoutComponent } from './layout.component';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';
import { VerticalComponent } from './vertical/vertical.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { HasItemsPipe } from './sidebar/has-items.pipe';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [LayoutComponent,
    FooterComponent,
    RightsidebarComponent,
    HorizontaltopbarComponent,
    PublicLayoutComponent,
  ],

  imports: [
    CommonModule,
    TranslateModule,
    LangChangerComponent,
    HasItemsPipe,
    RouterModule,
    NgbDropdownModule,
    RoleDirective,
    PermissionDirective,
    ClickOutsideModule,
    NgbCollapseModule,
    NgbTooltipModule,
    SimplebarAngularModule,
    NzDropDownModule,
    NgSelectModule,
    FormsModule
  ]
})
export class LayoutsModule { }
