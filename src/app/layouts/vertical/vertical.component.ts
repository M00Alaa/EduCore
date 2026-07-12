import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { EventService } from '../../core/services/event.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EIDDESIGN } from 'src/app/app-const';
import { SIDEBAR_TYPE } from "../layouts.model";
import { AuthenticationService, MgUser } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-vertical',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss'],
  standalone: false
})

/**
 * Vertical component
 */
export class VerticalComponent implements OnInit {
  EIDDESIGN = EIDDESIGN;
  isCondensed = false;
  sidebartype = '';


  // Trial banner state
  isTrialAcademy = false;
  trialDaysRemaining: number = 0;

  constructor(private router: Router, private eventService: EventService, modalService: NgbModal, private authService: AuthenticationService,
  ) {
    this.router.events.forEach((event: any) => {
      if (event instanceof NavigationEnd) {
        document.body.classList.remove('sidebar-enable');
        // close all open modals
        modalService?.dismissAll();
      }
    });
  }

  ngOnInit() {
    this.sidebartype = SIDEBAR_TYPE;

    this.changeSidebar(this.sidebartype);

    document.body.setAttribute('data-layout', 'vertical');

    // Initialize theme from localStorage
    const theme = localStorage.getItem('theme-mode') || 'light';
    document.body.setAttribute('data-theme', theme);


    this.authService.identity().subscribe(acc => {
      if (acc) {
        this.checkTrialStatus(acc);
      }
    });
  }

  isMobile() {
    const ua = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua);
  }



  checkTrialStatus(user: MgUser | null): void {
    // From backend Academy model: public const SUBSCRIPTION_TYPE_TRIAL = 1;
    if (user?.academy?.subscription_type === 1) {
      this.isTrialAcademy = true;
      const days = user?.academy?.trial_days_remaining;
      this.trialDaysRemaining = (typeof days === 'number' && Number.isFinite(days)) ? days : 0;
    } else {
      this.isTrialAcademy = false;
      this.trialDaysRemaining = 0;
    }
  }

  /**
   * on settings button clicked from topbar
   */
  onSettingsButtonClicked() {
    document.body.classList.toggle('right-bar-enabled');
  }

  changeSidebar(value: any) {
    switch (value) {
      case "light":
        document.body.removeAttribute('data-sidebar-size');
        document.body.removeAttribute('data-layout-size');
        document.body.removeAttribute('data-keep-enlarged');
        document.body.classList.remove('vertical-collpsed');
        document.body.removeAttribute('data-layout-scrollable');
        break;
      case "compact":
        document.body.setAttribute('data-sidebar-size', 'small');
        document.body.removeAttribute('data-layout-size');
        document.body.removeAttribute('data-keep-enlarged');
        document.body.classList.remove('sidebar-enable');
        document.body.classList.remove('vertical-collpsed');
        document.body.removeAttribute('data-layout-scrollable');
        break;
      case "dark":
        document.body.removeAttribute('data-layout-size');
        document.body.removeAttribute('data-keep-enlarged');
        document.body.removeAttribute('data-sidebar-size');
        document.body.classList.remove('sidebar-enable');
        document.body.classList.remove('vertical-collpsed');
        document.body.removeAttribute('data-layout-scrollable');
        break;
      case "icon":
        document.body.classList.add('vertical-collpsed');
        document.body.removeAttribute('data-layout-size');
        document.body.setAttribute('data-keep-enlarged', "true");
        document.body.removeAttribute('data-layout-scrollable');
        break;
      case "colored":
        document.body.classList.remove('sidebar-enable');
        document.body.classList.remove('vertical-collpsed');
        document.body.setAttribute('data-sidebar', 'colored');
        document.body.removeAttribute('data-layout-size');
        document.body.removeAttribute('data-keep-enlarged');
        document.body.removeAttribute('data-layout-scrollable');
        document.body.removeAttribute('data-sidebar-size');
        break;
      default:
        break;
    }
  }

  /**
   * On mobile toggle button clicked
   */
  onToggleMobileMenu() {
    this.isCondensed = !this.isCondensed;
    document.body.classList.toggle('sidebar-enable');
    // document.body.classList.toggle('vertical-collpsed');

    if (window.screen.width <= 768) {
      document.body.classList.remove('vertical-collpsed');
    }
  }


}
