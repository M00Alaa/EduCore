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
    const token = JSON.parse(localStorage.getItem('eduToken') || sessionStorage.getItem('eduToken') || 'null') || auth._token;
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

  } catch (e) {
    localStorage.removeItem('eduToken');
    sessionStorage.removeItem('eduToken');
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
