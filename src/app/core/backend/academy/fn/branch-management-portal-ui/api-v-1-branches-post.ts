/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BranchManagementPortalUiCreateBranchWithexistingmanagerRequestManager } from '../../models/branch-management-portal-ui-create-branch-withexistingmanager-request-manager';
import { BranchManagementPortalUiCreateBranchWithexistingmanagerResponse } from '../../models/branch-management-portal-ui-create-branch-withexistingmanager-response';

export interface ApiV1BranchesPost$Params {
  body?: {
    'parent_id'?: number;
    'title'?: string;
    'address'?: string;
    'location'?: string;
    'city_id'?: number;
    'district_id'?: number;
    'days'?: Array<string>;
    'startTime'?: string;
    'endTime'?: string;
    'contact_phone'?: string;
    'extraPhone'?: string;
    'contact_email'?: string;
    'website'?: string;
    'description'?: string;
    'lat'?: string;
    'lng'?: string;
    'status'?: number;
    'logo_base64'?: string;
    'manager_id'?: string;
    'manager'?: BranchManagementPortalUiCreateBranchWithexistingmanagerRequestManager;
  }
}

export function apiV1BranchesPost(http: HttpClient, rootUrl: string, params?: ApiV1BranchesPost$Params, context?: HttpContext): Observable<StrictHttpResponse<BranchManagementPortalUiCreateBranchWithexistingmanagerResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1BranchesPost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BranchManagementPortalUiCreateBranchWithexistingmanagerResponse>;
    })
  );
}

apiV1BranchesPost.PATH = '/api/v1/branches';
