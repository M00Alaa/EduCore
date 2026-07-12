/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Promos13PromosByScopeResponse } from '../../models/promos-13-promos-by-scope-response';

export interface ApiV1AcademyAcademyIdPromosByScopeGet$Params {
  scope: string;
  academy_id: string;
      body?: {
}
}

export function apiV1AcademyAcademyIdPromosByScopeGet(http: HttpClient, rootUrl: string, params: ApiV1AcademyAcademyIdPromosByScopeGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Promos13PromosByScopeResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1AcademyAcademyIdPromosByScopeGet.PATH, 'get');
  if (params) {
    rb.query('scope', params.scope, {});
    rb.path('academy_id', params.academy_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Promos13PromosByScopeResponse>;
    })
  );
}

apiV1AcademyAcademyIdPromosByScopeGet.PATH = '/api/v1/academy/{academy_id}/promos/by-scope';
