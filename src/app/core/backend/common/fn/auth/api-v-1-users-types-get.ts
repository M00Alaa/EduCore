/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AuthGetUserTypesRolesResponse } from '../../models/auth-get-user-types-roles-response';

export interface ApiV1UsersTypesGet$Params {
      body?: {
}
}

export function apiV1UsersTypesGet(http: HttpClient, rootUrl: string, params?: ApiV1UsersTypesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthGetUserTypesRolesResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1UsersTypesGet.PATH, 'get');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AuthGetUserTypesRolesResponse>;
    })
  );
}

apiV1UsersTypesGet.PATH = '/api/v1/users/types';
