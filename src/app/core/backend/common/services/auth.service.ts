/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiV1AuthManagerLoginPost } from '../fn/auth/api-v-1-auth-manager-login-post';
import { ApiV1AuthManagerLoginPost$Params } from '../fn/auth/api-v-1-auth-manager-login-post';
import { apiV1UsersMeGet } from '../fn/auth/api-v-1-users-me-get';
import { ApiV1UsersMeGet$Params } from '../fn/auth/api-v-1-users-me-get';
import { apiV1UsersTypesGet } from '../fn/auth/api-v-1-users-types-get';
import { ApiV1UsersTypesGet$Params } from '../fn/auth/api-v-1-users-types-get';
import { AuthGetCurrentUserMeResponse } from '../models/auth-get-current-user-me-response';
import { AuthGetUserTypesRolesResponse } from '../models/auth-get-user-types-roles-response';
import { AuthManagerLoginResponse } from '../models/auth-manager-login-response';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiV1AuthManagerLoginPost()` */
  static readonly ApiV1AuthManagerLoginPostPath = '/api/v1/auth/manager-login';

  /**
   * Manager Login.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AuthManagerLoginPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AuthManagerLoginPost$Response(params?: ApiV1AuthManagerLoginPost$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthManagerLoginResponse>> {
    return apiV1AuthManagerLoginPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Manager Login.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AuthManagerLoginPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AuthManagerLoginPost(params?: ApiV1AuthManagerLoginPost$Params, context?: HttpContext): Observable<AuthManagerLoginResponse> {
    return this.apiV1AuthManagerLoginPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthManagerLoginResponse>): AuthManagerLoginResponse => r.body)
    );
  }

  /** Path part for operation `apiV1UsersMeGet()` */
  static readonly ApiV1UsersMeGetPath = '/api/v1/users/me';

  /**
   * Get Current User (me).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1UsersMeGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1UsersMeGet$Response(params?: ApiV1UsersMeGet$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthGetCurrentUserMeResponse>> {
    return apiV1UsersMeGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Current User (me).
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1UsersMeGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1UsersMeGet(params?: ApiV1UsersMeGet$Params, context?: HttpContext): Observable<AuthGetCurrentUserMeResponse> {
    return this.apiV1UsersMeGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthGetCurrentUserMeResponse>): AuthGetCurrentUserMeResponse => r.body)
    );
  }

  /** Path part for operation `apiV1UsersTypesGet()` */
  static readonly ApiV1UsersTypesGetPath = '/api/v1/users/types';

  /**
   * Get User Types & Roles.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1UsersTypesGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1UsersTypesGet$Response(params?: ApiV1UsersTypesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthGetUserTypesRolesResponse>> {
    return apiV1UsersTypesGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get User Types & Roles.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1UsersTypesGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1UsersTypesGet(params?: ApiV1UsersTypesGet$Params, context?: HttpContext): Observable<AuthGetUserTypesRolesResponse> {
    return this.apiV1UsersTypesGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthGetUserTypesRolesResponse>): AuthGetUserTypesRolesResponse => r.body)
    );
  }

}
