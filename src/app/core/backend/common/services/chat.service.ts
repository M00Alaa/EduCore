/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiV1ChatsAvailableUsersGet } from '../fn/chat/api-v-1-chats-available-users-get';
import { ApiV1ChatsAvailableUsersGet$Params } from '../fn/chat/api-v-1-chats-available-users-get';
import { apiV1ChatsUserIdGet } from '../fn/chat/api-v-1-chats-user-id-get';
import { ApiV1ChatsUserIdGet$Params } from '../fn/chat/api-v-1-chats-user-id-get';
import { apiV1ChatsSendMessagePost } from '../fn/chat/api-v-1-chats-send-message-post';
import { ApiV1ChatsSendMessagePost$Params } from '../fn/chat/api-v-1-chats-send-message-post';
import { ChatAvailableUsersResponse } from '../models/chat-available-users-response';
import { ChatUserInfoResponse } from '../models/chat-user-info-response';
import { ChatSendMessageResponse } from '../models/chat-send-message-response';

@Injectable({ providedIn: 'root' })
export class ChatService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiV1ChatsAvailableUsersGet()` */
  static readonly ApiV1ChatsAvailableUsersGetPath = '/api/v1/chats/available-users';

  /**
   * Get available users to chat with.
   */
  apiV1ChatsAvailableUsersGet$Response(params?: ApiV1ChatsAvailableUsersGet$Params, context?: HttpContext): Observable<StrictHttpResponse<ChatAvailableUsersResponse>> {
    return apiV1ChatsAvailableUsersGet(this.http, this.rootUrl, params, context);
  }

  apiV1ChatsAvailableUsersGet(params?: ApiV1ChatsAvailableUsersGet$Params, context?: HttpContext): Observable<ChatAvailableUsersResponse> {
    return this.apiV1ChatsAvailableUsersGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<ChatAvailableUsersResponse>): ChatAvailableUsersResponse => r.body)
    );
  }

  /** Path part for operation `apiV1ChatsUserIdGet()` */
  static readonly ApiV1ChatsUserIdGetPath = '/api/v1/chats/user/{userId}';

  /**
   * Get user info for chat (player, trainer, or branch manager).
   * Returns user details + Firestore chat_id (ac{academy_id}_pa{user_id}).
   */
  apiV1ChatsUserIdGet$Response(params: ApiV1ChatsUserIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<ChatUserInfoResponse>> {
    return apiV1ChatsUserIdGet(this.http, this.rootUrl, params, context);
  }

  apiV1ChatsUserIdGet(params: ApiV1ChatsUserIdGet$Params, context?: HttpContext): Observable<ChatUserInfoResponse> {
    return this.apiV1ChatsUserIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<ChatUserInfoResponse>): ChatUserInfoResponse => r.body)
    );
  }

  /** Path part for operation `apiV1ChatsSendMessagePost()` */
  static readonly ApiV1ChatsSendMessagePostPath = '/api/v1/chats/send-message';

  /**
   * Send chat message — creates DB notification + FCM push.
   */
  apiV1ChatsSendMessagePost$Response(params: ApiV1ChatsSendMessagePost$Params, context?: HttpContext): Observable<StrictHttpResponse<ChatSendMessageResponse>> {
    return apiV1ChatsSendMessagePost(this.http, this.rootUrl, params, context);
  }

  apiV1ChatsSendMessagePost(params: ApiV1ChatsSendMessagePost$Params, context?: HttpContext): Observable<ChatSendMessageResponse> {
    return this.apiV1ChatsSendMessagePost$Response(params, context).pipe(
      map((r: StrictHttpResponse<ChatSendMessageResponse>): ChatSendMessageResponse => r.body)
    );
  }
}
