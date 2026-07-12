/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PoliciesGetPolicyByTypeResponse } from '../../models/policies-get-policy-by-type-response';

export interface ApiV1AcademyAcademyIdPoliciesTypeGet$Params {
  academy_id: string;
  type: string;
      body?: {
}
}

export function apiV1AcademyAcademyIdPoliciesTypeGet(http: HttpClient, rootUrl: string, params: ApiV1AcademyAcademyIdPoliciesTypeGet$Params, context?: HttpContext): Observable<StrictHttpResponse<PoliciesGetPolicyByTypeResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1AcademyAcademyIdPoliciesTypeGet.PATH, 'get');
  if (params) {
    rb.path('academy_id', params.academy_id, {});
    rb.path('type', params.type, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PoliciesGetPolicyByTypeResponse>;
    })
  );
}

apiV1AcademyAcademyIdPoliciesTypeGet.PATH = '/api/v1/academy/{academy_id}/policies/{type}';
