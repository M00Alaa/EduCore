/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Promos07IndexPromosResponse } from '../../models/promos-07-index-promos-response';

export interface ApiV1AcademyAcademyIdPromosGet$Params {
  page?: string;
  per_page: string;
  search: string;
  academy_id: string;
  discount_type?: string;
  status?: number;
  scope?: string;
  body?: {
  }
}

export function apiV1AcademyAcademyIdPromosGet(http: HttpClient, rootUrl: string, params: ApiV1AcademyAcademyIdPromosGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Promos07IndexPromosResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1AcademyAcademyIdPromosGet.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('per_page', params.per_page, {});
    rb.query('search', params.search, {});
    rb.query('discount_type', params.discount_type, {});
    rb.query('status', params.status, {});
    rb.query('scope', params.scope, {});
    rb.path('academy_id', params.academy_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Promos07IndexPromosResponse>;
    })
  );
}

apiV1AcademyAcademyIdPromosGet.PATH = '/api/v1/academy/{academy_id}/promos';
