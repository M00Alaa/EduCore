/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ChatUserInfoResponse } from '../../models/chat-user-info-response';

export interface ApiV1ChatsUserIdGet$Params {
  userId: string;
}

export function apiV1ChatsUserIdGet(http: HttpClient, rootUrl: string, params: ApiV1ChatsUserIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<ChatUserInfoResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1ChatsUserIdGet.PATH, 'get');
  rb.path('userId', params.userId, {});

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ChatUserInfoResponse>;
    })
  );
}

apiV1ChatsUserIdGet.PATH = '/api/v1/chats/user/{userId}';
