/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Promos11ToggleStatusBackToActiveResponse } from '../../models/promos-11-toggle-status-back-to-active-response';

export interface ApiV1PromosPromoIdToggleStatusPatch$Params {
  promo_id: string;
      body?: {
}
}

export function apiV1PromosPromoIdToggleStatusPatch(http: HttpClient, rootUrl: string, params: ApiV1PromosPromoIdToggleStatusPatch$Params, context?: HttpContext): Observable<StrictHttpResponse<Promos11ToggleStatusBackToActiveResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1PromosPromoIdToggleStatusPatch.PATH, 'patch');
  if (params) {
    rb.path('promo_id', params.promo_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Promos11ToggleStatusBackToActiveResponse>;
    })
  );
}

apiV1PromosPromoIdToggleStatusPatch.PATH = '/api/v1/promos/{promo_id}/toggle-status';
