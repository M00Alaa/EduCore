/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BranchManagementPortalUiUpdateBranchResponse } from '../../models/branch-management-portal-ui-update-branch-response';

export interface ApiV1BranchesIdPut$Params {
  id: string;
  body?: {
    'title'?: string;
    'address'?: string;
    'city_id'?: number;
    'district_id'?: number;
    'days'?: Array<string>;
    'startTime'?: string;
    'endTime'?: string;
    'contact_phone'?: string;
    'contact_email'?: string;
    'description'?: string;
    'manager_id'?: number;
    'manager'?: {
      'name'?: string;
      'email'?: string;
      'mobile'?: string;
      'password'?: string;
    };
    'logo_base64'?: string;
    'lat'?: string;
    'lng'?: string;
    'location'?: string;
    'extraPhone'?: string;
  }
}

export function apiV1BranchesIdPut(http: HttpClient, rootUrl: string, params: ApiV1BranchesIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<BranchManagementPortalUiUpdateBranchResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1BranchesIdPut.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BranchManagementPortalUiUpdateBranchResponse>;
    })
  );
}

apiV1BranchesIdPut.PATH = '/api/v1/branches/{id}';
