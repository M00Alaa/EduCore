import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanActivateChildFn, CanLoadFn, Route, Router, UrlSegment } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services/auth.service';

// Functional Guard for CanActivate
export const permissionGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: import('@angular/router').RouterStateSnapshot
): Observable<boolean> | Promise<boolean> | boolean => {
    const authService = inject(AuthenticationService);
    const router = inject(Router);

    const permission = route.data?.['permission'] as string | undefined;

    return checkPermission(permission || '', authService, router);
};

// Functional Guard for CanActivateChild
export const permissionGuardChild: CanActivateChildFn = (
    childRoute: ActivatedRouteSnapshot,
    state: import('@angular/router').RouterStateSnapshot
): Observable<boolean> | Promise<boolean> | boolean => {
    const authService = inject(AuthenticationService);
    const router = inject(Router);

    const permission = childRoute.data?.['permission'] as string | undefined;
    return checkPermission(permission || '', authService, router);
};

// Functional Guard for CanLoad
export const permissionGuardLoad: CanLoadFn = (
    route: Route,
    segments: UrlSegment[]
): Observable<boolean> | Promise<boolean> | boolean => {
    const authService = inject(AuthenticationService);
    const router = inject(Router);

    const permission = route.data?.['permission'] as string | undefined;
    return checkPermission(permission || '', authService, router);
};

// Shared logic for permission check
function checkPermission(
    permission: string,
    authService: AuthenticationService,
    router: Router
): Observable<boolean> {
    return authService.identity().pipe(
        map((user) => {
            if (!user) {
                router.navigate(['/account/login']);
                return false;
            }

            // Check if user has the required permission
            const userPermissions = user?.permissions || [];
            if (permission && !userPermissions.includes(permission)) {
                router.navigate(['/403']);
                return false;
            }

            return true;
        }),
        catchError(() => {
            router.navigate(['/account/login']);
            return of(false);
        })
    );
}