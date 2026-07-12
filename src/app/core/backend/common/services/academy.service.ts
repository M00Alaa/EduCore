/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { AcademyGetAcademySettingsResponse } from '../models/academy-get-academy-settings-response';
import { AcademyUpdateAcademySettingsResponse } from '../models/academy-update-academy-settings-response';
import { apiV1AcademyAcademyIdSettingsGet } from '../fn/academy/api-v-1-academy-academy-id-settings-get';
import { ApiV1AcademyAcademyIdSettingsGet$Params } from '../fn/academy/api-v-1-academy-academy-id-settings-get';
import { apiV1AcademyAcademyIdSettingsPut } from '../fn/academy/api-v-1-academy-academy-id-settings-put';
import { ApiV1AcademyAcademyIdSettingsPut$Params } from '../fn/academy/api-v-1-academy-academy-id-settings-put';

@Injectable({ providedIn: 'root' })
export class AcademyService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiV1AcademyAcademyIdSettingsGet()` */
  static readonly ApiV1AcademyAcademyIdSettingsGetPath = '/api/v1/academy/{academy_id}/settings';

  /**
   * Get Academy Settings.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AcademyAcademyIdSettingsGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdSettingsGet$Response(params: ApiV1AcademyAcademyIdSettingsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<AcademyGetAcademySettingsResponse>> {
    return apiV1AcademyAcademyIdSettingsGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Academy Settings.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AcademyAcademyIdSettingsGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdSettingsGet(params: ApiV1AcademyAcademyIdSettingsGet$Params, context?: HttpContext): Observable<AcademyGetAcademySettingsResponse> {
    return this.apiV1AcademyAcademyIdSettingsGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<AcademyGetAcademySettingsResponse>): AcademyGetAcademySettingsResponse => r.body)
    );
  }

  /** Path part for operation `apiV1AcademyAcademyIdSettingsPut()` */
  static readonly ApiV1AcademyAcademyIdSettingsPutPath = '/api/v1/academy/{academy_id}/settings';

  /**
   * Update Academy Settings.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AcademyAcademyIdSettingsPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdSettingsPut$Response(params: ApiV1AcademyAcademyIdSettingsPut$Params, context?: HttpContext): Observable<StrictHttpResponse<AcademyUpdateAcademySettingsResponse>> {
    return apiV1AcademyAcademyIdSettingsPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Academy Settings.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AcademyAcademyIdSettingsPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdSettingsPut(params: ApiV1AcademyAcademyIdSettingsPut$Params, context?: HttpContext): Observable<AcademyUpdateAcademySettingsResponse> {
    return this.apiV1AcademyAcademyIdSettingsPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<AcademyUpdateAcademySettingsResponse>): AcademyUpdateAcademySettingsResponse => r.body)
    );
  }

}
