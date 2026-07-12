/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BranchManagementPortalUiGetAvailableManagersResponse } from '../../models/branch-management-portal-ui-get-available-managers-response';

export interface ApiV1BranchesManagersGet$Params {
  search: string;
  parent_id: string;
      body?: {
}
}

export function apiV1BranchesManagersGet(http: HttpClient, rootUrl: string, params: ApiV1BranchesManagersGet$Params, context?: HttpContext): Observable<StrictHttpResponse<BranchManagementPortalUiGetAvailableManagersResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1BranchesManagersGet.PATH, 'get');
  if (params) {
    rb.query('search', params.search, {});
    rb.query('parent_id', params.parent_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BranchManagementPortalUiGetAvailableManagersResponse>;
    })
  );
}

apiV1BranchesManagersGet.PATH = '/api/v1/branches/managers';
