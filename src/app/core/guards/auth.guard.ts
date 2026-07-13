import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthenticationService } from '../services/auth.service';
import { SpinnerService } from '../services/spinner.service';
import { ROLES } from 'src/app/app-const';

// Functional Guard for CanActivate
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> | Promise<boolean> | boolean => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  const spinnerService = inject(SpinnerService);

  const redirectUrl = state.url;
  const roles = route.data?.['roles'] as number[] | undefined;

  return checkAuth(redirectUrl, roles || [], authService, router, spinnerService);
};

// Shared logic for authentication check
function checkAuth(
  redirectURL: string,
  roles: number[],
  authService: AuthenticationService,
  router: Router,
  spinnerService: SpinnerService
): Observable<boolean> {
  spinnerService.showSpinner();

  return authService.identity().pipe(
    map((user) => {
      spinnerService.hideSpinner();

      if (!user) {
        router.navigate(['/account/login'], { queryParams: { redirectURL } });
        return false;
      }

      if (roles) {
        const userRoles = user?.roles || [];
        let allowed = false;
        if (
          (!roles || roles.length === 0) ||
          roles.some((r) => userRoles.includes(r)) ||
          userRoles.includes(ROLES.AcademyAdmin) ||
          userRoles.includes(ROLES.MasterAcademy)
        ) {
          allowed = true;
        }

        if (!allowed) {
          router.navigate(['/403']);
          return false;
        }
      }

      return true;
    }),
    catchError((error) => {
      spinnerService.hideSpinner();
      router.navigate(['/account/login'], { queryParams: { redirectURL } });
      return of(false);
    })
  );
}