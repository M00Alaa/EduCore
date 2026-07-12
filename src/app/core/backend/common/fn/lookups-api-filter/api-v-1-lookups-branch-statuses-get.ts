/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LookupsApiFilterGetBranchStatusesResponse } from '../../models/lookups-api-filter-get-branch-statuses-response';

export interface ApiV1LookupsBranchStatusesGet$Params {
      body?: {
}
}

export function apiV1LookupsBranchStatusesGet(http: HttpClient, rootUrl: string, params?: ApiV1LookupsBranchStatusesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<LookupsApiFilterGetBranchStatusesResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1LookupsBranchStatusesGet.PATH, 'get');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LookupsApiFilterGetBranchStatusesResponse>;
    })
  );
}

apiV1LookupsBranchStatusesGet.PATH = '/api/v1/lookups/branch-statuses';
