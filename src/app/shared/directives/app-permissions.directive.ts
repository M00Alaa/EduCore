import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { ROLES } from 'src/app/app-const';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Directive({
  selector: '[appRole]',
  standalone: true
})
export class RoleDirective implements OnInit, OnDestroy {
  @Input() appRole: number[] = [];
  private destroy$ = new Subject();

  constructor(
    private template: TemplateRef<any>,
    private view: ViewContainerRef,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.authService.currentUserSubject
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: user => {
          this.view.clear();
          if (user?.roles) {
            let allowed = this.appRole.some(r => user?.roles?.includes(r));
            // Permission-group users are scoped by permissions, not sidebar role lists.
            if (!allowed && user?.roles?.includes(ROLES.CustomRole)) {
              allowed = true;
            }
            // Master Academy acts as Academy Admin / Branch Manager when impersonating
            if (!allowed && user?.roles?.includes(7) && (user as any)?.academy?.is_impersonated) {
                allowed = this.appRole.some(r => [3, 6].includes(r));
            }
            if (allowed || !this.appRole || this.appRole.length === 0) {
              this.view.createEmbeddedView(this.template);
            } else {
              this.view.clear();
            }
          }
        }
      });
  }

  ngOnDestroy() {
    // this.destroy$.next();
    this.destroy$.complete();
  }
}
