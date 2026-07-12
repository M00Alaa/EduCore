/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { IntegrationAcademyBranchesResponse } from '../../models/integration-academy-branches-response';

export interface ApiSubscriptionIntegrationAcademyBranchesGet$Params {
  academy_id: string;
      body?: {
}
}

export function apiSubscriptionIntegrationAcademyBranchesGet(http: HttpClient, rootUrl: string, params: ApiSubscriptionIntegrationAcademyBranchesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<IntegrationAcademyBranchesResponse>> {
  const rb = new RequestBuilder(rootUrl, apiSubscriptionIntegrationAcademyBranchesGet.PATH, 'get');
  if (params) {
    rb.query('academy_id', params.academy_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<IntegrationAcademyBranchesResponse>;
    })
  );
}

apiSubscriptionIntegrationAcademyBranchesGet.PATH = '/api/subscription/integration/academy-branches';
