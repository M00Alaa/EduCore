import {
    TitleStrategy,
    withComponentInputBinding,
    withInMemoryScrolling,
    withRouterConfig,
    withViewTransitions
} from '@angular/router';
import { HighContrastMode, HighContrastModeDetector } from '@angular/cdk/a11y';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, DEFAULT_CURRENCY_CODE, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ar as dateLocale } from 'date-fns/locale';
import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';
import { ar_EG, en_US, NZ_DATE_LOCALE, NZ_I18N } from 'ng-zorro-antd/i18n';
import { routes } from './app-routes';
import { CustomTitleStrategy } from './core/services/CustomTitleStrategy.provider';
import { setGlobalTranslateService } from './app-const';
// Register locale data (still needed for Angular's common module)
import { registerLocaleData } from '@angular/common';
import ar from '@angular/common/locales/ar';
import en from '@angular/common/locales/en';
import { errorInterceptor } from './core/helpers/error.interceptor';
import { jwtInterceptor } from './core/helpers/jwt.interceptor';
registerLocaleData(ar);
registerLocaleData(en);

// NG-Zorro configuration
const ngZorroConfig: NzConfig = {
    message: { nzTop: 120 },
    notification: { nzTop: 240 },
    form: {
        nzNoColon: true,
    },
};

const noopHighContrastModeDetector = {
    getHighContrastMode: () => HighContrastMode.NONE,
    ngOnDestroy: () => undefined,
    _applyBodyHighContrastModeCssClasses: () => undefined,
};

// Translate loader factory
export function createTranslateLoader(http: HttpClient): TranslateLoader {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}


export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(
            withInterceptors([jwtInterceptor, errorInterceptor]),
        ),
        provideRouter(
            routes,
            withComponentInputBinding(),
            withViewTransitions(),
            withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
            withRouterConfig({
                canceledNavigationResolution: 'replace', // Options: 'replace' | 'computed'
                paramsInheritanceStrategy: 'always',     // Options: 'emptyOnly' | 'always'
                urlUpdateStrategy: 'deferred',              // Options: 'deferred' | 'eager'
            })
        ),
        { provide: TitleStrategy, useClass: CustomTitleStrategy },
        // Zone change detection (optional, adjust based on your needs)
        provideZoneChangeDetection({ eventCoalescing: true }),

        // Browser animations
        provideAnimations(),

        {
            provide: HighContrastModeDetector,
            useValue: noopHighContrastModeDetector,
        },

        // Translate module configuration
        provideTranslateService({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
        }),

        // Initialize global translate service for SWAL functions
        {
            provide: APP_INITIALIZER,
            useFactory: (translate: TranslateService) => () => {
                setGlobalTranslateService(translate);
            },
            deps: [TranslateService],
            multi: true
        },

        // NG-Zorro configuration
        provideNzConfig(ngZorroConfig),

        // NG-Zorro i18n provider - use service for dynamic locale switching
        {
            provide: NZ_I18N,
            useFactory: () => {
                const savedLang = localStorage.getItem('lang');
                return savedLang === 'en' ? en_US : ar_EG;
            },
        },
        {
            provide: NZ_DATE_LOCALE,
            useValue: dateLocale,
        },

        // Angular common configurations
        {
            provide: LOCALE_ID,
            useFactory: () => {
                const savedLang = localStorage.getItem('lang');
                return savedLang === 'en' ? 'en' : 'ar';
            },
        },
        {
            provide: DEFAULT_CURRENCY_CODE,
            useValue: 'EGP',
        },
        {
            provide: DATE_PIPE_DEFAULT_OPTIONS,
            useValue: {
                dateFormat: 'd MMMM yyyy',
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
        },

        // Firebase services (initialized globally)
        // Services use providedIn: 'root' so they are automatically available
        // No additional providers needed - they will be lazily instantiated when injected


    ],
};