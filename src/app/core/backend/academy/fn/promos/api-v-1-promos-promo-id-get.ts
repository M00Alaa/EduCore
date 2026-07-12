/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Promos05ShowPromoResponse } from '../../models/promos-05-show-promo-response';

export interface ApiV1PromosPromoIdGet$Params {
  promo_id: string;
      body?: {
}
}

export function apiV1PromosPromoIdGet(http: HttpClient, rootUrl: string, params: ApiV1PromosPromoIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Promos05ShowPromoResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1PromosPromoIdGet.PATH, 'get');
  if (params) {
    rb.path('promo_id', params.promo_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Promos05ShowPromoResponse>;
    })
  );
}

apiV1PromosPromoIdGet.PATH = '/api/v1/promos/{promo_id}';
