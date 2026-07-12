import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { promptSessionEndedAndReload, promptSessionExpiredAndReload, isSessionReplacedError, SWAL } from 'src/app/app-const'; // Adjust path as needed

// Define the functional interceptor
export const errorInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const translate = inject(TranslateService);

  return next(request).pipe(
    catchError((err) => {
      if (shouldSkipGlobalError(request)) {
        return throwError(() => err);
      }

      if (err.status === 401) {
        // For auth/login endpoints a 401 means wrong credentials — let the
        // component's errorCallback handle it so the real message is shown.
        if (isLoginRequest(request.url)) {
          return throwError(() => err);
        }

        if (isSessionReplacedError(err)) {
          promptSessionEndedAndReload();
          return throwError(() => ({ errorCode: 'SESSION_REPLACED' }));
        }

        promptSessionExpiredAndReload();
        return throwError(() => ({ errorCode: 'SESSION_EXPIRED' }));
      }

      const error = normalizeErrorPayload(err);
      if (error?.isLockout) {
        return throwError(() => ({ errorCode: 'LOCKED' }));
      }

      if (error?.errors && !error?.errorCode) {
        if (isEscapedRequest(request.url)) return throwError(() => error);

        const allMessages: string[] = [];
        for (const val of Object.values(error.errors)) {
          if (Array.isArray(val)) {
            allMessages.push(...(val as any[]).filter(Boolean).map(String));
          } else if (typeof val === 'string' && val.trim()) {
            allMessages.push(val);
          }
        }

        const unique = allMessages.filter((v, i, a) => a.indexOf(v) === i);

        // Translate each message via ERROR_CODES lookup (same logic as SWAL())
        const allTranslations = (translate as any).translations?.[translate.currentLang]
          ?? (translate as any).translations?.[translate.defaultLang];
        const translated = unique.map(msg => {
          const dynamicTranslation = translateBackendErrorMessage(msg, translate);
          if (dynamicTranslation && !dynamicTranslation.startsWith('ERROR_CODES.')) {
            return dynamicTranslation;
          }

          const fromCodes = allTranslations?.ERROR_CODES?.[msg];
          if (fromCodes) return fromCodes;
          const via = translate.instant('ERROR_CODES.' + msg);
          return (via && via !== 'ERROR_CODES.' + msg) ? via : msg;
        });

        if (translated.length > 1) {
          const okText = translate.instant('SWAL.OK') || 'حسنًا';
          const html = translated.map(e => `<p style="margin:4px 0">${e}</p>`).join('');
          import('sweetalert2').then(({ default: Swal }) => {
            Swal.fire({ icon: 'error', html, confirmButtonColor: '#2BA18Cff', confirmButtonText: okText });
          });
        } else {
          SWAL('error', translated[0] ?? unique[0] ?? '', '');
        }
        return throwError(() => ({ errorCode: 'NO-ERROR' }));
      }

      if (isEscapedRequest(request.url)) return throwError(() => error);
      const translatedError = translateBackendErrorMessage(error?.errorCode || error?.message, translate);
      SWAL('error', translatedError ?? error?.errorCode ?? error?.message, '');
      return throwError(() => ({ errorCode: 'NO-ERROR' }));
    })
  );
};

function shouldSkipGlobalError(request: HttpRequest<any>): boolean {
  if (request.headers.get('X-Skip-Global-Error') === 'true') {
    return true;
  }

  // Subscription creation screen handles validation errors locally
  const normalizedUrl = request.url.toLowerCase();
  const isCreateSubscriptionByAcademyRoute =
    request.method.toUpperCase() === 'POST' &&
    /\/api\/v1\/academy\/\d+\/subscriptions(?:\?|$)/.test(normalizedUrl);
  const isCreateSubscription =
    request.method.toUpperCase() === 'POST' &&
    normalizedUrl.includes('/api/v1/subscriptions');

  return isCreateSubscription || isCreateSubscriptionByAcademyRoute;
}

function normalizeErrorPayload(err: any): any {
  const payload = err?.error ?? err?.error?.error;
  if (typeof payload !== 'string') {
    return payload;
  }

  try {
    return JSON.parse(payload);
  } catch {
    return { message: payload };
  }
}

function translateBackendErrorMessage(message: string, translate: TranslateService): string | null {
  const maxSessionsMatch = message.match(/^Maximum allowed additional sessions is\s+(\d+)\.?$/i);
  if (maxSessionsMatch) {
    return translate.instant('ERROR_CODES.MAX_ALLOWED_ADDITIONAL_SESSIONS', { count: maxSessionsMatch[1] });
  }

  const maxFieldMatch = message.match(/^The\s+(.+?)\s+field\s+must\s+not\s+be\s+greater\s+than\s+([+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\.?$/i);
  if (maxFieldMatch) {
    return translate.instant('ERROR_CODES.FIELD_MUST_NOT_BE_GREATER_THAN', {
      field: localizeBackendFieldName(maxFieldMatch[1], translate),
      max: normalizeScientificNumber(maxFieldMatch[2]),
    });
  }

  const paymentMatch = message.match(/^Payment amount \(([+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\) exceeds remaining balance \(([+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\)\.?$/i);
  if (paymentMatch) {
    return translate.instant('ERROR_CODES.PAYMENT_AMOUNT_EXCEEDS_REMAINING_BALANCE', {
      amount: normalizeScientificNumber(paymentMatch[1]),
      remaining: normalizeScientificNumber(paymentMatch[2]),
    });
  }

  const packageLinkedMatch = message.match(/^Package\s+\d+\s+is already linked to another active deduction\.?$/i);
  if (packageLinkedMatch) {
    return translate.instant('ERROR_CODES.PACKAGE_ALREADY_LINKED_TO_ACTIVE_DEDUCTION');
  }

  return null;
}

function localizeBackendFieldName(fieldName: string, translate: TranslateService): string {
  const normalizedField = fieldName.trim().replace(/\s+/g, '_').toUpperCase();
  const fallback = fieldName.trim();

  const translated = translate.instant(normalizedField);
  return translated && translated !== normalizedField ? translated : fallback;
}

function normalizeScientificNumber(value: string): string {
  if (!/[eE]/.test(value)) {
    return value;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return value;
  }

  return parsed.toLocaleString('en-US', {
    useGrouping: false,
    maximumFractionDigits: 20,
  });
}

function isEscapedRequest(url: string) {
  if (url.toLowerCase().includes('getcurrentuser')) {
    return true;
  }
  return false;
}

function isLoginRequest(url: string): boolean {
  const lower = url.toLowerCase();
  return lower.includes('/auth/manager-login') || lower.includes('/auth/login');
}
