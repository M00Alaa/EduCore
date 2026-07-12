/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { AcademyCreateBranchDataResponse } from '../models/academy-create-branch-data-response';
import { AcademyCreatewithUserResponse } from '../models/academy-createwith-user-response';
import { AcademyGetAcademyDataResponse } from '../models/academy-get-academy-data-response';
import { AcademyRenewalResponse } from '../models/academy-renewal-response';
import { apiSubscriptionAcademyCreateBranchDataPost } from '../fn/academy/api-subscription-academy-create-branch-data-post';
import { ApiSubscriptionAcademyCreateBranchDataPost$Params } from '../fn/academy/api-subscription-academy-create-branch-data-post';
import { apiSubscriptionAcademyCreatePost } from '../fn/academy/api-subscription-academy-create-post';
import { ApiSubscriptionAcademyCreatePost$Params } from '../fn/academy/api-subscription-academy-create-post';
import { apiSubscriptionAcademyGetAcademyDataGet } from '../fn/academy/api-subscription-academy-get-academy-data-get';
import { ApiSubscriptionAcademyGetAcademyDataGet$Params } from '../fn/academy/api-subscription-academy-get-academy-data-get';
import { apiSubscriptionAcademyRenewalPost } from '../fn/academy/api-subscription-academy-renewal-post';
import { ApiSubscriptionAcademyRenewalPost$Params } from '../fn/academy/api-subscription-academy-renewal-post';

@Injectable({ providedIn: 'root' })
export class AcademyService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiSubscriptionAcademyCreatePost()` */
  static readonly ApiSubscriptionAcademyCreatePostPath = '/api/subscription/academy/create';

  /**
   * Create with User.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSubscriptionAcademyCreatePost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiSubscriptionAcademyCreatePost$Response(params?: ApiSubscriptionAcademyCreatePost$Params, context?: HttpContext): Observable<StrictHttpResponse<AcademyCreatewithUserResponse>> {
    return apiSubscriptionAcademyCreatePost(this.http, this.rootUrl, params, context);
  }

  /**
   * Create with User.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiSubscriptionAcademyCreatePost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiSubscriptionAcademyCreatePost(params?: ApiSubscriptionAcademyCreatePost$Params, context?: HttpContext): Observable<AcademyCreatewithUserResponse> {
    return this.apiSubscriptionAcademyCreatePost$Response(params, context).pipe(
      map((r: StrictHttpResponse<AcademyCreatewithUserResponse>): AcademyCreatewithUserResponse => r.body)
    );
  }

  /** Path part for operation `apiSubscriptionAcademyCreateBranchDataPost()` */
  static readonly ApiSubscriptionAcademyCreateBranchDataPostPath = '/api/subscription/academy/create-branch-data';

  /**
   * Create Branch Data.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSubscriptionAcademyCreateBranchDataPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiSubscriptionAcademyCreateBranchDataPost$Response(params: ApiSubscriptionAcademyCreateBranchDataPost$Params, context?: HttpContext): Observable<StrictHttpResponse<AcademyCreateBranchDataResponse>> {
    return apiSubscriptionAcademyCreateBranchDataPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Create Branch Data.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiSubscriptionAcademyCreateBranchDataPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiSubscriptionAcademyCreateBranchDataPost(params: ApiSubscriptionAcademyCreateBranchDataPost$Params, context?: HttpContext): Observable<AcademyCreateBranchDataResponse> {
    return this.apiSubscriptionAcademyCreateBranchDataPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<AcademyCreateBranchDataResponse>): AcademyCreateBranchDataResponse => r.body)
    );
  }

  /** Path part for operation `apiSubscriptionAcademyRenewalPost()` */
  static readonly ApiSubscriptionAcademyRenewalPostPath = '/api/subscription/academy/renewal';

  /**
   * Renewal.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSubscriptionAcademyRenewalPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiSubscriptionAcademyRenewalPost$Response(params?: ApiSubscriptionAcademyRenewalPost$Params, context?: HttpContext): Observable<StrictHttpResponse<AcademyRenewalResponse>> {
    return apiSubscriptionAcademyRenewalPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Renewal.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiSubscriptionAcademyRenewalPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiSubscriptionAcademyRenewalPost(params?: ApiSubscriptionAcademyRenewalPost$Params, context?: HttpContext): Observable<AcademyRenewalResponse> {
    return this.apiSubscriptionAcademyRenewalPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<AcademyRenewalResponse>): AcademyRenewalResponse => r.body)
    );
  }

  /** Path part for operation `apiSubscriptionAcademyGetAcademyDataGet()` */
  static readonly ApiSubscriptionAcademyGetAcademyDataGetPath = '/api/subscription/academy/get-academy-data';

  /**
   * Get Academy Data.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSubscriptionAcademyGetAcademyDataGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiSubscriptionAcademyGetAcademyDataGet$Response(params: ApiSubscriptionAcademyGetAcademyDataGet$Params, context?: HttpContext): Observable<StrictHttpResponse<AcademyGetAcademyDataResponse>> {
    return apiSubscriptionAcademyGetAcademyDataGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Academy Data.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiSubscriptionAcademyGetAcademyDataGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiSubscriptionAcademyGetAcademyDataGet(params: ApiSubscriptionAcademyGetAcademyDataGet$Params, context?: HttpContext): Observable<AcademyGetAcademyDataResponse> {
    return this.apiSubscriptionAcademyGetAcademyDataGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<AcademyGetAcademyDataResponse>): AcademyGetAcademyDataResponse => r.body)
    );
  }

}
