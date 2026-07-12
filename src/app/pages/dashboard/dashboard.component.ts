import { Component } from "@angular/core";
import { ROLES } from "src/app/app-const";
import { BmDashboardComponent } from "./bm-dashboard/bm-dashboard.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [
    BmDashboardComponent
  ]
})
export class DashboardComponent {
  ROLES = ROLES;
}
