/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiV1Districts1Get } from '../fn/districts/api-v-1-districts-1-get';
import { ApiV1Districts1Get$Params } from '../fn/districts/api-v-1-districts-1-get';
import { apiV1DistrictsAllGet } from '../fn/districts/api-v-1-districts-all-get';
import { ApiV1DistrictsAllGet$Params } from '../fn/districts/api-v-1-districts-all-get';
import { apiV1DistrictsGet } from '../fn/districts/api-v-1-districts-get';
import { ApiV1DistrictsGet$Params } from '../fn/districts/api-v-1-districts-get';
import { DistrictsGetAllDistrictsNoPaginationResponse } from '../models/districts-get-all-districts-no-pagination-response';
import { DistrictsGetAllDistrictsPaginatedResponse } from '../models/districts-get-all-districts-paginated-response';
import { DistrictsGetDistrictByIdResponse } from '../models/districts-get-district-by-id-response';

@Injectable({ providedIn: 'root' })
export class DistrictsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiV1DistrictsGet()` */
  static readonly ApiV1DistrictsGetPath = '/api/v1/districts';

  /**
   * Get All Districts (Paginated).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1DistrictsGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1DistrictsGet$Response(params: ApiV1DistrictsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<DistrictsGetAllDistrictsPaginatedResponse>> {
    return apiV1DistrictsGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get All Districts (Paginated).
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1DistrictsGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1DistrictsGet(params: ApiV1DistrictsGet$Params, context?: HttpContext): Observable<DistrictsGetAllDistrictsPaginatedResponse> {
    return this.apiV1DistrictsGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<DistrictsGetAllDistrictsPaginatedResponse>): DistrictsGetAllDistrictsPaginatedResponse => r.body)
    );
  }

  /** Path part for operation `apiV1DistrictsAllGet()` */
  static readonly ApiV1DistrictsAllGetPath = '/api/v1/districts/all';

  /**
   * Get All Districts (No Pagination).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1DistrictsAllGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1DistrictsAllGet$Response(params: ApiV1DistrictsAllGet$Params, context?: HttpContext): Observable<StrictHttpResponse<DistrictsGetAllDistrictsNoPaginationResponse>> {
    return apiV1DistrictsAllGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get All Districts (No Pagination).
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1DistrictsAllGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1DistrictsAllGet(params: ApiV1DistrictsAllGet$Params, context?: HttpContext): Observable<DistrictsGetAllDistrictsNoPaginationResponse> {
    return this.apiV1DistrictsAllGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<DistrictsGetAllDistrictsNoPaginationResponse>): DistrictsGetAllDistrictsNoPaginationResponse => r.body)
    );
  }

  /** Path part for operation `apiV1Districts1Get()` */
  static readonly ApiV1Districts1GetPath = '/api/v1/districts/1';

  /**
   * Get District by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1Districts1Get()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1Districts1Get$Response(params?: ApiV1Districts1Get$Params, context?: HttpContext): Observable<StrictHttpResponse<DistrictsGetDistrictByIdResponse>> {
    return apiV1Districts1Get(this.http, this.rootUrl, params, context);
  }

  /**
   * Get District by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1Districts1Get$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1Districts1Get(params?: ApiV1Districts1Get$Params, context?: HttpContext): Observable<DistrictsGetDistrictByIdResponse> {
    return this.apiV1Districts1Get$Response(params, context).pipe(
      map((r: StrictHttpResponse<DistrictsGetDistrictByIdResponse>): DistrictsGetDistrictByIdResponse => r.body)
    );
  }

}
