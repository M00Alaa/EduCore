/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PoliciesCustomizePolicyFromDefaultResponse } from '../../models/policies-customize-policy-from-default-response';

export interface ApiV1AcademyAcademyIdPoliciesTypeCustomizePost$Params {
  academy_id: string;
  type: string;
      body?: {
}
}

export function apiV1AcademyAcademyIdPoliciesTypeCustomizePost(http: HttpClient, rootUrl: string, params: ApiV1AcademyAcademyIdPoliciesTypeCustomizePost$Params, context?: HttpContext): Observable<StrictHttpResponse<PoliciesCustomizePolicyFromDefaultResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1AcademyAcademyIdPoliciesTypeCustomizePost.PATH, 'post');
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
      return r as StrictHttpResponse<PoliciesCustomizePolicyFromDefaultResponse>;
    })
  );
}

apiV1AcademyAcademyIdPoliciesTypeCustomizePost.PATH = '/api/v1/academy/{academy_id}/policies/{type}/customize';
