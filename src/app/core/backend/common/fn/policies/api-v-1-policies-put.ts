/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PoliciesUpdatePolicyResponse } from '../../models/policies-update-policy-response';

export interface ApiV1PoliciesPut$Params {
  body?: {
    'policies'?: Array<{
      'policy_type'?: string;
      'content_ar'?: string;
      'content_en'?: string;
    }>;
  }
}

export function apiV1PoliciesPut(http: HttpClient, rootUrl: string, params?: ApiV1PoliciesPut$Params, context?: HttpContext): Observable<StrictHttpResponse<PoliciesUpdatePolicyResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1PoliciesPut.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PoliciesUpdatePolicyResponse>;
    })
  );
}

apiV1PoliciesPut.PATH = '/api/v1/policies';
