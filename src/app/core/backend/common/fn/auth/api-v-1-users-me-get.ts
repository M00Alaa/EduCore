/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AuthGetCurrentUserMeResponse } from '../../models/auth-get-current-user-me-response';

export interface ApiV1UsersMeGet$Params {
      body?: {
}
}

export function apiV1UsersMeGet(http: HttpClient, rootUrl: string, params?: ApiV1UsersMeGet$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthGetCurrentUserMeResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1UsersMeGet.PATH, 'get');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AuthGetCurrentUserMeResponse>;
    })
  );
}

apiV1UsersMeGet.PATH = '/api/v1/users/me';
