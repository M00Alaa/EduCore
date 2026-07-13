import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MetisMenu } from 'metismenujs';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { logo } from 'src/app/app-const';
import { AuthenticationService, MgUser } from 'src/app/core/services/auth.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { MENU } from './menu';
import { MenuItem } from './menu.model';
import { SimplebarAngularComponent, SimplebarAngularModule } from 'simplebar-angular';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { HasItemsPipe } from './has-items.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    SimplebarAngularModule,
    NzDropDownModule,
    NgbDropdownModule,
    HasItemsPipe
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('componentRef') scrollRef!: SimplebarAngularComponent;
  @Input() isCondensed = false;
  private metisMenu: MetisMenu | null = null;
  logos = logo;
  menuItems: MenuItem[] = [];

  @ViewChild('sideMenu') sideMenu!: ElementRef;
  acc: MgUser | null = null;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private auth: AuthenticationService,
    public translate: TranslateService,
    public languageService: LanguageService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._activateMenuDropdown();
        this._scrollElement();
      }
    });

    this.auth.currentUserSubject.subscribe({
      next: (res) => {
        this.acc = res;
      }
    });
  }


  isBranchMode = false;
  exitBranchAction() {
    this.authService.exitBranch();
  }

  ngOnInit() {
    this.initialize();
    this._scrollElement();
  }

  ngAfterViewInit() {
    this.initMetisMenu();
  }

  ngOnChanges() {
    if (this.isCondensed) {
      this.destroyMetisMenu();
    } else {
      setTimeout(() => this.initMetisMenu());
    }
  }

  private initMetisMenu() {
    if (this.sideMenu && !this.metisMenu) {
      this.metisMenu = new MetisMenu(this.sideMenu.nativeElement, {
        toggle: true, // This ensures only one dropdown is open at a time
        triggerElement: '.has-arrow, .has-dropdown, is-parent', // Elements that trigger the dropdown
        parentTrigger: 'li', // Parent element of the trigger
        subMenu: 'ul' // The submenu element
      });
      this._activateMenuDropdown();
    }
  }

  private destroyMetisMenu() {
    if (this.metisMenu) {
      this.metisMenu.dispose();
      this.metisMenu = null;
    }
  }

  clickElWhenCollapsed() {
    if (document.body.classList.contains('vertical-collpsed')) {
      this._activateMenuDropdown();
    }
  }

  _scrollElement() {
    setTimeout(() => {
      const activeElements = document.getElementsByClassName("mm-active");
      if (activeElements.length > 0 && this.scrollRef?.SimpleBar) {
        const currentPosition = (activeElements[0] as HTMLElement).offsetTop;
        if (currentPosition > 500) {
          this.scrollRef.SimpleBar.getScrollElement().scrollTop = currentPosition + 300;
        }
      }
    }, 300);
  }

  _removeAllClass(className: string) {
    const els = document.getElementsByClassName(className);
    while (els[0]) {
      els[0].classList.remove(className);
    }
  }

  _activateMenuDropdown() {
    // Clear existing active states
    this._removeAllClass('active');
    this._removeAllClass('mm-active');
    this._removeAllClass('mm-show');

    const currentPath = this.router.url.split('?')[0]; // Get path without query params
    const links = Array.from(document.getElementsByClassName('side-nav-link-ref')) as HTMLAnchorElement[];

    // Find the active link
    let activeLink = links.find(link => {
      const linkPath = link.pathname;
      return currentPath === linkPath ||
        (linkPath !== '/' && currentPath.startsWith(linkPath + '/'));
    });

    // If no exact match, try to find parent path
    if (!activeLink) {
      const pathParts = currentPath.split('/').filter(Boolean);
      for (let i = pathParts.length - 1; i > 0; i--) {
        const testPath = '/' + pathParts.slice(0, i).join('/');
        activeLink = links.find(link => link.pathname === testPath);
        if (activeLink) break;
      }
    }

    if (activeLink) {
      // Mark the link as active
      activeLink.classList.add('active');

      // Activate parent dropdowns
      let parent = activeLink.closest('li');
      while (parent) {
        // Add active class to list item
        parent.classList.add('mm-active');

        // Find the dropdown menu and show it
        const dropdown = parent.querySelector('.sub-menu');
        if (dropdown) {
          dropdown.classList.add('mm-show');
        }

        // Move up to parent menu item
        const parentMenu = parent.closest('ul');
        parent = parentMenu ? parentMenu.closest('li') : null;
      }

      // Update MetisMenu state
      if (this.metisMenu) {
        this.metisMenu.update();
      }
    }
  }
  initialize(): void {
    this.menuItems = MENU;
  }

  onToggleMobileMenu() {
    this.isCondensed = !this.isCondensed;
    document.body.classList.toggle('sidebar-enable');
    // document.body.classList.toggle('vertical-collpsed');

    // if (window.screen.width <= 768) {
    //   document.body.classList.remove('vertical-collpsed');
    // }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/account/login']);
  }
}