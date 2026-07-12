/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { IntegrationCreateUserResponse } from '../../models/integration-create-user-response';

export interface ApiSubscriptionIntegrationCreateUserPost$Params {
      body?: {
'username'?: string;
'email'?: string;
'password'?: string;
}
}

export function apiSubscriptionIntegrationCreateUserPost(http: HttpClient, rootUrl: string, params?: ApiSubscriptionIntegrationCreateUserPost$Params, context?: HttpContext): Observable<StrictHttpResponse<IntegrationCreateUserResponse>> {
  const rb = new RequestBuilder(rootUrl, apiSubscriptionIntegrationCreateUserPost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<IntegrationCreateUserResponse>;
    })
  );
}

apiSubscriptionIntegrationCreateUserPost.PATH = '/api/subscription/integration/create-user';
