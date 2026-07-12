/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiV1InvoicesExportGet } from '../fn/invoices-api-vult/api-v-1-invoices-export-get';
import { ApiV1InvoicesExportGet$Params } from '../fn/invoices-api-vult/api-v-1-invoices-export-get';
import { apiV1InvoicesGet } from '../fn/invoices-api-vult/api-v-1-invoices-get';
import { ApiV1InvoicesGet$Params } from '../fn/invoices-api-vult/api-v-1-invoices-get';
import { apiV1InvoicesIdGet } from '../fn/invoices-api-vult/api-v-1-invoices-id-get';
import { ApiV1InvoicesIdGet$Params } from '../fn/invoices-api-vult/api-v-1-invoices-id-get';
import { apiV1InvoicesStatisticsGet } from '../fn/invoices-api-vult/api-v-1-invoices-statistics-get';
import { ApiV1InvoicesStatisticsGet$Params } from '../fn/invoices-api-vult/api-v-1-invoices-statistics-get';
import { InvoicesApiVultExportInvoicesResponse } from '../models/invoices-api-vult-export-invoices-response';
import { InvoicesApiVultInvoiceStatisticsResponse } from '../models/invoices-api-vult-invoice-statistics-response';
import { InvoicesApiVultListInvoicesResponse } from '../models/invoices-api-vult-list-invoices-response';
import { InvoicesApiVultShowInvoiceResponse } from '../models/invoices-api-vult-show-invoice-response';

@Injectable({ providedIn: 'root' })
export class InvoicesApiVultService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiV1InvoicesGet()` */
  static readonly ApiV1InvoicesGetPath = '/api/v1/invoices';

  /**
   * List Invoices.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1InvoicesGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1InvoicesGet$Response(params: ApiV1InvoicesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<InvoicesApiVultListInvoicesResponse>> {
    return apiV1InvoicesGet(this.http, this.rootUrl, params, context);
  }

  /**
   * List Invoices.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1InvoicesGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1InvoicesGet(params: ApiV1InvoicesGet$Params, context?: HttpContext): Observable<InvoicesApiVultListInvoicesResponse> {
    return this.apiV1InvoicesGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<InvoicesApiVultListInvoicesResponse>): InvoicesApiVultListInvoicesResponse => r.body)
    );
  }

  /** Path part for operation `apiV1InvoicesIdGet()` */
  static readonly ApiV1InvoicesIdGetPath = '/api/v1/invoices/{id}';

  /**
   * Show Invoice.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1InvoicesIdGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1InvoicesIdGet$Response(params: ApiV1InvoicesIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<InvoicesApiVultShowInvoiceResponse>> {
    return apiV1InvoicesIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Show Invoice.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1InvoicesIdGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1InvoicesIdGet(params: ApiV1InvoicesIdGet$Params, context?: HttpContext): Observable<InvoicesApiVultShowInvoiceResponse> {
    return this.apiV1InvoicesIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<InvoicesApiVultShowInvoiceResponse>): InvoicesApiVultShowInvoiceResponse => r.body)
    );
  }

  /** Path part for operation `apiV1InvoicesStatisticsGet()` */
  static readonly ApiV1InvoicesStatisticsGetPath = '/api/v1/invoices/statistics';

  /**
   * Invoice Statistics.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1InvoicesStatisticsGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1InvoicesStatisticsGet$Response(params: ApiV1InvoicesStatisticsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<InvoicesApiVultInvoiceStatisticsResponse>> {
    return apiV1InvoicesStatisticsGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Invoice Statistics.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1InvoicesStatisticsGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1InvoicesStatisticsGet(params: ApiV1InvoicesStatisticsGet$Params, context?: HttpContext): Observable<InvoicesApiVultInvoiceStatisticsResponse> {
    return this.apiV1InvoicesStatisticsGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<InvoicesApiVultInvoiceStatisticsResponse>): InvoicesApiVultInvoiceStatisticsResponse => r.body)
    );
  }

  /** Path part for operation `apiV1InvoicesExportGet()` */
  static readonly ApiV1InvoicesExportGetPath = '/api/v1/invoices/export';

  /**
   * Export Invoices.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1InvoicesExportGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1InvoicesExportGet$Response(params: ApiV1InvoicesExportGet$Params, context?: HttpContext): Observable<StrictHttpResponse<InvoicesApiVultExportInvoicesResponse>> {
    return apiV1InvoicesExportGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Export Invoices.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1InvoicesExportGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1InvoicesExportGet(params: ApiV1InvoicesExportGet$Params, context?: HttpContext): Observable<InvoicesApiVultExportInvoicesResponse> {
    return this.apiV1InvoicesExportGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<InvoicesApiVultExportInvoicesResponse>): InvoicesApiVultExportInvoicesResponse => r.body)
    );
  }

}
