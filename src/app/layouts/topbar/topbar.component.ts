import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { EIDDESIGN, logo } from 'src/app/app-const';
import { MgUser } from 'src/app/core/services/auth.service';
import { LanguageService } from '../../core/services/language.service';
import { StylesChangerService } from '../../core/services/style.service';
import { LeftSiderService } from '../vertical/left-sidebar/left-sidebar.component';
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
export class TopbarComponent implements OnInit {
  @Input() withLogo: boolean = false;

  logos = logo;
  element: any | undefined;
  acc: MgUser | null = null;
  isDarkMode = false;
  currentLang = 'ar';

  constructor(
    public languageService: LanguageService,
    private stylesChangerService: StylesChangerService,
    public translate: TranslateService,
    public leftSiderService: LeftSiderService,
    public _cookiesService: CookieService) {


    // Initialize dark mode from localStorage
    const savedTheme = localStorage.getItem('theme-mode') || 'light';
    this.isDarkMode = savedTheme === 'dark';
    document.body.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');

    // Initialize current language
    this.currentLang = localStorage.getItem('lang') || 'ar';
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

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
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

  fullscreen() {
    if (!document.fullscreenElement) {
      this.element.requestFullscreen().catch((err: any) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  }
}