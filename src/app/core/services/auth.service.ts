import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { ROLES } from './../../app-const';
import { AuthService } from '../backend/common/services';
import { AuthGetCurrentUserMeResponseDataUser } from '../backend/common/models';


export type MgUser = Partial<AuthGetCurrentUserMeResponseDataUser> & {
  roles?: number[] | null | undefined;
  permissions?: string[];
  landing_route?: string | null;
};
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  currentUserSubject: BehaviorSubject<MgUser | null> =
    new BehaviorSubject<MgUser | null>(null);
  public currentUser: Observable<MgUser | null>;

  private token: string | undefined | null;
  public get _token(): string {
    return (
      this.token ||
      JSON.parse(localStorage.getItem('vultToken') || 'null') ||
      JSON.parse(sessionStorage.getItem('vultToken') || 'null')
    );
  }
  private set _tokenInLocal(value: string | null) {
    this.token = value;
    localStorage.setItem('vultToken', JSON.stringify(value));
  }
  private set _tokenInSession(value: string | null) {
    this.token = value;
    sessionStorage.setItem('vultToken', JSON.stringify(value));
  }

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.currentUser = this.currentUserSubject.asObservable();
  }

  identity(force = false): Observable<MgUser | null> {
    if (!this._token) {
      return of(null);
    }

    if (this.currentUserSubject.value && !force) {
      return this.currentUserSubject;
    } else {
      return this.authService.apiV1UsersMeGet().pipe(
        distinctUntilChanged(),
        map((res) => {
          // login successful if there's a jwt token in the response
          if (res) {
            if (!this.currentUserSubject.value || force) {
              let userRole = res.data?.user?.user_type?.id!;
              let academy = res.data?.user?.academy;
              let isImpersonating = false;
              const impersonatedBranchId = this.getStoredAcademyContextId('impersonated_branch_id');
              const impersonatedMainAcademyId = this.getStoredAcademyContextId('impersonated_main_academy_id');

              // If user is AcademyAdmin but their academy has a parent_id, they are actually a BranchManager
              if (userRole === ROLES.AcademyAdmin && academy && academy.parent_id) {
                userRole = ROLES.BranchManager;
              }

              // Check for impersonation (Switch Branch)
              if (impersonatedBranchId) {
                try {
                  if (userRole === ROLES.MasterAcademy) {
                    // MasterAcademy impersonating an academy → act as AcademyAdmin
                    userRole = ROLES.AcademyAdmin;
                    isImpersonating = true;
                  } else if (userRole === ROLES.AcademyAdmin) {
                    // Only allow if user is a MAIN academy admin initially
                    if (academy && !academy.parent_id) {
                      userRole = ROLES.BranchManager;
                      isImpersonating = true;
                    }
                  }
                } catch (e) {
                  localStorage.removeItem('impersonated_branch_id');
                }
              }

              const permissions = this.normalizePermissions(res.data?.user?.permissions);
              const landingRoute = this.normalizeLandingRoute((res.data?.user as { landing_route?: unknown })?.landing_route);
              const userCopy = { ...res.data?.user };
              if (isImpersonating && impersonatedBranchId) {
                const existingAcademy: any = userCopy.academy || academy || {};
                const resolvedParentId =
                  impersonatedMainAcademyId && impersonatedMainAcademyId !== impersonatedBranchId
                    ? impersonatedMainAcademyId
                    : this.extractPositiveNumber(existingAcademy?.parent_id);

                if (userRole === ROLES.AcademyAdmin && resolvedParentId) {
                  userRole = ROLES.BranchManager;
                }

                (userCopy as any).academy_id = String(impersonatedBranchId);
                if (resolvedParentId) {
                  (userCopy as any).parent_id = resolvedParentId;
                }

                userCopy.academy = {
                  ...existingAcademy,
                  id: impersonatedBranchId,
                  parent_id: resolvedParentId || null,
                  title: existingAcademy?.title || 'Impersonated Academy',
                  is_impersonated: true,
                };
              } else if (!impersonatedBranchId) {
                localStorage.removeItem('impersonated_main_academy_id');
              }

              this.currentUserSubject.next(
                res ? { ...userCopy, academy: userCopy.academy || academy, roles: [userRole], permissions, landing_route: landingRoute } : null,
              );
            }
            return (this.currentUserSubject.getValue() ||
              res ||
              null) as any;
          }
          this.router.navigate(['/account']);
          return null;
        })
      );
    }
  }

  public get currentUserValue(): MgUser | null {
    return this.currentUserSubject.value;
  }

  hasPermission(required: string | string[] | null | undefined): boolean {
    if (!required) {
      return true;
    }

    const userPermissions = new Set((this.currentUserSubject.value?.permissions || []).filter(Boolean));
    if (userPermissions.has('*')) {
      return true;
    }

    const requiredPermissions = (Array.isArray(required) ? required : [required])
      .map((permission) => String(permission || '').trim())
      .filter(Boolean);

    if (requiredPermissions.length === 0) {
      return true;
    }

    return requiredPermissions.some((permission) => userPermissions.has(permission));
  }

  login(username: string, password: string, rememberMe = false) {
    return this.authService
      .apiV1AuthManagerLoginPost({
        body: {
          identity: username,
          password,
        },
      })
      .pipe(
        map((user) => {
          // login successful if there's a jwt token in the response
          if (user && user?.data?.token) {
            const token = String(user.data.token);

            // Clear any stale impersonation state from a previous session.
            // This ensures a fresh login always starts without leftover branch context.
            localStorage.removeItem('impersonated_branch_id');
            localStorage.removeItem('impersonated_main_academy_id');

            if (rememberMe) {
              this._tokenInSession = token;
              this._tokenInLocal = token;
            } else {
              this._tokenInLocal = token;
            }
          }
          return user;
        }),
      );
  }

  redirectUser() {
    const userRoles = this.currentUserSubject.getValue()?.roles;
    const userPermissions = new Set((this.currentUserSubject.value?.permissions || []).filter(Boolean));

    if (userRoles?.includes(ROLES.MasterAcademy)) {
      this.router.navigate(['/master-academies']);
    } else if (
      userRoles?.includes(ROLES.AcademyAdmin) ||
      userRoles?.includes(ROLES.BranchManager) ||
      userRoles?.includes(ROLES.CustomRole)
    ) {
      if (userPermissions.has('*') || userPermissions.has('dashboard.view')) {
        this.router.navigate(['/dashboard']);
      } else {
        const landingRoute = this.currentUserSubject.getValue()?.landing_route;
        const normalizedLanding =
          landingRoute && landingRoute !== '/403' ? landingRoute : null;
        const targetRoute = normalizedLanding || this.resolveFirstAccessibleRoute(userPermissions);
        void this.router.navigateByUrl(targetRoute);
      }
    } else if (userRoles?.includes(ROLES.Trainer)) {
      this.router.navigate(['/dashboard']);


    } else {
      this.router.navigate(['/403']);
    }
  }

  private resolveFirstAccessibleRoute(permissions: Set<string>): string {
    const routeChecks = [
      { route: '/dashboard', permission: 'dashboard.view' },
      { route: '/financial/salaries', permission: 'team_salaries.view' },
      { route: '/activities?tab=deductions', permission: 'deductions.view' },
      { route: '/reports/general', permission: 'reports.view' },
      { route: '/reports/general', permission: 'reports.general.view' },
      { route: '/reports/subscriptions', permission: 'reports.subscriptions.view' },
      { route: '/reports/facilities', permission: 'reports.facilities.view' },
      { route: '/reports/players', permission: 'reports.players.view' },
      { route: '/reports/activities', permission: 'reports.activities.view' },
      { route: '/reports/deductions', permission: 'deductions.view' },
      { route: '/reports/salaries', permission: 'team_salaries.view' },
      { route: '/reports/attendance', permission: 'reports.attendance.view' },
      { route: '/reports/revenues', permission: 'reports.financial.view' },
      { route: '/reports/revenues', permission: 'reports.revenues.view' },
      { route: '/reports/expenses', permission: 'reports.expenses.view' },
      { route: '/reports/balances', permission: 'reports.balances.view' },
      { route: '/subscriptions', permission: 'subscriptions.view' },
      { route: '/subscriptions', permission: 'subscription-management-parent/view' },
      { route: '/activities', permission: 'activities.view' },
      { route: '/players-attendance', permission: 'players.attendance.view' },
      { route: '/players', permission: 'players.management.view' },
      { route: '/players', permission: 'players.teams.view' },
      { route: '/players', permission: 'players.view' },
      { route: '/trainers', permission: 'trainers.view' },
      { route: '/administrators', permission: 'administrators.view' },
      { route: '/trainer/appointments', permission: 'appointments.view' },
      { route: '/financial', permission: 'financial.view' },
      { route: '/equipment', permission: 'equipment.view' },
      { route: '/permissions', permission: 'permissions.view' },
      { route: '/settings', permission: 'settings.view' },
      { route: '/communication', permission: 'communication.view' },
      { route: '/branches', permission: 'branches.view' },
      { route: '/invoices', permission: 'invoices.view' },
    ];
    return routeChecks.find(r => permissions.has(r.permission))?.route ?? '/403';
  }

  logout() {
    this._tokenInLocal = null;
    this._tokenInSession = null;
    localStorage.removeItem('impersonated_branch_id');
    localStorage.removeItem('impersonated_main_academy_id');
    this.router.navigate(['/account/login']).then(() => {
      this.currentUserSubject.next(null);
    })
  }
  // Switch to Branch / Academy Context
  switchAcademy(academy_id: string) {
    if (!academy_id) return;

    const currentUser = this.currentUserSubject.value;
    const targetAcademyId = this.extractPositiveNumber(academy_id);
    if (!targetAcademyId) return;

    // Allow if MasterAcademy, AcademyAdmin, or BranchManager
    if (
      currentUser?.roles?.includes(ROLES.MasterAcademy) ||
      currentUser?.roles?.includes(ROLES.AcademyAdmin) ||
      currentUser?.roles?.includes(ROLES.BranchManager)
    ) {
      const storedMainAcademyId = this.getStoredAcademyContextId('impersonated_main_academy_id');
      const currentAcademyId = this.extractPositiveNumber(
        (currentUser as any)?.academy_id ?? (currentUser as any)?.academy?.id
      );
      const currentAcademyParentId = this.extractPositiveNumber(
        (currentUser as any)?.academy?.parent_id ?? (currentUser as any)?.parent_id
      );
      const isMaster = currentUser?.roles?.includes(ROLES.MasterAcademy) ?? false;

      let resolvedMainAcademyId = storedMainAcademyId;
      if (!resolvedMainAcademyId) {
        if (currentAcademyParentId) {
          resolvedMainAcademyId = currentAcademyParentId;
        } else if (isMaster) {
          resolvedMainAcademyId = targetAcademyId;
        } else {
          resolvedMainAcademyId = currentAcademyId || targetAcademyId;
        }
      }

      localStorage.setItem('impersonated_branch_id', String(targetAcademyId));
      if (resolvedMainAcademyId) {
        localStorage.setItem('impersonated_main_academy_id', String(resolvedMainAcademyId));
      }

      window.location.href = isMaster ? '/branches' : '/subscriptions';
    }
  }

  // Exit Branch / Academy Context
  exitBranch() {
    localStorage.removeItem('impersonated_branch_id');
    localStorage.removeItem('impersonated_main_academy_id');
    // Refresh identity to restore original role, then redirect appropriately
    this.currentUserSubject.next(null);
    this.identity(true).subscribe({
      next: (user) => {
        if (user?.roles?.includes(ROLES.MasterAcademy)) {
          window.location.href = '/master-academies';
        } else {
          window.location.href = '/branches';
        }
      },
      error: () => {
        window.location.href = '/branches';
      },
    });
  }

  private normalizePermissions(permissions: unknown): string[] {
    if (!Array.isArray(permissions)) {
      return [];
    }

    return Array.from(
      new Set(
        permissions
          .map((permission) => String(permission || '').trim())
          .filter((permission) => !!permission)
      )
    );
  }

  private normalizeLandingRoute(route: unknown): string | null {
    const value = String(route || '').trim();
    return value.startsWith('/') ? value : null;
  }

  getCurrentMainAcademyContextId(): number | null {
    const impersonatedMainId = this.getStoredAcademyContextId('impersonated_main_academy_id');
    if (impersonatedMainId) {
      return impersonatedMainId;
    }

    const user = this.currentUserSubject.value as any;
    const parentId = this.extractPositiveNumber(user?.academy?.parent_id ?? user?.parent_id);
    if (parentId) {
      return parentId;
    }

    return this.extractPositiveNumber(user?.academy_id ?? user?.academy?.id ?? user?.profile?.academy_id);
  }

  private getStoredAcademyContextId(storageKey: string): number | null {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      return null;
    }

    try {
      const numericRaw = Number(raw);
      if (Number.isInteger(numericRaw) && numericRaw > 0) {
        return numericRaw;
      }

      const parsed = JSON.parse(raw);
      if (typeof parsed === 'number' && Number.isInteger(parsed) && parsed > 0) {
        return parsed;
      }

      const parsedId = Number((parsed as any)?.id);
      return Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
    } catch {
      return null;
    }
  }

  private extractPositiveNumber(value: unknown): number | null {
    const parsed = Number(value ?? 0);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
  }
}
