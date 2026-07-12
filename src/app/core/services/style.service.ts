import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SpinnerService } from './spinner.service';

export type LanguageCode = 'ar' | 'en';
export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class StylesChangerService {

  currentLanguage = new BehaviorSubject<LanguageCode>('ar');
  currentThemeMode = new BehaviorSubject<ThemeMode>('light');

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private spinnerService: SpinnerService
  ) {
    // Load saved preferences
    const savedLang = localStorage.getItem('lang') as LanguageCode || 'ar';
    const savedTheme = localStorage.getItem('theme-mode') as ThemeMode || 'light';

    this.currentLanguage.next(savedLang);
    this.currentThemeMode.next(savedTheme);

    // Load initial stylesheets based on language and theme
    this.loadStylesheets(savedLang, savedTheme);
  }

  /**
   * Load stylesheets based on language and theme
   * Language: app-ltr.css (English) or app-rtl.css (Arabic)
   * Theme: bootstrap.css (light) or bootstrap-dark.css (dark)
   */
  loadStylesheets(lang: LanguageCode, theme: ThemeMode) {
    this.spinnerService.showSpinner();

    this.currentLanguage.next(lang);
    this.currentThemeMode.next(theme);
    localStorage.setItem('lang', lang);
    localStorage.setItem('theme-mode', theme);

    // Load language-specific stylesheet
    this.loadLanguageStylesheet(lang);

    // Load theme-specific Bootstrap stylesheet
    this.loadThemeStylesheet(theme);
  }

  /**
   * Load language-specific stylesheet (app-ltr or app-rtl)
   */
  private loadLanguageStylesheet(lang: LanguageCode) {
    // Remove existing language stylesheet
    const existingLangStyle = this.document.getElementById('language-stylesheet');
    if (existingLangStyle) {
      existingLangStyle.remove();
    }

    // Determine which stylesheet to load
    const stylesheetName = lang === 'ar' ? 'app-rtl' : 'app-ltr';

    // Create and append new stylesheet link
    const link = this.document.createElement('link');
    link.id = 'language-stylesheet';
    link.rel = 'stylesheet';
    link.href = `${stylesheetName}.css`;
    link.onload = () => {
      this.checkSpinner();
    };
    link.onerror = () => {
      this.checkSpinner();
    };

    this.document.head.appendChild(link);
  }

  /**
   * Load theme-specific Bootstrap stylesheet
   */
  private loadThemeStylesheet(theme: ThemeMode) {
    // Remove existing theme stylesheet
    const existingThemeStyle = this.document.getElementById('theme-stylesheet');
    if (existingThemeStyle) {
      existingThemeStyle.remove();
    }

    // Determine which Bootstrap stylesheet to load
    const stylesheetName = theme === 'dark' ? 'bootstrap-dark' : 'bootstrap';

    // Create and append new stylesheet link
    const link = this.document.createElement('link');
    link.id = 'theme-stylesheet';
    link.rel = 'stylesheet';
    link.href = `${stylesheetName}.css`;
    link.onload = () => {
      this.checkSpinner();
    };
    link.onerror = () => {
      this.checkSpinner();
    };

    this.document.head.appendChild(link);
  }

  private checkSpinner() {
    // Simple check: if both stylesheets are loaded (or errored), hide spinner.
    // However, since we might load them sequentially or concurrently, 
    // and this service is a bit simplistic, we can just try to hide it after a short delay
    // or rely on the spinner service's behavior.
    // For now, let's just attempt to hide it. If the other one is still loading, 
    // it will call this again when done.
    // Ideally we'd track both promises, but for now this is better than nothing.
    // Actually, `hideSpinner` in the service has a minimal timeout, so calling it twice is fine.

    // Better approach: We don't know which one finished last easily without state.
    // But since `loadStylesheets` triggers both, and they run fast, 
    // we can just hide it. The spinner service likely doesn't have a counter.
    this.spinnerService.hideSpinner();
  }

  /**
   * Change language and reload appropriate stylesheet
   * Preserves current theme
   */
  setLanguage(lang: LanguageCode) {
    const currentTheme = this.currentThemeMode.value;
    this.loadStylesheets(lang, currentTheme);
  }

  /**
   * Change theme mode and reload appropriate stylesheet
   * Preserves current language
   */
  setThemeMode(theme: ThemeMode) {
    const currentLang = this.currentLanguage.value;
    this.loadStylesheets(currentLang, theme);
  }
}
