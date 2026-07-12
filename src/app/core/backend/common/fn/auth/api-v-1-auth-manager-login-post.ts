/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AuthManagerLoginResponse } from '../../models/auth-manager-login-response';

export interface ApiV1AuthManagerLoginPost$Params {
      body?: {
'identity'?: string;
'password'?: string;
}
}

export function apiV1AuthManagerLoginPost(http: HttpClient, rootUrl: string, params?: ApiV1AuthManagerLoginPost$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthManagerLoginResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1AuthManagerLoginPost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AuthManagerLoginResponse>;
    })
  );
}

apiV1AuthManagerLoginPost.PATH = '/api/v1/auth/manager-login';
