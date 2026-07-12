/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PoliciesGetAllPoliciesResponse } from '../../models/policies-get-all-policies-response';

export interface ApiV1AcademyAcademyIdPoliciesGet$Params {
  academy_id: string;
      body?: {
}
}

export function apiV1AcademyAcademyIdPoliciesGet(http: HttpClient, rootUrl: string, params: ApiV1AcademyAcademyIdPoliciesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<PoliciesGetAllPoliciesResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1AcademyAcademyIdPoliciesGet.PATH, 'get');
  if (params) {
    rb.path('academy_id', params.academy_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PoliciesGetAllPoliciesResponse>;
    })
  );
}

apiV1AcademyAcademyIdPoliciesGet.PATH = '/api/v1/academy/{academy_id}/policies';
