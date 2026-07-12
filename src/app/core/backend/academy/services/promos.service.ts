/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiV1AcademyAcademyIdPromosActiveGet } from '../fn/promos/api-v-1-academy-academy-id-promos-active-get';
import { ApiV1AcademyAcademyIdPromosActiveGet$Params } from '../fn/promos/api-v-1-academy-academy-id-promos-active-get';
import { apiV1AcademyAcademyIdPromosByScopeGet } from '../fn/promos/api-v-1-academy-academy-id-promos-by-scope-get';
import { ApiV1AcademyAcademyIdPromosByScopeGet$Params } from '../fn/promos/api-v-1-academy-academy-id-promos-by-scope-get';
import { apiV1AcademyAcademyIdPromosGenerateCodePost } from '../fn/promos/api-v-1-academy-academy-id-promos-generate-code-post';
import { ApiV1AcademyAcademyIdPromosGenerateCodePost$Params } from '../fn/promos/api-v-1-academy-academy-id-promos-generate-code-post';
import { apiV1AcademyAcademyIdPromosGet } from '../fn/promos/api-v-1-academy-academy-id-promos-get';
import { ApiV1AcademyAcademyIdPromosGet$Params } from '../fn/promos/api-v-1-academy-academy-id-promos-get';
import { apiV1AcademyAcademyIdPromosInactiveGet } from '../fn/promos/api-v-1-academy-academy-id-promos-inactive-get';
import { ApiV1AcademyAcademyIdPromosInactiveGet$Params } from '../fn/promos/api-v-1-academy-academy-id-promos-inactive-get';
import { apiV1AcademyAcademyIdPromosPost } from '../fn/promos/api-v-1-academy-academy-id-promos-post';
import { ApiV1AcademyAcademyIdPromosPost$Params } from '../fn/promos/api-v-1-academy-academy-id-promos-post';
import { apiV1AcademyAcademyIdPromosValidateCodePost } from '../fn/promos/api-v-1-academy-academy-id-promos-validate-code-post';
import { ApiV1AcademyAcademyIdPromosValidateCodePost$Params } from '../fn/promos/api-v-1-academy-academy-id-promos-validate-code-post';
import { apiV1PromosPromoIdDelete } from '../fn/promos/api-v-1-promos-promo-id-delete';
import { ApiV1PromosPromoIdDelete$Params } from '../fn/promos/api-v-1-promos-promo-id-delete';
import { apiV1PromosPromoIdGet } from '../fn/promos/api-v-1-promos-promo-id-get';
import { ApiV1PromosPromoIdGet$Params } from '../fn/promos/api-v-1-promos-promo-id-get';
import { apiV1PromosPromoIdPut } from '../fn/promos/api-v-1-promos-promo-id-put';
import { ApiV1PromosPromoIdPut$Params } from '../fn/promos/api-v-1-promos-promo-id-put';
import { apiV1PromosPromoIdToggleStatusPatch } from '../fn/promos/api-v-1-promos-promo-id-toggle-status-patch';
import { ApiV1PromosPromoIdToggleStatusPatch$Params } from '../fn/promos/api-v-1-promos-promo-id-toggle-status-patch';
import { apiV1PromosScopeOptionsGet } from '../fn/promos/api-v-1-promos-scope-options-get';
import { ApiV1PromosScopeOptionsGet$Params } from '../fn/promos/api-v-1-promos-scope-options-get';
import { Promos02ScopeOptionsResponse } from '../models/promos-02-scope-options-response';
import { Promos03GenerateDiscountCodeResponse } from '../models/promos-03-generate-discount-code-response';
import { Promos04CreatePromoResponse } from '../models/promos-04-create-promo-response';
import { Promos05ShowPromoResponse } from '../models/promos-05-show-promo-response';
import { Promos06UpdatePromoResponse } from '../models/promos-06-update-promo-response';
import { Promos07IndexPromosResponse } from '../models/promos-07-index-promos-response';
import { Promos08ActivePromosResponse } from '../models/promos-08-active-promos-response';
import { Promos10InactivePromosResponse } from '../models/promos-10-inactive-promos-response';
import { Promos11ToggleStatusBackToActiveResponse } from '../models/promos-11-toggle-status-back-to-active-response';
import { Promos12ValidatePromoCodeResponse } from '../models/promos-12-validate-promo-code-response';
import { Promos13PromosByScopeResponse } from '../models/promos-13-promos-by-scope-response';
import { Promos14DeletePromoResponse } from '../models/promos-14-delete-promo-response';

