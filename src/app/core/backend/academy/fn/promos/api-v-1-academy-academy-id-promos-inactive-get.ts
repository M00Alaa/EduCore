/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Promos10InactivePromosResponse } from '../../models/promos-10-inactive-promos-response';

export interface ApiV1AcademyAcademyIdPromosInactiveGet$Params {
  per_page: string;
  academy_id: string;
      body?: {
}
}

export function apiV1AcademyAcademyIdPromosInactiveGet(http: HttpClient, rootUrl: string, params: ApiV1AcademyAcademyIdPromosInactiveGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Promos10InactivePromosResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1AcademyAcademyIdPromosInactiveGet.PATH, 'get');
  if (params) {
    rb.query('per_page', params.per_page, {});
    rb.path('academy_id', params.academy_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Promos10InactivePromosResponse>;
    })
  );
}

apiV1AcademyAcademyIdPromosInactiveGet.PATH = '/api/v1/academy/{academy_id}/promos/inactive';
