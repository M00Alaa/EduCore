/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { InvoicesApiVultInvoiceStatisticsResponse } from '../../models/invoices-api-vult-invoice-statistics-response';

export interface ApiV1InvoicesStatisticsGet$Params {
  main_academy_id: string;
  date_from: string;
  date_to: string;
      body?: {
}
}

export function apiV1InvoicesStatisticsGet(http: HttpClient, rootUrl: string, params: ApiV1InvoicesStatisticsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<InvoicesApiVultInvoiceStatisticsResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1InvoicesStatisticsGet.PATH, 'get');
  if (params) {
    rb.query('main_academy_id', params.main_academy_id, {});
    rb.query('date_from', params.date_from, {});
    rb.query('date_to', params.date_to, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<InvoicesApiVultInvoiceStatisticsResponse>;
    })
  );
}

apiV1InvoicesStatisticsGet.PATH = '/api/v1/invoices/statistics';
