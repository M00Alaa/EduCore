/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BranchManagementPortalUiGetBranchDetailsResponse } from '../../models/branch-management-portal-ui-get-branch-details-response';

export interface ApiV1BranchesIdGet$Params {
  id: string;
      body?: {
}
}

export function apiV1BranchesIdGet(http: HttpClient, rootUrl: string, params: ApiV1BranchesIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<BranchManagementPortalUiGetBranchDetailsResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1BranchesIdGet.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BranchManagementPortalUiGetBranchDetailsResponse>;
    })
  );
}

apiV1BranchesIdGet.PATH = '/api/v1/branches/{id}';
