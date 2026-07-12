/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiV1AcademyAcademyIdPoliciesGet } from '../fn/policies/api-v-1-academy-academy-id-policies-get';
import { ApiV1AcademyAcademyIdPoliciesGet$Params } from '../fn/policies/api-v-1-academy-academy-id-policies-get';
import { apiV1AcademyAcademyIdPoliciesTypeCustomizePost } from '../fn/policies/api-v-1-academy-academy-id-policies-type-customize-post';
import { ApiV1AcademyAcademyIdPoliciesTypeCustomizePost$Params } from '../fn/policies/api-v-1-academy-academy-id-policies-type-customize-post';
import { apiV1AcademyAcademyIdPoliciesTypeGet } from '../fn/policies/api-v-1-academy-academy-id-policies-type-get';
import { ApiV1AcademyAcademyIdPoliciesTypeGet$Params } from '../fn/policies/api-v-1-academy-academy-id-policies-type-get';
import { apiV1PoliciesPolicyIdToggleStatusPatch } from '../fn/policies/api-v-1-policies-policy-id-toggle-status-patch';
import { ApiV1PoliciesPolicyIdToggleStatusPatch$Params } from '../fn/policies/api-v-1-policies-policy-id-toggle-status-patch';
import { apiV1PoliciesPut } from '../fn/policies/api-v-1-policies-put';
import { ApiV1PoliciesPut$Params } from '../fn/policies/api-v-1-policies-put';
import { apiV1PoliciesTypesGet } from '../fn/policies/api-v-1-policies-types-get';
import { ApiV1PoliciesTypesGet$Params } from '../fn/policies/api-v-1-policies-types-get';
import { PoliciesCustomizePolicyFromDefaultResponse } from '../models/policies-customize-policy-from-default-response';
import { PoliciesGetAllPoliciesResponse } from '../models/policies-get-all-policies-response';
import { PoliciesGetPolicyByTypeResponse } from '../models/policies-get-policy-by-type-response';
import { PoliciesGetPolicyTypesResponse } from '../models/policies-get-policy-types-response';
import { PoliciesTogglePolicyStatusResponse } from '../models/policies-toggle-policy-status-response';
import { PoliciesUpdatePolicyResponse } from '../models/policies-update-policy-response';

