/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LookupsApiFilterGetInvoiceTypesResponse } from '../../models/lookups-api-filter-get-invoice-types-response';

export interface ApiV1LookupsInvoiceTypesGet$Params {
      body?: {
}
}

export function apiV1LookupsInvoiceTypesGet(http: HttpClient, rootUrl: string, params?: ApiV1LookupsInvoiceTypesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<LookupsApiFilterGetInvoiceTypesResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1LookupsInvoiceTypesGet.PATH, 'get');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LookupsApiFilterGetInvoiceTypesResponse>;
    })
  );
}

apiV1LookupsInvoiceTypesGet.PATH = '/api/v1/lookups/invoice-types';
