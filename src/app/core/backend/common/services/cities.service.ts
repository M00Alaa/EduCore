/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiV1CitiesAllGet } from '../fn/cities/api-v-1-cities-all-get';
import { ApiV1CitiesAllGet$Params } from '../fn/cities/api-v-1-cities-all-get';
import { apiV1CitiesCityIdDistrictsGet } from '../fn/cities/api-v-1-cities-city-id-districts-get';
import { ApiV1CitiesCityIdDistrictsGet$Params } from '../fn/cities/api-v-1-cities-city-id-districts-get';
import { apiV1CitiesGet } from '../fn/cities/api-v-1-cities-get';
import { ApiV1CitiesGet$Params } from '../fn/cities/api-v-1-cities-get';
import { apiV1CitiesIdGet } from '../fn/cities/api-v-1-cities-id-get';
import { ApiV1CitiesIdGet$Params } from '../fn/cities/api-v-1-cities-id-get';
import { CitiesGetAllCitiesNoPaginationResponse } from '../models/cities-get-all-cities-no-pagination-response';
import { CitiesGetAllCitiesPaginatedResponse } from '../models/cities-get-all-cities-paginated-response';
import { CitiesGetCityByIdResponse } from '../models/cities-get-city-by-id-response';
import { CitiesGetCityDistrictsResponse } from '../models/cities-get-city-districts-response';

@Injectable({ providedIn: 'root' })
export class CitiesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiV1CitiesGet()` */
  static readonly ApiV1CitiesGetPath = '/api/v1/cities';

  /**
   * Get All Cities (Paginated).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1CitiesGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1CitiesGet$Response(params: ApiV1CitiesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<CitiesGetAllCitiesPaginatedResponse>> {
    return apiV1CitiesGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get All Cities (Paginated).
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1CitiesGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1CitiesGet(params: ApiV1CitiesGet$Params, context?: HttpContext): Observable<CitiesGetAllCitiesPaginatedResponse> {
    return this.apiV1CitiesGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<CitiesGetAllCitiesPaginatedResponse>): CitiesGetAllCitiesPaginatedResponse => r.body)
    );
  }

  /** Path part for operation `apiV1CitiesAllGet()` */
  static readonly ApiV1CitiesAllGetPath = '/api/v1/cities/all';

  /**
   * Get All Cities (No Pagination).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1CitiesAllGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1CitiesAllGet$Response(params: ApiV1CitiesAllGet$Params, context?: HttpContext): Observable<StrictHttpResponse<CitiesGetAllCitiesNoPaginationResponse>> {
    return apiV1CitiesAllGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get All Cities (No Pagination).
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1CitiesAllGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1CitiesAllGet(params: ApiV1CitiesAllGet$Params, context?: HttpContext): Observable<CitiesGetAllCitiesNoPaginationResponse> {
    return this.apiV1CitiesAllGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<CitiesGetAllCitiesNoPaginationResponse>): CitiesGetAllCitiesNoPaginationResponse => r.body)
    );
  }

  /** Path part for operation `apiV1CitiesIdGet()` */
  static readonly ApiV1CitiesIdGetPath = '/api/v1/cities/{id}';

  /**
   * Get City by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1CitiesIdGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1CitiesIdGet$Response(params: ApiV1CitiesIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<CitiesGetCityByIdResponse>> {
    return apiV1CitiesIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get City by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1CitiesIdGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1CitiesIdGet(params: ApiV1CitiesIdGet$Params, context?: HttpContext): Observable<CitiesGetCityByIdResponse> {
    return this.apiV1CitiesIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<CitiesGetCityByIdResponse>): CitiesGetCityByIdResponse => r.body)
    );
  }

  /** Path part for operation `apiV1CitiesCityIdDistrictsGet()` */
  static readonly ApiV1CitiesCityIdDistrictsGetPath = '/api/v1/cities/{city_id}/districts';

  /**
   * Get City Districts.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1CitiesCityIdDistrictsGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1CitiesCityIdDistrictsGet$Response(params: ApiV1CitiesCityIdDistrictsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<CitiesGetCityDistrictsResponse>> {
    return apiV1CitiesCityIdDistrictsGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get City Districts.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1CitiesCityIdDistrictsGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1CitiesCityIdDistrictsGet(params: ApiV1CitiesCityIdDistrictsGet$Params, context?: HttpContext): Observable<CitiesGetCityDistrictsResponse> {
    return this.apiV1CitiesCityIdDistrictsGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<CitiesGetCityDistrictsResponse>): CitiesGetCityDistrictsResponse => r.body)
    );
  }

}
