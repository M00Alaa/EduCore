/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ZatcaUpdateInvoiceTypesResponse } from '../../models/zatca-update-invoice-types-response';

export interface ZatcaAccountIdInvoiceTypesPut$Params {
  account_id: string;
      body?: {
'invoice_types'?: Array<string>;
}
}

export function zatcaAccountIdInvoiceTypesPut(http: HttpClient, rootUrl: string, params: ZatcaAccountIdInvoiceTypesPut$Params, context?: HttpContext): Observable<StrictHttpResponse<ZatcaUpdateInvoiceTypesResponse>> {
  const rb = new RequestBuilder(rootUrl, zatcaAccountIdInvoiceTypesPut.PATH, 'put');
  if (params) {
    rb.path('account_id', params.account_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ZatcaUpdateInvoiceTypesResponse>;
    })
  );
}

zatcaAccountIdInvoiceTypesPut.PATH = '/zatca/{account_id}/invoice-types';
