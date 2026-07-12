/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiV1AcademyAcademyFinancialSettingsGet } from '../fn/zatca/api-v-1-academy-academy-financial-settings-get';
import { ApiV1AcademyAcademyFinancialSettingsGet$Params } from '../fn/zatca/api-v-1-academy-academy-financial-settings-get';
import { apiV1AcademyAcademyIdReceiptSettingsPut } from '../fn/zatca/api-v-1-academy-academy-id-receipt-settings-put';
import { ApiV1AcademyAcademyIdReceiptSettingsPut$Params } from '../fn/zatca/api-v-1-academy-academy-id-receipt-settings-put';
import { apiV1AcademyAcademyIdZatcaGet } from '../fn/zatca/api-v-1-academy-academy-id-zatca-get';
import { ApiV1AcademyAcademyIdZatcaGet$Params } from '../fn/zatca/api-v-1-academy-academy-id-zatca-get';
import { apiV1AcademyAcademyIdZatcaPut } from '../fn/zatca/api-v-1-academy-academy-id-zatca-put';
import { ApiV1AcademyAcademyIdZatcaPut$Params } from '../fn/zatca/api-v-1-academy-academy-id-zatca-put';
import { apiV1Zatca7B7BaccountId7D7DActivatePost } from '../fn/zatca/api-v-1-zatca-7-b-7-baccount-id-7-d-7-d-activate-post';
import { ApiV1Zatca7B7BaccountId7D7DActivatePost$Params } from '../fn/zatca/api-v-1-zatca-7-b-7-baccount-id-7-d-7-d-activate-post';
import { apiV1Zatca7B7BaccountId7D7DDeactivatePost } from '../fn/zatca/api-v-1-zatca-7-b-7-baccount-id-7-d-7-d-deactivate-post';
import { ApiV1Zatca7B7BaccountId7D7DDeactivatePost$Params } from '../fn/zatca/api-v-1-zatca-7-b-7-baccount-id-7-d-7-d-deactivate-post';
import { apiV1Zatca7B7BaccountId7D7DInvoiceB2BPost } from '../fn/zatca/api-v-1-zatca-7-b-7-baccount-id-7-d-7-d-invoice-b-2-b-post';
import { ApiV1Zatca7B7BaccountId7D7DInvoiceB2BPost$Params } from '../fn/zatca/api-v-1-zatca-7-b-7-baccount-id-7-d-7-d-invoice-b-2-b-post';
import { apiV1Zatca7B7BaccountId7D7DInvoiceB2CPost } from '../fn/zatca/api-v-1-zatca-7-b-7-baccount-id-7-d-7-d-invoice-b-2-c-post';
import { ApiV1Zatca7B7BaccountId7D7DInvoiceB2CPost$Params } from '../fn/zatca/api-v-1-zatca-7-b-7-baccount-id-7-d-7-d-invoice-b-2-c-post';
import type { Zatca21ActivateZatcaIntegrationResponse } from '../models/Zatca_2/1-activate-zatca-integration-response';
import type { Zatca22DeactivateZatcaIntegrationResponse } from '../models/Zatca_2/2-deactivate-zatca-integration-response';
import type { Zatca51SubmitB2BInvoiceStandardTaxInvoiceResponse } from '../models/Zatca_5/1-submit-b-2-b-invoice-standard-tax-invoice-response';
import type { Zatca61SubmitB2CInvoiceSimplifiedTaxInvoiceResponse } from '../models/Zatca_6/1-submit-b-2-c-invoice-simplified-tax-invoice-response';
import { ZatcaCreateUpdateZatcaAccountResponse } from '../models/zatca-create-update-zatca-account-response';
import { ZatcaFinancialSettingsResponse } from '../models/zatca-financial-settings-response';
import { ZatcaGetZatcaAccountResponse } from '../models/zatca-get-zatca-account-response';
import { ZatcaUpdateInvoiceTypesResponse } from '../models/zatca-update-invoice-types-response';
import { zatcaAccountIdInvoiceTypesPut } from '../fn/zatca/zatca-account-id-invoice-types-put';
import { ZatcaAccountIdInvoiceTypesPut$Params } from '../fn/zatca/zatca-account-id-invoice-types-put';

