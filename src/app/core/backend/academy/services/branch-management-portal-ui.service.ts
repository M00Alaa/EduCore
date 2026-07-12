/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiV1BranchesGet } from '../fn/branch-management-portal-ui/api-v-1-branches-get';
import { ApiV1BranchesGet$Params } from '../fn/branch-management-portal-ui/api-v-1-branches-get';
import { apiV1BranchesIdDelete } from '../fn/branch-management-portal-ui/api-v-1-branches-id-delete';
import { ApiV1BranchesIdDelete$Params } from '../fn/branch-management-portal-ui/api-v-1-branches-id-delete';
import { apiV1BranchesIdGet } from '../fn/branch-management-portal-ui/api-v-1-branches-id-get';
import { ApiV1BranchesIdGet$Params } from '../fn/branch-management-portal-ui/api-v-1-branches-id-get';
import { apiV1BranchesIdPut } from '../fn/branch-management-portal-ui/api-v-1-branches-id-put';
import { ApiV1BranchesIdPut$Params } from '../fn/branch-management-portal-ui/api-v-1-branches-id-put';
import { apiV1BranchesManagersGet } from '../fn/branch-management-portal-ui/api-v-1-branches-managers-get';
import { ApiV1BranchesManagersGet$Params } from '../fn/branch-management-portal-ui/api-v-1-branches-managers-get';
import { apiV1BranchesPost } from '../fn/branch-management-portal-ui/api-v-1-branches-post';
import { ApiV1BranchesPost$Params } from '../fn/branch-management-portal-ui/api-v-1-branches-post';
import { BranchManagementPortalUiDeleteBranchResponse } from '../models/branch-management-portal-ui-delete-branch-response';
import { BranchManagementPortalUiGetAvailableManagersResponse } from '../models/branch-management-portal-ui-get-available-managers-response';
import { BranchManagementPortalUiGetBranchDetailsResponse } from '../models/branch-management-portal-ui-get-branch-details-response';
import { BranchManagementPortalUiListBranchesResponse } from '../models/branch-management-portal-ui-list-branches-response';
import { BranchManagementPortalUiUpdateBranchResponse } from '../models/branch-management-portal-ui-update-branch-response';
import { BranchManagementPortalUiCreateBranchWithexistingmanagerResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class BranchManagementPortalUiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiV1BranchesGet()` */
  static readonly ApiV1BranchesGetPath = '/api/v1/branches';

  /**
   * List Branches.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1BranchesGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1BranchesGet$Response(params: ApiV1BranchesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<BranchManagementPortalUiListBranchesResponse>> {
    return apiV1BranchesGet(this.http, this.rootUrl, params, context);
  }

  /**
   * List Branches.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1BranchesGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1BranchesGet(params: ApiV1BranchesGet$Params, context?: HttpContext): Observable<BranchManagementPortalUiListBranchesResponse> {
    return this.apiV1BranchesGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<BranchManagementPortalUiListBranchesResponse>): BranchManagementPortalUiListBranchesResponse => r.body)
    );
  }

  /** Path part for operation `apiV1BranchesPost()` */
  static readonly ApiV1BranchesPostPath = '/api/v1/branches';

  /**
   * Create Branch (with existing manager).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1BranchesPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1BranchesPost$Response(params?: ApiV1BranchesPost$Params, context?: HttpContext): Observable<StrictHttpResponse<BranchManagementPortalUiCreateBranchWithexistingmanagerResponse>> {
    return apiV1BranchesPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Create Branch (with existing manager).
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1BranchesPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1BranchesPost(params?: ApiV1BranchesPost$Params, context?: HttpContext): Observable<BranchManagementPortalUiCreateBranchWithexistingmanagerResponse> {
    return this.apiV1BranchesPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<BranchManagementPortalUiCreateBranchWithexistingmanagerResponse>): BranchManagementPortalUiCreateBranchWithexistingmanagerResponse => r.body)
    );
  }

  /** Path part for operation `apiV1BranchesIdGet()` */
  static readonly ApiV1BranchesIdGetPath = '/api/v1/branches/{id}';

  /**
   * Get Branch Details.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1BranchesIdGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1BranchesIdGet$Response(params: ApiV1BranchesIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<BranchManagementPortalUiGetBranchDetailsResponse>> {
    return apiV1BranchesIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Branch Details.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1BranchesIdGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1BranchesIdGet(params: ApiV1BranchesIdGet$Params, context?: HttpContext): Observable<BranchManagementPortalUiGetBranchDetailsResponse> {
    return this.apiV1BranchesIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<BranchManagementPortalUiGetBranchDetailsResponse>): BranchManagementPortalUiGetBranchDetailsResponse => r.body)
    );
  }

  /** Path part for operation `apiV1BranchesIdPut()` */
  static readonly ApiV1BranchesIdPutPath = '/api/v1/branches/{id}';

  /**
   * Update Branch.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1BranchesIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1BranchesIdPut$Response(params: ApiV1BranchesIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<BranchManagementPortalUiUpdateBranchResponse>> {
    return apiV1BranchesIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Branch.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1BranchesIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1BranchesIdPut(params: ApiV1BranchesIdPut$Params, context?: HttpContext): Observable<BranchManagementPortalUiUpdateBranchResponse> {
    return this.apiV1BranchesIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<BranchManagementPortalUiUpdateBranchResponse>): BranchManagementPortalUiUpdateBranchResponse => r.body)
    );
  }

  /** Path part for operation `apiV1BranchesIdDelete()` */
  static readonly ApiV1BranchesIdDeletePath = '/api/v1/branches/{id}';

  /**
   * Delete Branch.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1BranchesIdDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1BranchesIdDelete$Response(params: ApiV1BranchesIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<BranchManagementPortalUiDeleteBranchResponse>> {
    return apiV1BranchesIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete Branch.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1BranchesIdDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1BranchesIdDelete(params: ApiV1BranchesIdDelete$Params, context?: HttpContext): Observable<BranchManagementPortalUiDeleteBranchResponse> {
    return this.apiV1BranchesIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<BranchManagementPortalUiDeleteBranchResponse>): BranchManagementPortalUiDeleteBranchResponse => r.body)
    );
  }

  /** Path part for operation `apiV1BranchesManagersGet()` */
  static readonly ApiV1BranchesManagersGetPath = '/api/v1/branches/managers';

  /**
   * Get Available Managers.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1BranchesManagersGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1BranchesManagersGet$Response(params: ApiV1BranchesManagersGet$Params, context?: HttpContext): Observable<StrictHttpResponse<BranchManagementPortalUiGetAvailableManagersResponse>> {
    return apiV1BranchesManagersGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Available Managers.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1BranchesManagersGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1BranchesManagersGet(params: ApiV1BranchesManagersGet$Params, context?: HttpContext): Observable<BranchManagementPortalUiGetAvailableManagersResponse> {
    return this.apiV1BranchesManagersGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<BranchManagementPortalUiGetAvailableManagersResponse>): BranchManagementPortalUiGetAvailableManagersResponse => r.body)
    );
  }

}