@Injectable({ providedIn: 'root' })
export class PoliciesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiV1AcademyAcademyIdPoliciesGet()` */
  static readonly ApiV1AcademyAcademyIdPoliciesGetPath = '/api/v1/academy/{academy_id}/policies';

  /**
   * Get All Policies.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AcademyAcademyIdPoliciesGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdPoliciesGet$Response(params: ApiV1AcademyAcademyIdPoliciesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<PoliciesGetAllPoliciesResponse>> {
    return apiV1AcademyAcademyIdPoliciesGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get All Policies.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AcademyAcademyIdPoliciesGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdPoliciesGet(params: ApiV1AcademyAcademyIdPoliciesGet$Params, context?: HttpContext): Observable<PoliciesGetAllPoliciesResponse> {
    return this.apiV1AcademyAcademyIdPoliciesGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<PoliciesGetAllPoliciesResponse>): PoliciesGetAllPoliciesResponse => r.body)
    );
  }

  /** Path part for operation `apiV1AcademyAcademyIdPoliciesTypeGet()` */
  static readonly ApiV1AcademyAcademyIdPoliciesTypeGetPath = '/api/v1/academy/{academy_id}/policies/{type}';

  /**
   * Get Policy by Type.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AcademyAcademyIdPoliciesTypeGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdPoliciesTypeGet$Response(params: ApiV1AcademyAcademyIdPoliciesTypeGet$Params, context?: HttpContext): Observable<StrictHttpResponse<PoliciesGetPolicyByTypeResponse>> {
    return apiV1AcademyAcademyIdPoliciesTypeGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Policy by Type.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AcademyAcademyIdPoliciesTypeGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdPoliciesTypeGet(params: ApiV1AcademyAcademyIdPoliciesTypeGet$Params, context?: HttpContext): Observable<PoliciesGetPolicyByTypeResponse> {
    return this.apiV1AcademyAcademyIdPoliciesTypeGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<PoliciesGetPolicyByTypeResponse>): PoliciesGetPolicyByTypeResponse => r.body)
    );
  }

  /** Path part for operation `apiV1PoliciesPut()` */
  static readonly ApiV1PoliciesPutPath = '/api/v1/policies';

  /**
   * Update Policy.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1PoliciesPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1PoliciesPut$Response(params?: ApiV1PoliciesPut$Params, context?: HttpContext): Observable<StrictHttpResponse<PoliciesUpdatePolicyResponse>> {
    return apiV1PoliciesPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Policy.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1PoliciesPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1PoliciesPut(params?: ApiV1PoliciesPut$Params, context?: HttpContext): Observable<PoliciesUpdatePolicyResponse> {
    return this.apiV1PoliciesPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<PoliciesUpdatePolicyResponse>): PoliciesUpdatePolicyResponse => r.body)
    );
  }

  /** Path part for operation `apiV1PoliciesPolicyIdToggleStatusPatch()` */
  static readonly ApiV1PoliciesPolicyIdToggleStatusPatchPath = '/api/v1/policies/{policy_id}/toggle-status';

  /**
   * Toggle Policy Status.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1PoliciesPolicyIdToggleStatusPatch()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1PoliciesPolicyIdToggleStatusPatch$Response(params: ApiV1PoliciesPolicyIdToggleStatusPatch$Params, context?: HttpContext): Observable<StrictHttpResponse<PoliciesTogglePolicyStatusResponse>> {
    return apiV1PoliciesPolicyIdToggleStatusPatch(this.http, this.rootUrl, params, context);
  }

  /**
   * Toggle Policy Status.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1PoliciesPolicyIdToggleStatusPatch$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1PoliciesPolicyIdToggleStatusPatch(params: ApiV1PoliciesPolicyIdToggleStatusPatch$Params, context?: HttpContext): Observable<PoliciesTogglePolicyStatusResponse> {
    return this.apiV1PoliciesPolicyIdToggleStatusPatch$Response(params, context).pipe(
      map((r: StrictHttpResponse<PoliciesTogglePolicyStatusResponse>): PoliciesTogglePolicyStatusResponse => r.body)
    );
  }

  /** Path part for operation `apiV1AcademyAcademyIdPoliciesTypeCustomizePost()` */
  static readonly ApiV1AcademyAcademyIdPoliciesTypeCustomizePostPath = '/api/v1/academy/{academy_id}/policies/{type}/customize';

  /**
   * Customize Policy from Default.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AcademyAcademyIdPoliciesTypeCustomizePost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdPoliciesTypeCustomizePost$Response(params: ApiV1AcademyAcademyIdPoliciesTypeCustomizePost$Params, context?: HttpContext): Observable<StrictHttpResponse<PoliciesCustomizePolicyFromDefaultResponse>> {
    return apiV1AcademyAcademyIdPoliciesTypeCustomizePost(this.http, this.rootUrl, params, context);
  }

  /**
   * Customize Policy from Default.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AcademyAcademyIdPoliciesTypeCustomizePost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdPoliciesTypeCustomizePost(params: ApiV1AcademyAcademyIdPoliciesTypeCustomizePost$Params, context?: HttpContext): Observable<PoliciesCustomizePolicyFromDefaultResponse> {
    return this.apiV1AcademyAcademyIdPoliciesTypeCustomizePost$Response(params, context).pipe(
      map((r: StrictHttpResponse<PoliciesCustomizePolicyFromDefaultResponse>): PoliciesCustomizePolicyFromDefaultResponse => r.body)
    );
  }

  /** Path part for operation `apiV1PoliciesTypesGet()` */
  static readonly ApiV1PoliciesTypesGetPath = '/api/v1/policies/types';

  /**
   * Get Policy Types.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1PoliciesTypesGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1PoliciesTypesGet$Response(params?: ApiV1PoliciesTypesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<PoliciesGetPolicyTypesResponse>> {
    return apiV1PoliciesTypesGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Policy Types.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1PoliciesTypesGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1PoliciesTypesGet(params?: ApiV1PoliciesTypesGet$Params, context?: HttpContext): Observable<PoliciesGetPolicyTypesResponse> {
    return this.apiV1PoliciesTypesGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<PoliciesGetPolicyTypesResponse>): PoliciesGetPolicyTypesResponse => r.body)
    );
  }

}
