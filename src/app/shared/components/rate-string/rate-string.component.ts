import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'mg-rate-string',
  imports: [CommonModule],
  templateUrl: './rate-string.component.html',
  styleUrl: './rate-string.component.scss'
})
export class RateStringComponent {
  @Input() score: number | null | undefined = null;
  @Input() showText = true;
  

  get badgeClass() {
    const score = this.score || 0;
    if (score <= 40) return 'bg-outline-danger';
    if (score <= 60) return 'bg-outline-warning';
    if (score <= 80) return 'bg-outline-success';
    return 'bg-outline-primary';
  }

  get badgeText() {
    const score = this.score || 0;
    if (score <= 40) return 'سيئة';
    if (score <= 60) return 'ضعيفة';
    if (score <= 80) return 'جيدة';
    return 'ممتاز';
  }
}