@Injectable({ providedIn: 'root' })
export class PromosService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiV1PromosScopeOptionsGet()` */
  static readonly ApiV1PromosScopeOptionsGetPath = '/api/v1/promos/scope-options';

  /**
   * 02 - Scope Options.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1PromosScopeOptionsGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1PromosScopeOptionsGet$Response(params?: ApiV1PromosScopeOptionsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Promos02ScopeOptionsResponse>> {
    return apiV1PromosScopeOptionsGet(this.http, this.rootUrl, params, context);
  }

  /**
   * 02 - Scope Options.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1PromosScopeOptionsGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1PromosScopeOptionsGet(params?: ApiV1PromosScopeOptionsGet$Params, context?: HttpContext): Observable<Promos02ScopeOptionsResponse> {
    return this.apiV1PromosScopeOptionsGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Promos02ScopeOptionsResponse>): Promos02ScopeOptionsResponse => r.body)
    );
  }

  /** Path part for operation `apiV1AcademyAcademyIdPromosGenerateCodePost()` */
  static readonly ApiV1AcademyAcademyIdPromosGenerateCodePostPath = '/api/v1/academy/{academy_id}/promos/generate-code';

  /**
   * 03 - Generate Discount Code.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AcademyAcademyIdPromosGenerateCodePost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdPromosGenerateCodePost$Response(params: ApiV1AcademyAcademyIdPromosGenerateCodePost$Params, context?: HttpContext): Observable<StrictHttpResponse<Promos03GenerateDiscountCodeResponse>> {
    return apiV1AcademyAcademyIdPromosGenerateCodePost(this.http, this.rootUrl, params, context);
  }

  /**
   * 03 - Generate Discount Code.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AcademyAcademyIdPromosGenerateCodePost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdPromosGenerateCodePost(params: ApiV1AcademyAcademyIdPromosGenerateCodePost$Params, context?: HttpContext): Observable<Promos03GenerateDiscountCodeResponse> {
    return this.apiV1AcademyAcademyIdPromosGenerateCodePost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Promos03GenerateDiscountCodeResponse>): Promos03GenerateDiscountCodeResponse => r.body)
    );
  }

  /** Path part for operation `apiV1AcademyAcademyIdPromosGet()` */
  static readonly ApiV1AcademyAcademyIdPromosGetPath = '/api/v1/academy/{academy_id}/promos';

  /**
   * 07 - Index Promos.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AcademyAcademyIdPromosGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdPromosGet$Response(params: ApiV1AcademyAcademyIdPromosGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Promos07IndexPromosResponse>> {
    return apiV1AcademyAcademyIdPromosGet(this.http, this.rootUrl, params, context);
  }

  /**
   * 07 - Index Promos.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AcademyAcademyIdPromosGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdPromosGet(params: ApiV1AcademyAcademyIdPromosGet$Params, context?: HttpContext): Observable<Promos07IndexPromosResponse> {
    return this.apiV1AcademyAcademyIdPromosGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Promos07IndexPromosResponse>): Promos07IndexPromosResponse => r.body)
    );
  }

  /** Path part for operation `apiV1AcademyAcademyIdPromosPost()` */
  static readonly ApiV1AcademyAcademyIdPromosPostPath = '/api/v1/academy/{academy_id}/promos';

  /**
   * 04 - Create Promo.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AcademyAcademyIdPromosPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdPromosPost$Response(params: ApiV1AcademyAcademyIdPromosPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Promos04CreatePromoResponse>> {
    return apiV1AcademyAcademyIdPromosPost(this.http, this.rootUrl, params, context);
  }

  /**
   * 04 - Create Promo.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AcademyAcademyIdPromosPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdPromosPost(params: ApiV1AcademyAcademyIdPromosPost$Params, context?: HttpContext): Observable<Promos04CreatePromoResponse> {
    return this.apiV1AcademyAcademyIdPromosPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Promos04CreatePromoResponse>): Promos04CreatePromoResponse => r.body)
    );
  }

  /** Path part for operation `apiV1PromosPromoIdGet()` */
  static readonly ApiV1PromosPromoIdGetPath = '/api/v1/promos/{promo_id}';

  /**
   * 05 - Show Promo.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1PromosPromoIdGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1PromosPromoIdGet$Response(params: ApiV1PromosPromoIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Promos05ShowPromoResponse>> {
    return apiV1PromosPromoIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * 05 - Show Promo.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1PromosPromoIdGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1PromosPromoIdGet(params: ApiV1PromosPromoIdGet$Params, context?: HttpContext): Observable<Promos05ShowPromoResponse> {
    return this.apiV1PromosPromoIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Promos05ShowPromoResponse>): Promos05ShowPromoResponse => r.body)
    );
  }

  /** Path part for operation `apiV1PromosPromoIdPut()` */
  static readonly ApiV1PromosPromoIdPutPath = '/api/v1/promos/{promo_id}';

  /**
   * 06 - Update Promo.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1PromosPromoIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1PromosPromoIdPut$Response(params: ApiV1PromosPromoIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<Promos06UpdatePromoResponse>> {
    return apiV1PromosPromoIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * 06 - Update Promo.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1PromosPromoIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1PromosPromoIdPut(params: ApiV1PromosPromoIdPut$Params, context?: HttpContext): Observable<Promos06UpdatePromoResponse> {
    return this.apiV1PromosPromoIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<Promos06UpdatePromoResponse>): Promos06UpdatePromoResponse => r.body)
    );
  }

  /** Path part for operation `apiV1PromosPromoIdDelete()` */
  static readonly ApiV1PromosPromoIdDeletePath = '/api/v1/promos/{promo_id}';

  /**
   * 14 - Delete Promo.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1PromosPromoIdDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1PromosPromoIdDelete$Response(params: ApiV1PromosPromoIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<Promos14DeletePromoResponse>> {
    return apiV1PromosPromoIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * 14 - Delete Promo.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1PromosPromoIdDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1PromosPromoIdDelete(params: ApiV1PromosPromoIdDelete$Params, context?: HttpContext): Observable<Promos14DeletePromoResponse> {
    return this.apiV1PromosPromoIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<Promos14DeletePromoResponse>): Promos14DeletePromoResponse => r.body)
    );
  }

  /** Path part for operation `apiV1AcademyAcademyIdPromosActiveGet()` */
  static readonly ApiV1AcademyAcademyIdPromosActiveGetPath = '/api/v1/academy/{academy_id}/promos/active';

  /**
   * 08 - Active Promos.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AcademyAcademyIdPromosActiveGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdPromosActiveGet$Response(params: ApiV1AcademyAcademyIdPromosActiveGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Promos08ActivePromosResponse>> {
    return apiV1AcademyAcademyIdPromosActiveGet(this.http, this.rootUrl, params, context);
  }

  /**
   * 08 - Active Promos.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AcademyAcademyIdPromosActiveGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdPromosActiveGet(params: ApiV1AcademyAcademyIdPromosActiveGet$Params, context?: HttpContext): Observable<Promos08ActivePromosResponse> {
    return this.apiV1AcademyAcademyIdPromosActiveGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Promos08ActivePromosResponse>): Promos08ActivePromosResponse => r.body)
    );
  }

  /** Path part for operation `apiV1PromosPromoIdToggleStatusPatch()` */
  static readonly ApiV1PromosPromoIdToggleStatusPatchPath = '/api/v1/promos/{promo_id}/toggle-status';

  /**
   * 11 - Toggle Status Back To Active.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1PromosPromoIdToggleStatusPatch()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1PromosPromoIdToggleStatusPatch$Response(params: ApiV1PromosPromoIdToggleStatusPatch$Params, context?: HttpContext): Observable<StrictHttpResponse<Promos11ToggleStatusBackToActiveResponse>> {
    return apiV1PromosPromoIdToggleStatusPatch(this.http, this.rootUrl, params, context);
  }

  /**
   * 11 - Toggle Status Back To Active.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1PromosPromoIdToggleStatusPatch$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1PromosPromoIdToggleStatusPatch(params: ApiV1PromosPromoIdToggleStatusPatch$Params, context?: HttpContext): Observable<Promos11ToggleStatusBackToActiveResponse> {
    return this.apiV1PromosPromoIdToggleStatusPatch$Response(params, context).pipe(
      map((r: StrictHttpResponse<Promos11ToggleStatusBackToActiveResponse>): Promos11ToggleStatusBackToActiveResponse => r.body)
    );
  }

  /** Path part for operation `apiV1AcademyAcademyIdPromosInactiveGet()` */
  static readonly ApiV1AcademyAcademyIdPromosInactiveGetPath = '/api/v1/academy/{academy_id}/promos/inactive';

  /**
   * 10 - Inactive Promos.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AcademyAcademyIdPromosInactiveGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdPromosInactiveGet$Response(params: ApiV1AcademyAcademyIdPromosInactiveGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Promos10InactivePromosResponse>> {
    return apiV1AcademyAcademyIdPromosInactiveGet(this.http, this.rootUrl, params, context);
  }

  /**
   * 10 - Inactive Promos.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AcademyAcademyIdPromosInactiveGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdPromosInactiveGet(params: ApiV1AcademyAcademyIdPromosInactiveGet$Params, context?: HttpContext): Observable<Promos10InactivePromosResponse> {
    return this.apiV1AcademyAcademyIdPromosInactiveGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Promos10InactivePromosResponse>): Promos10InactivePromosResponse => r.body)
    );
  }

  /** Path part for operation `apiV1AcademyAcademyIdPromosValidateCodePost()` */
  static readonly ApiV1AcademyAcademyIdPromosValidateCodePostPath = '/api/v1/academy/{academy_id}/promos/validate-code';

  /**
   * 12 - Validate Promo Code.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AcademyAcademyIdPromosValidateCodePost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdPromosValidateCodePost$Response(params: ApiV1AcademyAcademyIdPromosValidateCodePost$Params, context?: HttpContext): Observable<StrictHttpResponse<Promos12ValidatePromoCodeResponse>> {
    return apiV1AcademyAcademyIdPromosValidateCodePost(this.http, this.rootUrl, params, context);
  }

  /**
   * 12 - Validate Promo Code.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AcademyAcademyIdPromosValidateCodePost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdPromosValidateCodePost(params: ApiV1AcademyAcademyIdPromosValidateCodePost$Params, context?: HttpContext): Observable<Promos12ValidatePromoCodeResponse> {
    return this.apiV1AcademyAcademyIdPromosValidateCodePost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Promos12ValidatePromoCodeResponse>): Promos12ValidatePromoCodeResponse => r.body)
    );
  }

  /** Path part for operation `apiV1AcademyAcademyIdPromosByScopeGet()` */
  static readonly ApiV1AcademyAcademyIdPromosByScopeGetPath = '/api/v1/academy/{academy_id}/promos/by-scope';

  /**
   * 13 - Promos By Scope.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AcademyAcademyIdPromosByScopeGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdPromosByScopeGet$Response(params: ApiV1AcademyAcademyIdPromosByScopeGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Promos13PromosByScopeResponse>> {
    return apiV1AcademyAcademyIdPromosByScopeGet(this.http, this.rootUrl, params, context);
  }

  /**
   * 13 - Promos By Scope.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AcademyAcademyIdPromosByScopeGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdPromosByScopeGet(params: ApiV1AcademyAcademyIdPromosByScopeGet$Params, context?: HttpContext): Observable<Promos13PromosByScopeResponse> {
    return this.apiV1AcademyAcademyIdPromosByScopeGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Promos13PromosByScopeResponse>): Promos13PromosByScopeResponse => r.body)
    );
  }

}
