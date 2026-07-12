import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import 'moment/locale/ar';
import { BehaviorSubject } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { StylesChangerService } from './style.service';
import { NzI18nService, ar_EG, en_US } from 'ng-zorro-antd/i18n';



@Injectable({ providedIn: 'root' })
export class LanguageService {
  public languages: {
    logo: string,
    name: string,
    code: string
  }[] = [{
    code: 'en',
    logo: 'assets/img/flags/united-states.png',
    name: 'English'
  }, {
    code: 'ar',
    logo: 'assets/img/flags/egypt.png',
    name: 'Arabic'
  }];
  currentLang = new BehaviorSubject<string>('');
  constructor(public translate: TranslateService,
    public spinnerService: SpinnerService,
    @Inject(DOCUMENT) private document: Document,
    private stylesChangerService: StylesChangerService,
    private nzI18nService: NzI18nService
  ) {
    this.translate.addLangs(this.languages.map(e => e.code));

    // Get saved language from localStorage
    const savedLang = localStorage.getItem("lang");

    if (savedLang && savedLang.match(/en|ar/)) {
      // Use saved language
      this.setLanguage(savedLang);
    } else {
      // Use browser language or default to Arabic
      const browserLang = translate.getBrowserLang();
      const initialLang = (browserLang && browserLang.match(/en|ar/)) ? browserLang : 'ar';
      this.setLanguage(initialLang);
    }
  }

  public setLanguage(lang: string) {
    if (lang?.match(/en|ar/)) {
      const currentLang = localStorage.getItem('lang');

      this.spinnerService.showSpinner();
      this.translate.use(lang).subscribe({
        next: () => {
          this.spinnerService.hideSpinner();
          localStorage.setItem('lang', lang);

          // Update ng-zorro locale
          const nzLocale = lang === 'ar' ? ar_EG : en_US;
          this.nzI18nService.setLocale(nzLocale);

          // Update direction
          const direction = lang === 'ar' ? 'rtl' : 'ltr';
          this.document.documentElement.setAttribute('dir', direction);
          this.document.body.setAttribute('dir', direction);

          this.currentLang.next(lang);
          this.document.documentElement.lang = lang;
          moment.locale(lang);
          // Load the appropriate stylesheet (app.css for en, app-rtl.css for ar)
          this.stylesChangerService.setLanguage(lang as 'ar' | 'en');

          // Reload page if language actually changed to apply ng-zorro direction changes
          if (currentLang && currentLang !== lang) {
            setTimeout(() => {
              window.location.reload();
            }, 300);
          }
        },
        error: () => {
          this.spinnerService.hideSpinner();
        }
      });
    }
  }

}
