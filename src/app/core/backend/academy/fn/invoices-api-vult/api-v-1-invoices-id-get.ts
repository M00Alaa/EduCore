/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { InvoicesApiVultShowInvoiceResponse } from '../../models/invoices-api-vult-show-invoice-response';

export interface ApiV1InvoicesIdGet$Params {
  main_academy_id: string;
  id: string;
      body?: {
}
}

export function apiV1InvoicesIdGet(http: HttpClient, rootUrl: string, params: ApiV1InvoicesIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<InvoicesApiVultShowInvoiceResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1InvoicesIdGet.PATH, 'get');
  if (params) {
    rb.query('main_academy_id', params.main_academy_id, {});
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<InvoicesApiVultShowInvoiceResponse>;
    })
  );
}

apiV1InvoicesIdGet.PATH = '/api/v1/invoices/{id}';
