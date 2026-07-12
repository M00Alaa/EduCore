/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiV1SportsSportIdPositionsBulkPost } from '../fn/team-positions/api-v-1-sports-sport-id-positions-bulk-post';
import { ApiV1SportsSportIdPositionsBulkPost$Params } from '../fn/team-positions/api-v-1-sports-sport-id-positions-bulk-post';
import { apiV1SportsSportIdPositionsGet } from '../fn/team-positions/api-v-1-sports-sport-id-positions-get';
import { ApiV1SportsSportIdPositionsGet$Params } from '../fn/team-positions/api-v-1-sports-sport-id-positions-get';
import { apiV1TeamPositionsGet } from '../fn/team-positions/api-v-1-team-positions-get';
import { ApiV1TeamPositionsGet$Params } from '../fn/team-positions/api-v-1-team-positions-get';
import { apiV1TeamPositionsPositionIdDelete } from '../fn/team-positions/api-v-1-team-positions-position-id-delete';
import { ApiV1TeamPositionsPositionIdDelete$Params } from '../fn/team-positions/api-v-1-team-positions-position-id-delete';
import { apiV1TeamPositionsPositionIdGet } from '../fn/team-positions/api-v-1-team-positions-position-id-get';
import { ApiV1TeamPositionsPositionIdGet$Params } from '../fn/team-positions/api-v-1-team-positions-position-id-get';
import { apiV1TeamPositionsPositionIdPut } from '../fn/team-positions/api-v-1-team-positions-position-id-put';
import { ApiV1TeamPositionsPositionIdPut$Params } from '../fn/team-positions/api-v-1-team-positions-position-id-put';
import { apiV1TeamPositionsPositionIdToggleStatusPatch } from '../fn/team-positions/api-v-1-team-positions-position-id-toggle-status-patch';
import { ApiV1TeamPositionsPositionIdToggleStatusPatch$Params } from '../fn/team-positions/api-v-1-team-positions-position-id-toggle-status-patch';
import { apiV1TeamPositionsPost } from '../fn/team-positions/api-v-1-team-positions-post';
import { ApiV1TeamPositionsPost$Params } from '../fn/team-positions/api-v-1-team-positions-post';
import { TeamPositionsBulkCreatePositionsResponse } from '../models/team-positions-bulk-create-positions-response';
import { TeamPositionsCreatePositionResponse } from '../models/team-positions-create-position-response';
import { TeamPositionsDeletePositionResponse } from '../models/team-positions-delete-position-response';
import { TeamPositionsGetActivePositionsOnlyDropdownResponse } from '../models/team-positions-get-active-positions-only-dropdown-response';
import { TeamPositionsGetAllPositionsWithFiltersResponse } from '../models/team-positions-get-all-positions-with-filters-response';
import { TeamPositionsGetSinglePositionResponse } from '../models/team-positions-get-single-position-response';
import { TeamPositionsTogglePositionStatusResponse } from '../models/team-positions-toggle-position-status-response';
import { TeamPositionsUpdatePositionResponse } from '../models/team-positions-update-position-response';

