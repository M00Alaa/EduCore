/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LookupsApiFilterGetAcademyBranchesLookupResponse } from '../../models/lookups-api-filter-get-academy-branches-lookup-response';

export interface ApiV1LookupsAcademyAcademyIdBranchesGet$Params {
  academy_id: string;
      body?: {
}
}

export function apiV1LookupsAcademyAcademyIdBranchesGet(http: HttpClient, rootUrl: string, params: ApiV1LookupsAcademyAcademyIdBranchesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<LookupsApiFilterGetAcademyBranchesLookupResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1LookupsAcademyAcademyIdBranchesGet.PATH, 'get');
  if (params) {
    rb.path('academy_id', params.academy_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LookupsApiFilterGetAcademyBranchesLookupResponse>;
    })
  );
}

apiV1LookupsAcademyAcademyIdBranchesGet.PATH = '/api/v1/lookups/academy/{academy_id}/branches';
