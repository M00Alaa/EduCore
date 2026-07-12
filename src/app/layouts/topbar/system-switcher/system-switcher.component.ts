import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'mg-system-switcher',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './system-switcher.component.html',
  styleUrls: ['./system-switcher.component.scss']
})
export default class SystemSwitcherComponent {
  @Input() light: boolean = false;
}
