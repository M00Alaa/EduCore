/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { Zatca61SubmitB2CInvoiceSimplifiedTaxInvoiceResponse } from '../../models';


export interface ApiV1Zatca7B7BaccountId7D7DInvoiceB2CPost$Params {
  body?: {
    'invoice_number'?: string;
    'issue_date'?: string;
    'issue_time'?: string;
    'items'?: Array<{
      'name'?: string;
      'quantity'?: number;
      'unit_price'?: number;
      'line_total'?: number;
      'tax_amount'?: number;
    }>;
    'subtotal'?: number;
    'tax_amount'?: number;
    'taxable_amount'?: number;
    'total'?: number;
  }
}

export function apiV1Zatca7B7BaccountId7D7DInvoiceB2CPost(http: HttpClient, rootUrl: string, params?: ApiV1Zatca7B7BaccountId7D7DInvoiceB2CPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Zatca61SubmitB2CInvoiceSimplifiedTaxInvoiceResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1Zatca7B7BaccountId7D7DInvoiceB2CPost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Zatca61SubmitB2CInvoiceSimplifiedTaxInvoiceResponse>;
    })
  );
}

apiV1Zatca7B7BaccountId7D7DInvoiceB2CPost.PATH = '/api/v1/zatca/%7B%7Baccount_id%7D%7D/invoice/b2c';
