/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BranchManagementPortalUiListBranchesResponse } from '../../models/branch-management-portal-ui-list-branches-response';

export interface ApiV1BranchesGet$Params {
  parent_id: string;
  status: string;
  subscription_status: string;
  plan_name: string;
  search: string;
  per_page: string;
  page: string;
      body?: {
}
}

export function apiV1BranchesGet(http: HttpClient, rootUrl: string, params: ApiV1BranchesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<BranchManagementPortalUiListBranchesResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1BranchesGet.PATH, 'get');
  if (params) {
    rb.query('parent_id', params.parent_id, {});
    rb.query('status', params.status, {});
    rb.query('subscription_status', params.subscription_status, {});
    rb.query('plan_name', params.plan_name, {});
    rb.query('search', params.search, {});
    rb.query('per_page', params.per_page, {});
    rb.query('page', params.page, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BranchManagementPortalUiListBranchesResponse>;
    })
  );
}

apiV1BranchesGet.PATH = '/api/v1/branches';