@Injectable({ providedIn: 'root' })
export class ZatcaService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiV1AcademyAcademyIdZatcaGet()` */
  static readonly ApiV1AcademyAcademyIdZatcaGetPath = '/api/v1/academy/{academy_id}/zatca';

  /**
   * Get ZATCA Account.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AcademyAcademyIdZatcaGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdZatcaGet$Response(params: ApiV1AcademyAcademyIdZatcaGet$Params, context?: HttpContext): Observable<StrictHttpResponse<ZatcaGetZatcaAccountResponse>> {
    return apiV1AcademyAcademyIdZatcaGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get ZATCA Account.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AcademyAcademyIdZatcaGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdZatcaGet(params: ApiV1AcademyAcademyIdZatcaGet$Params, context?: HttpContext): Observable<ZatcaGetZatcaAccountResponse> {
    return this.apiV1AcademyAcademyIdZatcaGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<ZatcaGetZatcaAccountResponse>): ZatcaGetZatcaAccountResponse => r.body)
    );
  }

  /** Path part for operation `apiV1AcademyAcademyIdZatcaPut()` */
  static readonly ApiV1AcademyAcademyIdZatcaPutPath = '/api/v1/academy/{academy_id}/zatca';

  /**
   * Create/Update ZATCA Account.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AcademyAcademyIdZatcaPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdZatcaPut$Response(params: ApiV1AcademyAcademyIdZatcaPut$Params, context?: HttpContext): Observable<StrictHttpResponse<ZatcaCreateUpdateZatcaAccountResponse>> {
    return apiV1AcademyAcademyIdZatcaPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Create/Update ZATCA Account.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AcademyAcademyIdZatcaPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdZatcaPut(params: ApiV1AcademyAcademyIdZatcaPut$Params, context?: HttpContext): Observable<ZatcaCreateUpdateZatcaAccountResponse> {
    return this.apiV1AcademyAcademyIdZatcaPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<ZatcaCreateUpdateZatcaAccountResponse>): ZatcaCreateUpdateZatcaAccountResponse => r.body)
    );
  }

  /** Path part for operation `zatcaAccountIdInvoiceTypesPut()` */
  static readonly ZatcaAccountIdInvoiceTypesPutPath = '/zatca/{account_id}/invoice-types';

  /**
   * Update Invoice Types.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `zatcaAccountIdInvoiceTypesPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  zatcaAccountIdInvoiceTypesPut$Response(params: ZatcaAccountIdInvoiceTypesPut$Params, context?: HttpContext): Observable<StrictHttpResponse<ZatcaUpdateInvoiceTypesResponse>> {
    return zatcaAccountIdInvoiceTypesPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Invoice Types.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `zatcaAccountIdInvoiceTypesPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  zatcaAccountIdInvoiceTypesPut(params: ZatcaAccountIdInvoiceTypesPut$Params, context?: HttpContext): Observable<ZatcaUpdateInvoiceTypesResponse> {
    return this.zatcaAccountIdInvoiceTypesPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<ZatcaUpdateInvoiceTypesResponse>): ZatcaUpdateInvoiceTypesResponse => r.body)
    );
  }

  /** Path part for operation `apiV1AcademyAcademyFinancialSettingsGet()` */
  static readonly ApiV1AcademyAcademyFinancialSettingsGetPath = '/api/v1/academy/{academy}/financial-settings';

  /**
   * financial-settings.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AcademyAcademyFinancialSettingsGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyFinancialSettingsGet$Response(params: ApiV1AcademyAcademyFinancialSettingsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<ZatcaFinancialSettingsResponse>> {
    return apiV1AcademyAcademyFinancialSettingsGet(this.http, this.rootUrl, params, context);
  }

  /**
   * financial-settings.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AcademyAcademyFinancialSettingsGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyFinancialSettingsGet(params: ApiV1AcademyAcademyFinancialSettingsGet$Params, context?: HttpContext): Observable<ZatcaFinancialSettingsResponse> {
    return this.apiV1AcademyAcademyFinancialSettingsGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<ZatcaFinancialSettingsResponse>): ZatcaFinancialSettingsResponse => r.body)
    );
  }

  /** Path part for operation `apiV1AcademyAcademyIdReceiptSettingsPut()` */
  static readonly ApiV1AcademyAcademyIdReceiptSettingsPutPath = '/api/v1/academy/{academy_id}/receipt-settings';

  /**
   * financial-settings.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AcademyAcademyIdReceiptSettingsPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdReceiptSettingsPut$Response(params: ApiV1AcademyAcademyIdReceiptSettingsPut$Params, context?: HttpContext): Observable<StrictHttpResponse<ZatcaFinancialSettingsResponse>> {
    return apiV1AcademyAcademyIdReceiptSettingsPut(this.http, this.rootUrl, params, context);
  }

  /**
   * financial-settings.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AcademyAcademyIdReceiptSettingsPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdReceiptSettingsPut(params: ApiV1AcademyAcademyIdReceiptSettingsPut$Params, context?: HttpContext): Observable<ZatcaFinancialSettingsResponse> {
    return this.apiV1AcademyAcademyIdReceiptSettingsPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<ZatcaFinancialSettingsResponse>): ZatcaFinancialSettingsResponse => r.body)
    );
  }

  /** Path part for operation `apiV1Zatca7B7BaccountId7D7DActivatePost()` */
  static readonly ApiV1Zatca7B7BaccountId7D7DActivatePostPath = '/api/v1/zatca/%7B%7Baccount_id%7D%7D/activate';

  /**
   * 2.1 Activate ZATCA Integration.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1Zatca7B7BaccountId7D7DActivatePost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1Zatca7B7BaccountId7D7DActivatePost$Response(params?: ApiV1Zatca7B7BaccountId7D7DActivatePost$Params, context?: HttpContext): Observable<StrictHttpResponse<Zatca21ActivateZatcaIntegrationResponse>> {
    return apiV1Zatca7B7BaccountId7D7DActivatePost(this.http, this.rootUrl, params, context);
  }

  /**
   * 2.1 Activate ZATCA Integration.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1Zatca7B7BaccountId7D7DActivatePost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1Zatca7B7BaccountId7D7DActivatePost(params?: ApiV1Zatca7B7BaccountId7D7DActivatePost$Params, context?: HttpContext): Observable<Zatca21ActivateZatcaIntegrationResponse> {
    return this.apiV1Zatca7B7BaccountId7D7DActivatePost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Zatca21ActivateZatcaIntegrationResponse>): Zatca21ActivateZatcaIntegrationResponse => r.body)
    );
  }

  /** Path part for operation `apiV1Zatca7B7BaccountId7D7DDeactivatePost()` */
  static readonly ApiV1Zatca7B7BaccountId7D7DDeactivatePostPath = '/api/v1/zatca/%7B%7Baccount_id%7D%7D/deactivate';

  /**
   * 2.2 Deactivate ZATCA Integration.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1Zatca7B7BaccountId7D7DDeactivatePost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1Zatca7B7BaccountId7D7DDeactivatePost$Response(params?: ApiV1Zatca7B7BaccountId7D7DDeactivatePost$Params, context?: HttpContext): Observable<StrictHttpResponse<Zatca22DeactivateZatcaIntegrationResponse>> {
    return apiV1Zatca7B7BaccountId7D7DDeactivatePost(this.http, this.rootUrl, params, context);
  }

  /**
   * 2.2 Deactivate ZATCA Integration.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1Zatca7B7BaccountId7D7DDeactivatePost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1Zatca7B7BaccountId7D7DDeactivatePost(params?: ApiV1Zatca7B7BaccountId7D7DDeactivatePost$Params, context?: HttpContext): Observable<Zatca22DeactivateZatcaIntegrationResponse> {
    return this.apiV1Zatca7B7BaccountId7D7DDeactivatePost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Zatca22DeactivateZatcaIntegrationResponse>): Zatca22DeactivateZatcaIntegrationResponse => r.body)
    );
  }

  /** Path part for operation `apiV1Zatca7B7BaccountId7D7DInvoiceB2BPost()` */
  static readonly ApiV1Zatca7B7BaccountId7D7DInvoiceB2BPostPath = '/api/v1/zatca/%7B%7Baccount_id%7D%7D/invoice/b2b';

  /**
   * 5.1 Submit B2B Invoice (Standard Tax Invoice).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1Zatca7B7BaccountId7D7DInvoiceB2BPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1Zatca7B7BaccountId7D7DInvoiceB2BPost$Response(params?: ApiV1Zatca7B7BaccountId7D7DInvoiceB2BPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Zatca51SubmitB2BInvoiceStandardTaxInvoiceResponse>> {
    return apiV1Zatca7B7BaccountId7D7DInvoiceB2BPost(this.http, this.rootUrl, params, context);
  }

  /**
   * 5.1 Submit B2B Invoice (Standard Tax Invoice).
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1Zatca7B7BaccountId7D7DInvoiceB2BPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1Zatca7B7BaccountId7D7DInvoiceB2BPost(params?: ApiV1Zatca7B7BaccountId7D7DInvoiceB2BPost$Params, context?: HttpContext): Observable<Zatca51SubmitB2BInvoiceStandardTaxInvoiceResponse> {
    return this.apiV1Zatca7B7BaccountId7D7DInvoiceB2BPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Zatca51SubmitB2BInvoiceStandardTaxInvoiceResponse>): Zatca51SubmitB2BInvoiceStandardTaxInvoiceResponse => r.body)
    );
  }

  /** Path part for operation `apiV1Zatca7B7BaccountId7D7DInvoiceB2CPost()` */
  static readonly ApiV1Zatca7B7BaccountId7D7DInvoiceB2CPostPath = '/api/v1/zatca/%7B%7Baccount_id%7D%7D/invoice/b2c';

  /**
   * 6.1 Submit B2C Invoice (Simplified Tax Invoice).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1Zatca7B7BaccountId7D7DInvoiceB2CPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1Zatca7B7BaccountId7D7DInvoiceB2CPost$Response(params?: ApiV1Zatca7B7BaccountId7D7DInvoiceB2CPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Zatca61SubmitB2CInvoiceSimplifiedTaxInvoiceResponse>> {
    return apiV1Zatca7B7BaccountId7D7DInvoiceB2CPost(this.http, this.rootUrl, params, context);
  }

  /**
   * 6.1 Submit B2C Invoice (Simplified Tax Invoice).
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1Zatca7B7BaccountId7D7DInvoiceB2CPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1Zatca7B7BaccountId7D7DInvoiceB2CPost(params?: ApiV1Zatca7B7BaccountId7D7DInvoiceB2CPost$Params, context?: HttpContext): Observable<Zatca61SubmitB2CInvoiceSimplifiedTaxInvoiceResponse> {
    return this.apiV1Zatca7B7BaccountId7D7DInvoiceB2CPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Zatca61SubmitB2CInvoiceSimplifiedTaxInvoiceResponse>): Zatca61SubmitB2CInvoiceSimplifiedTaxInvoiceResponse => r.body)
    );
  }

}