@Injectable({ providedIn: 'root' })
export class TeamPositionsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiV1TeamPositionsGet()` */
  static readonly ApiV1TeamPositionsGetPath = '/api/v1/team-positions';

  /**
   * Get All Positions (with filters).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1TeamPositionsGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1TeamPositionsGet$Response(params: ApiV1TeamPositionsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<TeamPositionsGetAllPositionsWithFiltersResponse>> {
    return apiV1TeamPositionsGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get All Positions (with filters).
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1TeamPositionsGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1TeamPositionsGet(params: ApiV1TeamPositionsGet$Params, context?: HttpContext): Observable<TeamPositionsGetAllPositionsWithFiltersResponse> {
    return this.apiV1TeamPositionsGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<TeamPositionsGetAllPositionsWithFiltersResponse>): TeamPositionsGetAllPositionsWithFiltersResponse => r.body)
    );
  }

  /** Path part for operation `apiV1TeamPositionsPost()` */
  static readonly ApiV1TeamPositionsPostPath = '/api/v1/team-positions';

  /**
   * Create Position.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1TeamPositionsPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1TeamPositionsPost$Response(params?: ApiV1TeamPositionsPost$Params, context?: HttpContext): Observable<StrictHttpResponse<TeamPositionsCreatePositionResponse>> {
    return apiV1TeamPositionsPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Create Position.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1TeamPositionsPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1TeamPositionsPost(params?: ApiV1TeamPositionsPost$Params, context?: HttpContext): Observable<TeamPositionsCreatePositionResponse> {
    return this.apiV1TeamPositionsPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<TeamPositionsCreatePositionResponse>): TeamPositionsCreatePositionResponse => r.body)
    );
  }

  /** Path part for operation `apiV1SportsSportIdPositionsGet()` */
  static readonly ApiV1SportsSportIdPositionsGetPath = '/api/v1/sports/{sport_id}/positions';

  /**
   * Get Active Positions Only (Dropdown).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1SportsSportIdPositionsGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1SportsSportIdPositionsGet$Response(params: ApiV1SportsSportIdPositionsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<TeamPositionsGetActivePositionsOnlyDropdownResponse>> {
    return apiV1SportsSportIdPositionsGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Active Positions Only (Dropdown).
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1SportsSportIdPositionsGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1SportsSportIdPositionsGet(params: ApiV1SportsSportIdPositionsGet$Params, context?: HttpContext): Observable<TeamPositionsGetActivePositionsOnlyDropdownResponse> {
    return this.apiV1SportsSportIdPositionsGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<TeamPositionsGetActivePositionsOnlyDropdownResponse>): TeamPositionsGetActivePositionsOnlyDropdownResponse => r.body)
    );
  }

  /** Path part for operation `apiV1TeamPositionsPositionIdGet()` */
  static readonly ApiV1TeamPositionsPositionIdGetPath = '/api/v1/team-positions/{position_id}';

  /**
   * Get Single Position.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1TeamPositionsPositionIdGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1TeamPositionsPositionIdGet$Response(params: ApiV1TeamPositionsPositionIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<TeamPositionsGetSinglePositionResponse>> {
    return apiV1TeamPositionsPositionIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Single Position.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1TeamPositionsPositionIdGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1TeamPositionsPositionIdGet(params: ApiV1TeamPositionsPositionIdGet$Params, context?: HttpContext): Observable<TeamPositionsGetSinglePositionResponse> {
    return this.apiV1TeamPositionsPositionIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<TeamPositionsGetSinglePositionResponse>): TeamPositionsGetSinglePositionResponse => r.body)
    );
  }

  /** Path part for operation `apiV1TeamPositionsPositionIdPut()` */
  static readonly ApiV1TeamPositionsPositionIdPutPath = '/api/v1/team-positions/{position_id}';

  /**
   * Update Position.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1TeamPositionsPositionIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1TeamPositionsPositionIdPut$Response(params: ApiV1TeamPositionsPositionIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<TeamPositionsUpdatePositionResponse>> {
    return apiV1TeamPositionsPositionIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Position.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1TeamPositionsPositionIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1TeamPositionsPositionIdPut(params: ApiV1TeamPositionsPositionIdPut$Params, context?: HttpContext): Observable<TeamPositionsUpdatePositionResponse> {
    return this.apiV1TeamPositionsPositionIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<TeamPositionsUpdatePositionResponse>): TeamPositionsUpdatePositionResponse => r.body)
    );
  }

  /** Path part for operation `apiV1TeamPositionsPositionIdDelete()` */
  static readonly ApiV1TeamPositionsPositionIdDeletePath = '/api/v1/team-positions/{position_id}';

  /**
   * Delete Position.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1TeamPositionsPositionIdDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1TeamPositionsPositionIdDelete$Response(params: ApiV1TeamPositionsPositionIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<TeamPositionsDeletePositionResponse>> {
    return apiV1TeamPositionsPositionIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete Position.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1TeamPositionsPositionIdDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1TeamPositionsPositionIdDelete(params: ApiV1TeamPositionsPositionIdDelete$Params, context?: HttpContext): Observable<TeamPositionsDeletePositionResponse> {
    return this.apiV1TeamPositionsPositionIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<TeamPositionsDeletePositionResponse>): TeamPositionsDeletePositionResponse => r.body)
    );
  }

  /** Path part for operation `apiV1SportsSportIdPositionsBulkPost()` */
  static readonly ApiV1SportsSportIdPositionsBulkPostPath = '/api/v1/sports/{sport_id}/positions/bulk';

  /**
   * Bulk Create Positions.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1SportsSportIdPositionsBulkPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1SportsSportIdPositionsBulkPost$Response(params: ApiV1SportsSportIdPositionsBulkPost$Params, context?: HttpContext): Observable<StrictHttpResponse<TeamPositionsBulkCreatePositionsResponse>> {
    return apiV1SportsSportIdPositionsBulkPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Bulk Create Positions.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1SportsSportIdPositionsBulkPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1SportsSportIdPositionsBulkPost(params: ApiV1SportsSportIdPositionsBulkPost$Params, context?: HttpContext): Observable<TeamPositionsBulkCreatePositionsResponse> {
    return this.apiV1SportsSportIdPositionsBulkPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<TeamPositionsBulkCreatePositionsResponse>): TeamPositionsBulkCreatePositionsResponse => r.body)
    );
  }

  /** Path part for operation `apiV1TeamPositionsPositionIdToggleStatusPatch()` */
  static readonly ApiV1TeamPositionsPositionIdToggleStatusPatchPath = '/api/v1/team-positions/{position_id}/toggle-status';

  /**
   * Toggle Position Status.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1TeamPositionsPositionIdToggleStatusPatch()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1TeamPositionsPositionIdToggleStatusPatch$Response(params: ApiV1TeamPositionsPositionIdToggleStatusPatch$Params, context?: HttpContext): Observable<StrictHttpResponse<TeamPositionsTogglePositionStatusResponse>> {
    return apiV1TeamPositionsPositionIdToggleStatusPatch(this.http, this.rootUrl, params, context);
  }

  /**
   * Toggle Position Status.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1TeamPositionsPositionIdToggleStatusPatch$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1TeamPositionsPositionIdToggleStatusPatch(params: ApiV1TeamPositionsPositionIdToggleStatusPatch$Params, context?: HttpContext): Observable<TeamPositionsTogglePositionStatusResponse> {
    return this.apiV1TeamPositionsPositionIdToggleStatusPatch$Response(params, context).pipe(
      map((r: StrictHttpResponse<TeamPositionsTogglePositionStatusResponse>): TeamPositionsTogglePositionStatusResponse => r.body)
    );
  }

}
