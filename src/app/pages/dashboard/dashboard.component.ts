import { Component } from "@angular/core";
import { ROLES } from "src/app/app-const";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: false
})
export class DashboardComponent {
  ROLES = ROLES;
}
