import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { ROLES } from './../../app-const';

export interface MgUser {
  id?: number;
  full_name?: string;
  username?: string;
  email?: string;
  roles?: number[];
  landing_route?: string;
  user_type?: { id?: number; name?: string };
  academy?: { id?: number; parent_id?: number; title?: string; subscription_type?: number; trial_days_remaining?: number | null };
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  currentUserSubject = new BehaviorSubject<MgUser | null>(null);
  public currentUser: Observable<MgUser | null>;

  private token: string | undefined | null;

  get _token(): string {
    return (
      this.token ||
      JSON.parse(localStorage.getItem('eduToken') || 'null') ||
      JSON.parse(sessionStorage.getItem('eduToken') || 'null')
    );
  }

  private set _tokenInLocal(value: string | null) {
    this.token = value;
    localStorage.setItem('eduToken', JSON.stringify(value));
  }

  private set _tokenInSession(value: string | null) {
    this.token = value;
    sessionStorage.setItem('eduToken', JSON.stringify(value));
  }

  constructor(private router: Router) {
    this.currentUser = this.currentUserSubject.asObservable();
  }

  identity(force?: boolean): Observable<MgUser | null> {
    if (!this._token) return of(null);
    return this.currentUserSubject;
  }

  get currentUserValue(): MgUser | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string, rememberMe = false) {
    const token = 'mock-token-' + Date.now();
    if (rememberMe) {
      this._tokenInSession = token;
      this._tokenInLocal = token;
    } else {
      this._tokenInLocal = token;
    }
    const mockUser: MgUser = {
      id: 1,
      full_name: username,
      username,
      email: username,
      user_type: { id: ROLES.AcademyAdmin, name: 'AcademyAdmin' },
      academy: { id: 1, title: 'Mock Academy' },
      roles: [ROLES.AcademyAdmin],
      landing_route: '/courses',
    };
    this.currentUserSubject.next(mockUser);
    return of({ data: { token } }).pipe(delay(500));
  }

  redirectUser() {
    void this.router.navigate(['/courses']);
  }

  logout() {
    this._tokenInLocal = null;
    this._tokenInSession = null;
    this.router.navigate(['/account/login']).then(() => {
      this.currentUserSubject.next(null);
    });
  }
}
