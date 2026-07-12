/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ChatSendMessageResponse } from '../../models/chat-send-message-response';

export interface ApiV1ChatsSendMessagePost$Params {
  body: {
    message: string;
    to_user_id: number;
  };
}

export function apiV1ChatsSendMessagePost(http: HttpClient, rootUrl: string, params: ApiV1ChatsSendMessagePost$Params, context?: HttpContext): Observable<StrictHttpResponse<ChatSendMessageResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1ChatsSendMessagePost.PATH, 'post');
  rb.body(params.body);

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ChatSendMessageResponse>;
    })
  );
}

apiV1ChatsSendMessagePost.PATH = '/api/v1/chats/send-message';
