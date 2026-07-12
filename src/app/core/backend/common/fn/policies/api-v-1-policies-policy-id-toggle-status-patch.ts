/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PoliciesTogglePolicyStatusResponse } from '../../models/policies-toggle-policy-status-response';

export interface ApiV1PoliciesPolicyIdToggleStatusPatch$Params {
  policy_id: string;
      body?: {
}
}

export function apiV1PoliciesPolicyIdToggleStatusPatch(http: HttpClient, rootUrl: string, params: ApiV1PoliciesPolicyIdToggleStatusPatch$Params, context?: HttpContext): Observable<StrictHttpResponse<PoliciesTogglePolicyStatusResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1PoliciesPolicyIdToggleStatusPatch.PATH, 'patch');
  if (params) {
    rb.path('policy_id', params.policy_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PoliciesTogglePolicyStatusResponse>;
    })
  );
}

apiV1PoliciesPolicyIdToggleStatusPatch.PATH = '/api/v1/policies/{policy_id}/toggle-status';
