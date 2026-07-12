/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiV1BranchesPlansGet } from '../fn/lookups-api-filter/api-v-1-branches-plans-get';
import { ApiV1BranchesPlansGet$Params } from '../fn/lookups-api-filter/api-v-1-branches-plans-get';
import { apiV1LookupsAcademyAcademyIdBranchesGet } from '../fn/lookups-api-filter/api-v-1-lookups-academy-academy-id-branches-get';
import { ApiV1LookupsAcademyAcademyIdBranchesGet$Params } from '../fn/lookups-api-filter/api-v-1-lookups-academy-academy-id-branches-get';
import { apiV1LookupsAcademyAcademyPackagesGet } from '../fn/lookups-api-filter/api-v-1-lookups-academy-academy-packages-get';
import { ApiV1LookupsAcademyAcademyPackagesGet$Params } from '../fn/lookups-api-filter/api-v-1-lookups-academy-academy-packages-get';
import { apiV1LookupsBranchStatusesGet } from '../fn/lookups-api-filter/api-v-1-lookups-branch-statuses-get';
import { ApiV1LookupsBranchStatusesGet$Params } from '../fn/lookups-api-filter/api-v-1-lookups-branch-statuses-get';
import { apiV1LookupsInvoiceTypesGet } from '../fn/lookups-api-filter/api-v-1-lookups-invoice-types-get';
import { ApiV1LookupsInvoiceTypesGet$Params } from '../fn/lookups-api-filter/api-v-1-lookups-invoice-types-get';
import { apiV1LookupsPackageTypesGet } from '../fn/lookups-api-filter/api-v-1-lookups-package-types-get';
import { ApiV1LookupsPackageTypesGet$Params } from '../fn/lookups-api-filter/api-v-1-lookups-package-types-get';
import { apiV1LookupsSkillCategoriesGet } from '../fn/lookups-api-filter/api-v-1-lookups-skill-categories-get';
import { ApiV1LookupsSkillCategoriesGet$Params } from '../fn/lookups-api-filter/api-v-1-lookups-skill-categories-get';
import { apiV1LookupsSubscriptionStatusesGet } from '../fn/lookups-api-filter/api-v-1-lookups-subscription-statuses-get';
import { ApiV1LookupsSubscriptionStatusesGet$Params } from '../fn/lookups-api-filter/api-v-1-lookups-subscription-statuses-get';
import { LookupsApiFilterGetAcademyBranchesLookupResponse } from '../models/lookups-api-filter-get-academy-branches-lookup-response';
import { LookupsApiFilterGetAcademyBranchesPlansResponse } from '../models/lookups-api-filter-get-academy-branches-plans-response';
import { LookupsApiFilterGetBranchStatusesResponse } from '../models/lookups-api-filter-get-branch-statuses-response';
import { LookupsApiFilterGetInvoiceTypesResponse } from '../models/lookups-api-filter-get-invoice-types-response';
import { LookupsApiFilterGetPackageListResponse } from '../models/lookups-api-filter-get-package-list-response';
import { LookupsApiFilterGetPackageTypesResponse } from '../models/lookups-api-filter-get-package-types-response';
import { LookupsApiFilterGetSkillCategoriesResponse } from '../models/lookups-api-filter-get-skill-categories-response';
import { LookupsApiFilterGetSubscriptionStatusesResponse } from '../models/lookups-api-filter-get-subscription-statuses-response';

