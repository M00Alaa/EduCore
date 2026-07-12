import { Directive, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Directive({
    selector: '[appPermission]',
    standalone: true
})
export class PermissionDirective implements OnInit, OnChanges, OnDestroy {
    // Can be a single permission string or an array of permission strings
    @Input() appPermission: string | string[] = [];

    // Optional: require ALL permissions in the array (default is ANY)
    @Input() appPermissionRequireAll = false;

    // Hide when the user has any of these permissions (e.g. salaries menu only without expenses).
    @Input() appPermissionUnless: string | string[] = [];

    private destroy$ = new Subject<void>();
    private userPermissions = new Set<string>();

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private authService: AuthenticationService
    ) { }

    ngOnInit() {
        this.authService.currentUserSubject
            .pipe(
                distinctUntilChanged(),
                takeUntil(this.destroy$)
            )
            .subscribe(user => {
                this.userPermissions = new Set((user?.permissions || []).filter(Boolean));
                this.render();
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngOnChanges(_changes: SimpleChanges): void {
        this.render();
    }

    private render(): void {
        this.viewContainer.clear();

        const requiredPermissions = this.normalizeRequiredPermissions(this.appPermission);
        if (requiredPermissions.length === 0) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            return;
        }

        if (this.hasUnlessPermission()) {
            return;
        }

        if (this.userPermissions.has('*')) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            return;
        }

        const allowed = this.appPermissionRequireAll
            ? requiredPermissions.every((permission) => this.userPermissions.has(permission))
            : requiredPermissions.some((permission) => this.userPermissions.has(permission));

        if (allowed) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }

    private hasUnlessPermission(): boolean {
        const unlessPermissions = this.normalizeRequiredPermissions(this.appPermissionUnless);

        if (unlessPermissions.length === 0) {
            return false;
        }

        if (this.userPermissions.has('*')) {
            return true;
        }

        return unlessPermissions.some((permission) => this.userPermissions.has(permission));
    }

    private normalizeRequiredPermissions(value: string | string[]): string[] {
        const permissions = Array.isArray(value) ? value : [value];

        return permissions
            .map((permission) => (permission || '').trim())
            .filter(Boolean);
    }
}
