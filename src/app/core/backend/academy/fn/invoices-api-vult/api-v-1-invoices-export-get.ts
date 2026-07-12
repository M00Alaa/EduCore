/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { InvoicesApiVultExportInvoicesResponse } from '../../models/invoices-api-vult-export-invoices-response';

export interface ApiV1InvoicesExportGet$Params {
  main_academy_id: string;
  type: string;
  date_from: string;
  date_to: string;
      body?: {
}
}

export function apiV1InvoicesExportGet(http: HttpClient, rootUrl: string, params: ApiV1InvoicesExportGet$Params, context?: HttpContext): Observable<StrictHttpResponse<InvoicesApiVultExportInvoicesResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1InvoicesExportGet.PATH, 'get');
  if (params) {
    rb.query('main_academy_id', params.main_academy_id, {});
    rb.query('type', params.type, {});
    rb.query('date_from', params.date_from, {});
    rb.query('date_to', params.date_to, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<InvoicesApiVultExportInvoicesResponse>;
    })
  );
}

apiV1InvoicesExportGet.PATH = '/api/v1/invoices/export';
