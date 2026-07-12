/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Promos06UpdatePromoResponse } from '../../models/promos-06-update-promo-response';

export interface ApiV1PromosPromoIdPut$Params {
  promo_id: string;
      body?: {
'name'?: string;
'discount_type'?: string;
'amount'?: number;
'allow_stack'?: boolean;
}
}

export function apiV1PromosPromoIdPut(http: HttpClient, rootUrl: string, params: ApiV1PromosPromoIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<Promos06UpdatePromoResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1PromosPromoIdPut.PATH, 'put');
  if (params) {
    rb.path('promo_id', params.promo_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Promos06UpdatePromoResponse>;
    })
  );
}

apiV1PromosPromoIdPut.PATH = '/api/v1/promos/{promo_id}';
