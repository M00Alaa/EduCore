import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { EIDDESIGN, logo } from 'src/app/app-const';
import { AuthenticationService, MgUser } from 'src/app/core/services/auth.service';
import { LanguageService } from '../../core/services/language.service';
import { StylesChangerService } from '../../core/services/style.service';
import { LeftSiderService } from '../vertical/left-sidebar/left-sidebar.component';
import { BranchManagementPortalUiService } from 'src/app/core/backend/academy/services';
import { BranchManagementPortalUiListBranchesResponseDataItem } from 'src/app/core/backend/academy/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { AccountDropdownComponent } from './account-dropdown/account-dropdown.component';
import { NotificationsComponent } from '../notifications/notifications.component';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NzDropDownModule,
    NgbDropdownModule,
    NgSelectModule,
    AccountDropdownComponent,
    NotificationsComponent
  ],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, OnDestroy {
  @Input() withLogo: boolean = false;

  EIDDESIGN = EIDDESIGN;
  logos = logo;
  element: any | undefined;
  isPM = false;
  acc: MgUser | null = null;
  now = new Date();
  isDarkMode = false;
  currentLang = 'ar';

  // Branch selector
  branches: BranchManagementPortalUiListBranchesResponseDataItem[] = [];
  selectedBranch: BranchManagementPortalUiListBranchesResponseDataItem | null = null;
  isBranchMode = false;

  constructor(
    private authService: AuthenticationService,
    public languageService: LanguageService,
    private stylesChangerService: StylesChangerService,
    public translate: TranslateService,
    public leftSiderService: LeftSiderService,
    public _cookiesService: CookieService,
    private branchService: BranchManagementPortalUiService) {
    this.authService.identity().subscribe(acc => {
      this.acc = acc;
      this.isBranchMode = !!localStorage.getItem('impersonated_branch_id');
      if (acc) {
        this.loadBranches();
      }
    });
    this.setDate();

    // Initialize dark mode from localStorage
    const savedTheme = localStorage.getItem('theme-mode') || 'light';
    this.isDarkMode = savedTheme === 'dark';
    document.body.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');

    // Initialize current language
    this.currentLang = localStorage.getItem('lang') || 'ar';
  }

  private timeOut: any;
  private setDate() {
    this.now = new Date();
    this.isPM = this.now.getHours() >= 12;

    // Schedule the next update
    this.timeOut = setTimeout(() => this.setDate(), 1000);
  }


  openMobileMenu: boolean = false;

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  ngOnInit() {
    this.openMobileMenu = false;
    this.element = document.documentElement;

    // Subscribe to language changes
    this.languageService.currentLang.subscribe(lang => {
      if (lang) {
        this.currentLang = lang;
      }
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeOut);
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Logout the user
   */
  logout() {
    this.authService.logout();
  }

  browserBack() {
    if (history.length > 1) {
      history.back();
    }
  }
  browserForward() {
    if (history.length > 1) {
      history.forward();
    }
  }


  toggleLeftSider() {
    if (this.leftSiderService.shown.getValue()) {
      this.leftSiderService.hide();
    } else {
      this.leftSiderService.show();
    }
  }

  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement && !this.element?.mozFullScreenElement &&
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
    }
    // else {
    //   if (this.document.exitFullscreen) {
    //     this.document.exitFullscreen();
    //   }
    // }
  }

  /**
   * Toggle dark mode
   */
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const theme = this.isDarkMode ? 'dark' : 'light';

    // Update body attribute for theme
    document.body.setAttribute('data-theme', theme);

    // Call StylesChangerService to load the correct Bootstrap CSS
    this.stylesChangerService.setThemeMode(theme);
  }

  /**
   * Toggle language
   */
  toggleLanguage() {
    const newLang = this.currentLang === 'ar' ? 'en' : 'ar';
    this.languageService.setLanguage(newLang);
    this.currentLang = newLang;
  }

  loadBranches(): void {
    const academyId = this.authService.getCurrentMainAcademyContextId();

    if (!academyId) return;
    this.branchService.apiV1BranchesGet({
      parent_id: String(academyId),
      status: '',
      subscription_status: '',
      plan_name: '',
      search: '',
      per_page: '100',
      page: '1'
    }).subscribe({
      next: (res) => {
        this.branches = res?.data || [];
        // Pre-select current branch if in branch mode
        const storedId = localStorage.getItem('impersonated_branch_id');
        if (storedId) {
          this.selectedBranch = this.branches.find(b => String(b.id) === storedId) || null;
        }
      },
      error: () => { this.branches = []; }
    });
  }

  onBranchSelect(branch: any | null): void {
    console.log(branch);

    if (!branch) return;
    this.authService.switchAcademy(branch.id + '');
  }

}