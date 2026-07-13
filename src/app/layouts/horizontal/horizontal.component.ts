import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TOPBAR } from "../layouts.model";
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-horizontal',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    TopbarComponent
  ],
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss']
})
export class HorizontalComponent implements OnInit {

  topbar = '';

  constructor() { }

  ngOnInit() {

    this.topbar = TOPBAR;
    document.body.setAttribute('data-layout', 'horizontal');
    document.body.removeAttribute('data-sidebar');
    document.body.removeAttribute('data-layout-size');
    document.body.removeAttribute('data-keep-enlarged');
    document.body.removeAttribute('data-sidebar-small');

    this.changeTopbar(this.topbar);

    // Initialize theme from localStorage
    const theme = localStorage.getItem('theme-mode') || 'light';
    document.body.setAttribute('data-theme', theme);
  }

  changeTopbar(topbar: string) {
    switch (topbar) {
      case "light":
        document.body.setAttribute("data-topbar", "light");
        break;
      case "dark":
        document.body.setAttribute("data-topbar", "dark");
        break;
      case "colored":
        document.body.setAttribute("data-topbar", "colored");
        break;
      default:
        document.body.setAttribute("data-topbar", "light");
        break;
    }
  }

}