@Injectable({ providedIn: 'root' })
export class LookupsApiFilterService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiV1LookupsPackageTypesGet()` */
  static readonly ApiV1LookupsPackageTypesGetPath = '/api/v1/lookups/package-types';

  /**
   * Get Package Types.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1LookupsPackageTypesGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1LookupsPackageTypesGet$Response(params?: ApiV1LookupsPackageTypesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<LookupsApiFilterGetPackageTypesResponse>> {
    return apiV1LookupsPackageTypesGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Package Types.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1LookupsPackageTypesGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1LookupsPackageTypesGet(params?: ApiV1LookupsPackageTypesGet$Params, context?: HttpContext): Observable<LookupsApiFilterGetPackageTypesResponse> {
    return this.apiV1LookupsPackageTypesGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<LookupsApiFilterGetPackageTypesResponse>): LookupsApiFilterGetPackageTypesResponse => r.body)
    );
  }

  /** Path part for operation `apiV1LookupsAcademyAcademyPackagesGet()` */
  static readonly ApiV1LookupsAcademyAcademyPackagesGetPath = '/api/v1/lookups/academy/{academy}/packages';

  /**
   * Get Package List.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1LookupsAcademyAcademyPackagesGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1LookupsAcademyAcademyPackagesGet$Response(params: ApiV1LookupsAcademyAcademyPackagesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<LookupsApiFilterGetPackageListResponse>> {
    return apiV1LookupsAcademyAcademyPackagesGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Package List.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1LookupsAcademyAcademyPackagesGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1LookupsAcademyAcademyPackagesGet(params: ApiV1LookupsAcademyAcademyPackagesGet$Params, context?: HttpContext): Observable<LookupsApiFilterGetPackageListResponse> {
    return this.apiV1LookupsAcademyAcademyPackagesGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<LookupsApiFilterGetPackageListResponse>): LookupsApiFilterGetPackageListResponse => r.body)
    );
  }

  /** Path part for operation `apiV1LookupsSkillCategoriesGet()` */
  static readonly ApiV1LookupsSkillCategoriesGetPath = '/api/v1/lookups/skill-categories';

  /**
   * Get Skill Categories.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1LookupsSkillCategoriesGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1LookupsSkillCategoriesGet$Response(params: ApiV1LookupsSkillCategoriesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<LookupsApiFilterGetSkillCategoriesResponse>> {
    return apiV1LookupsSkillCategoriesGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Skill Categories.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1LookupsSkillCategoriesGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1LookupsSkillCategoriesGet(params: ApiV1LookupsSkillCategoriesGet$Params, context?: HttpContext): Observable<LookupsApiFilterGetSkillCategoriesResponse> {
    return this.apiV1LookupsSkillCategoriesGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<LookupsApiFilterGetSkillCategoriesResponse>): LookupsApiFilterGetSkillCategoriesResponse => r.body)
    );
  }

  /** Path part for operation `apiV1LookupsInvoiceTypesGet()` */
  static readonly ApiV1LookupsInvoiceTypesGetPath = '/api/v1/lookups/invoice-types';

  /**
   * Get Invoice Types.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1LookupsInvoiceTypesGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1LookupsInvoiceTypesGet$Response(params?: ApiV1LookupsInvoiceTypesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<LookupsApiFilterGetInvoiceTypesResponse>> {
    return apiV1LookupsInvoiceTypesGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Invoice Types.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1LookupsInvoiceTypesGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1LookupsInvoiceTypesGet(params?: ApiV1LookupsInvoiceTypesGet$Params, context?: HttpContext): Observable<LookupsApiFilterGetInvoiceTypesResponse> {
    return this.apiV1LookupsInvoiceTypesGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<LookupsApiFilterGetInvoiceTypesResponse>): LookupsApiFilterGetInvoiceTypesResponse => r.body)
    );
  }

  /** Path part for operation `apiV1LookupsBranchStatusesGet()` */
  static readonly ApiV1LookupsBranchStatusesGetPath = '/api/v1/lookups/branch-statuses';

  /**
   * Get Branch Statuses.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1LookupsBranchStatusesGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1LookupsBranchStatusesGet$Response(params?: ApiV1LookupsBranchStatusesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<LookupsApiFilterGetBranchStatusesResponse>> {
    return apiV1LookupsBranchStatusesGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Branch Statuses.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1LookupsBranchStatusesGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1LookupsBranchStatusesGet(params?: ApiV1LookupsBranchStatusesGet$Params, context?: HttpContext): Observable<LookupsApiFilterGetBranchStatusesResponse> {
    return this.apiV1LookupsBranchStatusesGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<LookupsApiFilterGetBranchStatusesResponse>): LookupsApiFilterGetBranchStatusesResponse => r.body)
    );
  }

  /** Path part for operation `apiV1LookupsSubscriptionStatusesGet()` */
  static readonly ApiV1LookupsSubscriptionStatusesGetPath = '/api/v1/lookups/subscription-statuses';

  /**
   * Get Subscription Statuses.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1LookupsSubscriptionStatusesGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1LookupsSubscriptionStatusesGet$Response(params?: ApiV1LookupsSubscriptionStatusesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<LookupsApiFilterGetSubscriptionStatusesResponse>> {
    return apiV1LookupsSubscriptionStatusesGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Subscription Statuses.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1LookupsSubscriptionStatusesGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1LookupsSubscriptionStatusesGet(params?: ApiV1LookupsSubscriptionStatusesGet$Params, context?: HttpContext): Observable<LookupsApiFilterGetSubscriptionStatusesResponse> {
    return this.apiV1LookupsSubscriptionStatusesGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<LookupsApiFilterGetSubscriptionStatusesResponse>): LookupsApiFilterGetSubscriptionStatusesResponse => r.body)
    );
  }

  /** Path part for operation `apiV1LookupsAcademyAcademyIdBranchesGet()` */
  static readonly ApiV1LookupsAcademyAcademyIdBranchesGetPath = '/api/v1/lookups/academy/{academy_id}/branches';

  /**
   * Get Academy Branches (lookup).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1LookupsAcademyAcademyIdBranchesGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1LookupsAcademyAcademyIdBranchesGet$Response(params: ApiV1LookupsAcademyAcademyIdBranchesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<LookupsApiFilterGetAcademyBranchesLookupResponse>> {
    return apiV1LookupsAcademyAcademyIdBranchesGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Academy Branches (lookup).
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1LookupsAcademyAcademyIdBranchesGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1LookupsAcademyAcademyIdBranchesGet(params: ApiV1LookupsAcademyAcademyIdBranchesGet$Params, context?: HttpContext): Observable<LookupsApiFilterGetAcademyBranchesLookupResponse> {
    return this.apiV1LookupsAcademyAcademyIdBranchesGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<LookupsApiFilterGetAcademyBranchesLookupResponse>): LookupsApiFilterGetAcademyBranchesLookupResponse => r.body)
    );
  }

  /** Path part for operation `apiV1BranchesPlansGet()` */
  static readonly ApiV1BranchesPlansGetPath = '/api/v1/branches/plans';

  /**
   * Get Academy Branches Plans.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1BranchesPlansGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1BranchesPlansGet$Response(params?: ApiV1BranchesPlansGet$Params, context?: HttpContext): Observable<StrictHttpResponse<LookupsApiFilterGetAcademyBranchesPlansResponse>> {
    return apiV1BranchesPlansGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Academy Branches Plans.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1BranchesPlansGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1BranchesPlansGet(params?: ApiV1BranchesPlansGet$Params, context?: HttpContext): Observable<LookupsApiFilterGetAcademyBranchesPlansResponse> {
    return this.apiV1BranchesPlansGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<LookupsApiFilterGetAcademyBranchesPlansResponse>): LookupsApiFilterGetAcademyBranchesPlansResponse => r.body)
    );
  }

}
