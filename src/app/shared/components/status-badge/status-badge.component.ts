import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'mg-status-badge',
    imports: [CommonModule, TranslateModule],
    templateUrl: './status-badge.component.html',
    styleUrls: ['./status-badge.component.scss']
})
export class StatusBadgeComponent {
  @Input() status!: string;

  get badgeClass(): string {
    return {
      Pending: 'badge-info',
      Accepted: 'badge-success',
      Rejected: 'badge-danger',
      NeedConfirm: 'badge-warning',
    }[this.status] || 'badge-secondary';
  }

  get iconClass(): string {
    return {
      Pending: 'fa-clock-rotate-left',
      Accepted: 'fa-check-circle',
      Rejected: 'fa-times-circle',
      NeedConfirm: 'fa-exclamation-circle',
    }[this.status] || '';
  }
}