/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { InvoicesApiVultListInvoicesResponse } from '../../models/invoices-api-vult-list-invoices-response';

export interface ApiV1InvoicesGet$Params {
  main_academy_id: string;
  type?: string;
  per_page?: string;
  page?: string;
  date_from?: string;
  date_to?: string;
  search?: string;
  payment_status?: string;
  academy_id?: string;
  amount?: string;
  body?: {
  }
}

export function apiV1InvoicesGet(http: HttpClient, rootUrl: string, params: ApiV1InvoicesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<InvoicesApiVultListInvoicesResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1InvoicesGet.PATH, 'get');
  if (params) {
    rb.query('main_academy_id', params.main_academy_id, {});
    rb.query('type', params.type, {});
    rb.query('per_page', params.per_page, {});
    rb.query('page', params.page, {});
    rb.query('date_from', params.date_from, {});
    rb.query('date_to', params.date_to, {});
    rb.query('search', params.search, {});
    rb.query('payment_status', params.payment_status, {});
    rb.query('academy_id', params.academy_id, {});
    rb.query('amount', params.amount, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<InvoicesApiVultListInvoicesResponse>;
    })
  );
}

apiV1InvoicesGet.PATH = '/api/v1/invoices';
