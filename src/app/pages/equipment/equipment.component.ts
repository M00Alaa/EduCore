import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'mo-equipment',
  standalone: false,
  templateUrl: './equipment.component.html',
  styleUrl: './equipment.component.scss'
})
export class EquipmentComponent implements OnInit {
  tabKeys = ['equipment-list', 'classifications'];
  selectedIndex = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
  ) { }

  get equipmentManagementVisible(): boolean {
    const perms = new Set(this.authService.currentUserValue?.permissions || []);
    return perms.has('*') || perms.has('equipment.management.view');
  }

  get equipmentClassificationsVisible(): boolean {
    const perms = new Set(this.authService.currentUserValue?.permissions || []);
    return perms.has('*') || perms.has('equipment.classifications.view');
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const tab = params.get('tab');
      const idx = this.tabKeys.indexOf(tab || '');
      this.selectedIndex = idx >= 0 ? idx : 0;
    });
  }

  onTabChange(index: number): void {
    this.selectedIndex = index;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: this.tabKeys[index] },
      queryParamsHandling: 'merge',
    });
  }

  get classificationsTabIndex(): number {
    return this.equipmentManagementVisible ? 1 : 0;
  }
}
