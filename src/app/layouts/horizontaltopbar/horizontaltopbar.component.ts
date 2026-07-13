import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/auth.service';

import { DOCUMENT } from '@angular/common';

import { logo } from 'src/app/app-const';
import { MENU } from './menu';

@Component({
    selector: 'app-horizontaltopbar',
    templateUrl: './horizontaltopbar.component.html',
    styleUrls: ['./horizontaltopbar.component.scss'],
    standalone: false
})

/**
 * Horizontal Topbar and navbar specified
 */
export class HorizontaltopbarComponent implements OnInit, AfterViewInit {

  logos = logo;
  element: any;
  menuItems: any[] = [];


  // tslint:disable-next-line: max-line-length
  constructor(@Inject(DOCUMENT) private document: any, private router: Router,
    private authFackservice: AuthenticationService) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activateMenu();
      }
    });
  }

  ngOnInit(): void {
    this.element = document.documentElement;

    this.initialize();

  
  }



  /**
   * Logout the user
   */
  logout() {

    this.authFackservice.logout();
    this.router.navigate(['/account/login']);
  }

  ngAfterViewInit() {
    this.activateMenu();
  }

  /**
   * remove active and mm-active class
   */
  _removeAllClass(className: string) {
    const els = document.getElementsByClassName(className);
    while (els[0]) {
      els[0].classList.remove(className);
    }
  }

  /**
   * Activates the menu
   */
  private activateMenu() {

    const resetParent = (el: any) => {
      const parent = el.parentElement;
      if (parent) {
        parent.classList.remove('active');
        const parent2 = parent.parentElement;
        this._removeAllClass('mm-active');
        this._removeAllClass('mm-show');
        if (parent2) {
          parent2.classList.remove('active');
          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove('active');
            const parent4 = parent3.parentElement;
            if (parent4) {
              parent4.classList.remove('active');
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove('active');
                const menuelement = document.getElementById("topnav-menu-content")
                if (menuelement !== null) {
                  if (menuelement.classList.contains('show'))
                    document
                      ?.getElementById("topnav-menu-content")
                      ?.classList.remove("show");
                }
              }
            }
          }
        }
      }
    };

    // activate menu item based on location
    const links = document.getElementsByClassName('side-nav-link-ref');
    let matchingMenuItem: any = null;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < links.length; i++) {
      // reset menu
      resetParent(links[i]);
    }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < links.length; i++) {
      // tslint:disable-next-line: no-string-literal
      if (location.pathname === (links[i] as HTMLAnchorElement).pathname) {
        matchingMenuItem = links[i];
        break;
      }
    }

    if (matchingMenuItem) {
      const parent = matchingMenuItem?.parentElement;
      /**
       * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
       * We should come up with non hard coded approach
       */
      if (parent) {
        parent.classList.add('active');
        const parent2 = parent.parentElement;
        if (parent2) {
          parent2.classList.add('active');
          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.add('active');
            const parent4 = parent3.parentElement;
            if (parent4) {
              parent4.classList.add('active');
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.add('active');
                const parent6 = parent5.parentElement;
                if (parent6) {
                  parent6.classList.add('active');
                }
              }
            }
          }
        }
      }
    }
  }

  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement && !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  /**
   * Initialize
   */
  initialize(): void {
    this.menuItems = MENU;
  }

}
