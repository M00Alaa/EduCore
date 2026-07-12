/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BranchManagementPortalUiDeleteBranchResponse } from '../../models/branch-management-portal-ui-delete-branch-response';

export interface ApiV1BranchesIdDelete$Params {
  id: string;
      body?: {
}
}

export function apiV1BranchesIdDelete(http: HttpClient, rootUrl: string, params: ApiV1BranchesIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<BranchManagementPortalUiDeleteBranchResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1BranchesIdDelete.PATH, 'delete');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BranchManagementPortalUiDeleteBranchResponse>;
    })
  );
}

apiV1BranchesIdDelete.PATH = '/api/v1/branches/{id}';
