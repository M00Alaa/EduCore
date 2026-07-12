/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Promos14DeletePromoResponse } from '../../models/promos-14-delete-promo-response';

export interface ApiV1PromosPromoIdDelete$Params {
  promo_id: string;
      body?: {
}
}

export function apiV1PromosPromoIdDelete(http: HttpClient, rootUrl: string, params: ApiV1PromosPromoIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<Promos14DeletePromoResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1PromosPromoIdDelete.PATH, 'delete');
  if (params) {
    rb.path('promo_id', params.promo_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Promos14DeletePromoResponse>;
    })
  );
}

apiV1PromosPromoIdDelete.PATH = '/api/v1/promos/{promo_id}';
