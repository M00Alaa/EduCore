/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ChatAvailableUsersResponse } from '../../models/chat-available-users-response';

export interface ApiV1ChatsAvailableUsersGet$Params {
  search?: string;
  user_type?: string;
}

export function apiV1ChatsAvailableUsersGet(http: HttpClient, rootUrl: string, params?: ApiV1ChatsAvailableUsersGet$Params, context?: HttpContext): Observable<StrictHttpResponse<ChatAvailableUsersResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1ChatsAvailableUsersGet.PATH, 'get');
  if (params) {
    rb.query('search', params.search, {});
    rb.query('user_type', params.user_type, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ChatAvailableUsersResponse>;
    })
  );
}

apiV1ChatsAvailableUsersGet.PATH = '/api/v1/chats/available-users';
