import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/auth.service';
import { inject } from '@angular/core';

// Define the functional interceptor
export const jwtInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  // Inject the AuthenticationService using the `inject` function
  const auth = inject(AuthenticationService);
  const language = (localStorage.getItem('lang') || document.documentElement.lang || 'ar').toLowerCase();
  const normalizedLanguage = language.startsWith('en') ? 'en' : 'ar';
  const headers: Record<string, string> = {
    'Accept-Language': normalizedLanguage,
    'Access-Control-Expose-Headers': 'Content-Disposition',
  };

  // Add authorization header with JWT token if available
  try {
    const token = JSON.parse(localStorage.getItem('vultToken') || sessionStorage.getItem('vultToken') || 'null') || auth._token;
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const parseContextId = (rawValue: string | null): number => {
      if (!rawValue) {
        return 0;
      }

      const numericRaw = Number(rawValue);
      if (Number.isInteger(numericRaw) && numericRaw > 0) {
        return numericRaw;
      }

      try {
        const parsed = JSON.parse(rawValue);
        if (typeof parsed === 'number' && Number.isInteger(parsed) && parsed > 0) {
          return parsed;
        }

        const parsedId = Number((parsed as any)?.id);
        if (Number.isInteger(parsedId) && parsedId > 0) {
          return parsedId;
        }
      } catch {
        // Ignore malformed storage values.
      }

      return 0;
    };

    const impersonatedBranchId = parseContextId(localStorage.getItem('impersonated_branch_id'));
    if (impersonatedBranchId > 0) {
      headers['X-Current-Branch-Id'] = String(impersonatedBranchId);
      headers['X-Current-Academy-Id'] = String(impersonatedBranchId);
    }

    const impersonatedMainId = parseContextId(localStorage.getItem('impersonated_main_academy_id'));
    if (impersonatedMainId > 0) {
      headers['X-Main-Academy-Id'] = String(impersonatedMainId);
    }
  } catch (e) {
    localStorage.removeItem('vultToken');
    sessionStorage.removeItem('vultToken');
  }

  request = request.clone({ setHeaders: headers });

  // Add Cache-Control for image requests
  if (
    request.url.toLowerCase().endsWith('.jpg') ||
    request.url.toLowerCase().endsWith('.jpeg') ||
    request.url.toLowerCase().endsWith('.png') ||
    request.url.toLowerCase().endsWith('.gif')
  ) {
    const cacheTtl = 3600 * 24; // 1 day cache TTL
    const cacheControlHeader = `max-age=${cacheTtl}`;
    request = request.clone({ setHeaders: { 'Cache-Control': cacheControlHeader } });
  }

  // Pass the modified request to the next handler
  return next(request);
};
