import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { AuthenticationService, MgUser } from 'src/app/core/services/auth.service';
import { BranchManagementPortalUiListBranchesResponseDataItem } from 'src/app/core/backend/academy/models';

@Component({
  selector: 'mg-account-dropdown',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbDropdownModule, TranslateModule],
  templateUrl: './account-dropdown.component.html',
  styleUrls: ['./account-dropdown.component.scss']
})
export class AccountDropdownComponent {
  @Input() light: boolean = false;
  @Input() isBranchContext: boolean = false;
  @Input() branchContext: BranchManagementPortalUiListBranchesResponseDataItem | null = null;

  acc: MgUser | null = null;
  constructor(private router: Router, private authService: AuthenticationService) {
    this.authService.identity().subscribe(acc => {
      this.acc = acc;
    })
  }

  /**
   * Logout the user
   */
  logout() {

    this.authService.logout();
  }
}
