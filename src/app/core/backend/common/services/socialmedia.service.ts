/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiV1AcademyAcademyIdBrandingSocialLinksGet } from '../fn/socialmedia/api-v-1-academy-academy-id-branding-social-links-get';
import { ApiV1AcademyAcademyIdBrandingSocialLinksGet$Params } from '../fn/socialmedia/api-v-1-academy-academy-id-branding-social-links-get';
import { apiV1AcademyAcademyIdBrandingSocialLinksPut } from '../fn/socialmedia/api-v-1-academy-academy-id-branding-social-links-put';
import { ApiV1AcademyAcademyIdBrandingSocialLinksPut$Params } from '../fn/socialmedia/api-v-1-academy-academy-id-branding-social-links-put';
import { SocialmediaGetBrandingLinksResponse } from '../models/socialmedia-get-branding-links-response';
import { SocialmediaUpdateBrandingLinksResponse } from '../models/socialmedia-update-branding-links-response';

@Injectable({ providedIn: 'root' })
export class SocialmediaService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiV1AcademyAcademyIdBrandingSocialLinksGet()` */
  static readonly ApiV1AcademyAcademyIdBrandingSocialLinksGetPath = '/api/v1/academy/{academy_id}/branding/social-links';

  /**
   * Get Branding (links).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AcademyAcademyIdBrandingSocialLinksGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdBrandingSocialLinksGet$Response(params: ApiV1AcademyAcademyIdBrandingSocialLinksGet$Params, context?: HttpContext): Observable<StrictHttpResponse<SocialmediaGetBrandingLinksResponse>> {
    return apiV1AcademyAcademyIdBrandingSocialLinksGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Branding (links).
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AcademyAcademyIdBrandingSocialLinksGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdBrandingSocialLinksGet(params: ApiV1AcademyAcademyIdBrandingSocialLinksGet$Params, context?: HttpContext): Observable<SocialmediaGetBrandingLinksResponse> {
    return this.apiV1AcademyAcademyIdBrandingSocialLinksGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<SocialmediaGetBrandingLinksResponse>): SocialmediaGetBrandingLinksResponse => r.body)
    );
  }

  /** Path part for operation `apiV1AcademyAcademyIdBrandingSocialLinksPut()` */
  static readonly ApiV1AcademyAcademyIdBrandingSocialLinksPutPath = '/api/v1/academy/{academy_id}/branding/social-links';

  /**
   * Update Branding (links).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AcademyAcademyIdBrandingSocialLinksPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdBrandingSocialLinksPut$Response(params: ApiV1AcademyAcademyIdBrandingSocialLinksPut$Params, context?: HttpContext): Observable<StrictHttpResponse<SocialmediaUpdateBrandingLinksResponse>> {
    return apiV1AcademyAcademyIdBrandingSocialLinksPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Branding (links).
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AcademyAcademyIdBrandingSocialLinksPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdBrandingSocialLinksPut(params: ApiV1AcademyAcademyIdBrandingSocialLinksPut$Params, context?: HttpContext): Observable<SocialmediaUpdateBrandingLinksResponse> {
    return this.apiV1AcademyAcademyIdBrandingSocialLinksPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<SocialmediaUpdateBrandingLinksResponse>): SocialmediaUpdateBrandingLinksResponse => r.body)
    );
  }

}
