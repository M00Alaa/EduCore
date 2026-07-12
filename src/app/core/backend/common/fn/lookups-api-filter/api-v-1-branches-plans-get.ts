/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LookupsApiFilterGetAcademyBranchesPlansResponse } from '../../models/lookups-api-filter-get-academy-branches-plans-response';

export interface ApiV1BranchesPlansGet$Params {
      body?: {
}
}

export function apiV1BranchesPlansGet(http: HttpClient, rootUrl: string, params?: ApiV1BranchesPlansGet$Params, context?: HttpContext): Observable<StrictHttpResponse<LookupsApiFilterGetAcademyBranchesPlansResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1BranchesPlansGet.PATH, 'get');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LookupsApiFilterGetAcademyBranchesPlansResponse>;
    })
  );
}

apiV1BranchesPlansGet.PATH = '/api/v1/branches/plans';
