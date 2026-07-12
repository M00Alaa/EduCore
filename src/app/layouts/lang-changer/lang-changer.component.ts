import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthenticationService, MgUser } from 'src/app/core/services/auth.service';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
    selector: 'mg-lang-changer',
    imports: [CommonModule, NgbDropdownModule, TranslateModule],
    templateUrl: './lang-changer.component.html',
    styleUrls: ['./lang-changer.component.scss']
})
export class LangChangerComponent {
  listLang = [
    // { text: 'English', flag: 'assets/images/flags/us.png', lang: 'en' },
    { text: 'Arabic', flag: 'assets/images/flags/ar.png', lang: 'ar' }
  ];
  element: any;
  cookieValue: any;
  flagvalue: any;
  countryName: any;
  valueset: any;

  acc: MgUser | null = null;
  constructor(@Inject(DOCUMENT) private document: any, private router: Router, private authService: AuthenticationService,
              public languageService: LanguageService,
              public translate: TranslateService,
              ) {
                this.authService.identity().subscribe(acc => {
                  this.acc = acc;
                })
  }

  ngOnInit() {
   
   
    this.cookieValue =localStorage.getItem('lang');
    const val = this.listLang.filter(x => x.lang === this.cookieValue);
    this.countryName = val.map(element => element.text)[0];
    if (val.length === 0) {
      if (this.flagvalue === undefined) { this.valueset = 'assets/images/flags/us.jpg'; }
    } else {
      this.flagvalue = val.map(element => element.flag);
    }
  }

  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
  }

}
