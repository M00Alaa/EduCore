/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiV1AcademyAcademyIdBrandingGet } from '../fn/branding/api-v-1-academy-academy-id-branding-get';
import { ApiV1AcademyAcademyIdBrandingGet$Params } from '../fn/branding/api-v-1-academy-academy-id-branding-get';
import { apiV1AcademyAcademyIdBrandingPut } from '../fn/branding/api-v-1-academy-academy-id-branding-put';
import { ApiV1AcademyAcademyIdBrandingPut$Params } from '../fn/branding/api-v-1-academy-academy-id-branding-put';
import { apiV1BrandingColorPalettePost } from '../fn/branding/api-v-1-branding-color-palette-post';
import { ApiV1BrandingColorPalettePost$Params } from '../fn/branding/api-v-1-branding-color-palette-post';
import { BrandingGenerateColorPaletteResponse } from '../models/branding-generate-color-palette-response';
import { BrandingGetBrandingColorsLogoResponse } from '../models/branding-get-branding-colors-logo-response';
import { BrandingUpdateBrandingColorsLogoResponse } from '../models/branding-update-branding-colors-logo-response';

@Injectable({ providedIn: 'root' })
export class BrandingService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiV1AcademyAcademyIdBrandingGet()` */
  static readonly ApiV1AcademyAcademyIdBrandingGetPath = '/api/v1/academy/{academy_id}/branding';

  /**
   * Get Branding (Colors + logo).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AcademyAcademyIdBrandingGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdBrandingGet$Response(params: ApiV1AcademyAcademyIdBrandingGet$Params, context?: HttpContext): Observable<StrictHttpResponse<BrandingGetBrandingColorsLogoResponse>> {
    return apiV1AcademyAcademyIdBrandingGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Branding (Colors + logo).
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AcademyAcademyIdBrandingGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdBrandingGet(params: ApiV1AcademyAcademyIdBrandingGet$Params, context?: HttpContext): Observable<BrandingGetBrandingColorsLogoResponse> {
    return this.apiV1AcademyAcademyIdBrandingGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<BrandingGetBrandingColorsLogoResponse>): BrandingGetBrandingColorsLogoResponse => r.body)
    );
  }

  /** Path part for operation `apiV1AcademyAcademyIdBrandingPut()` */
  static readonly ApiV1AcademyAcademyIdBrandingPutPath = '/api/v1/academy/{academy_id}/branding';

  /**
   * Update Branding (Colors + logo).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AcademyAcademyIdBrandingPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdBrandingPut$Response(params: ApiV1AcademyAcademyIdBrandingPut$Params, context?: HttpContext): Observable<StrictHttpResponse<BrandingUpdateBrandingColorsLogoResponse>> {
    return apiV1AcademyAcademyIdBrandingPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Branding (Colors + logo).
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AcademyAcademyIdBrandingPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdBrandingPut(params: ApiV1AcademyAcademyIdBrandingPut$Params, context?: HttpContext): Observable<BrandingUpdateBrandingColorsLogoResponse> {
    return this.apiV1AcademyAcademyIdBrandingPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<BrandingUpdateBrandingColorsLogoResponse>): BrandingUpdateBrandingColorsLogoResponse => r.body)
    );
  }

  /** Path part for operation `apiV1BrandingColorPalettePost()` */
  static readonly ApiV1BrandingColorPalettePostPath = '/api/v1/branding/color-palette';

  /**
   * Generate Color Palette.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1BrandingColorPalettePost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1BrandingColorPalettePost$Response(params?: ApiV1BrandingColorPalettePost$Params, context?: HttpContext): Observable<StrictHttpResponse<BrandingGenerateColorPaletteResponse>> {
    return apiV1BrandingColorPalettePost(this.http, this.rootUrl, params, context);
  }

  /**
   * Generate Color Palette.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1BrandingColorPalettePost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1BrandingColorPalettePost(params?: ApiV1BrandingColorPalettePost$Params, context?: HttpContext): Observable<BrandingGenerateColorPaletteResponse> {
    return this.apiV1BrandingColorPalettePost$Response(params, context).pipe(
      map((r: StrictHttpResponse<BrandingGenerateColorPaletteResponse>): BrandingGenerateColorPaletteResponse => r.body)
    );
  }

}
