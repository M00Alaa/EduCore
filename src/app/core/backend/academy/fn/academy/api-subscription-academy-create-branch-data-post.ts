/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AcademyCreateBranchDataResponse } from '../../models/academy-create-branch-data-response';

export interface ApiSubscriptionAcademyCreateBranchDataPost$Params {
  portal_academy_id: string;
  notpaid: string;
      body?: {
}
}

export function apiSubscriptionAcademyCreateBranchDataPost(http: HttpClient, rootUrl: string, params: ApiSubscriptionAcademyCreateBranchDataPost$Params, context?: HttpContext): Observable<StrictHttpResponse<AcademyCreateBranchDataResponse>> {
  const rb = new RequestBuilder(rootUrl, apiSubscriptionAcademyCreateBranchDataPost.PATH, 'post');
  if (params) {
    rb.query('portal_academy_id', params.portal_academy_id, {});
    rb.query('notpaid', params.notpaid, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AcademyCreateBranchDataResponse>;
    })
  );
}

apiSubscriptionAcademyCreateBranchDataPost.PATH = '/api/subscription/academy/create-branch-data';
