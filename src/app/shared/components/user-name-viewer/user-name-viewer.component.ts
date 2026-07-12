import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NzImageModule } from 'ng-zorro-antd/image';
import {  EmployeeVm } from 'src/app/core/backend/base/models';
import { HrService } from 'src/app/core/backend/base/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'mg-user-name-viewer',
  imports: [RouterLink, NzImageModule, NgbPopoverModule,],
  templateUrl: './user-name-viewer.component.html',
  styleUrl: './user-name-viewer.component.scss'
})
export class UserNameViewerComponent {
  domain = environment.api;
  @Input({ required: true }) fullName: string | undefined | null = undefined;
  @Input() imageUrl: string | undefined | null = undefined;
  @Input() Code: string | undefined | null = undefined;
  @Input({ required: true }) userId: string | undefined | null = undefined;

  userService = inject(HrService);
  empData: EmployeeVm  | undefined;
  gettingUser = false;
  getUserMetadata() {
    if(this.empData) return;
    this.gettingUser = true;
    this.userService.getEmployeeMetadata({
      body: {
        id: this.userId
      }
    }).subscribe(res => {
      this.gettingUser = false;
      this.empData = res.item;
    });
  }
}
