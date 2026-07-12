/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiV1NotificationsGet } from '../fn/notifications/api-v-1-notifications-get';
import { ApiV1NotificationsGet$Params } from '../fn/notifications/api-v-1-notifications-get';
import { apiV1NotificationsUnreadCountGet } from '../fn/notifications/api-v-1-notifications-unread-count-get';
import { apiV1NotificationsIdReadPut } from '../fn/notifications/api-v-1-notifications-id-read-put';
import { ApiV1NotificationsIdReadPut$Params } from '../fn/notifications/api-v-1-notifications-id-read-put';
import { apiV1NotificationsReadAllPut } from '../fn/notifications/api-v-1-notifications-read-all-put';
import { NotificationsListResponse } from '../models/notifications-list-response';
import { NotificationsUnreadCountResponse } from '../models/notifications-unread-count-response';

@Injectable({ providedIn: 'root' })
export class NotificationsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiV1NotificationsGet()` */
  static readonly ApiV1NotificationsGetPath = '/api/v1/notifications';

  /**
   * Get paginated notifications.
   */
  apiV1NotificationsGet$Response(params?: ApiV1NotificationsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<NotificationsListResponse>> {
    return apiV1NotificationsGet(this.http, this.rootUrl, params, context);
  }

  apiV1NotificationsGet(params?: ApiV1NotificationsGet$Params, context?: HttpContext): Observable<NotificationsListResponse> {
    return this.apiV1NotificationsGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<NotificationsListResponse>): NotificationsListResponse => r.body)
    );
  }

  /** Path part for operation `apiV1NotificationsUnreadCountGet()` */
  static readonly ApiV1NotificationsUnreadCountGetPath = '/api/v1/notifications/unread-count';

  /**
   * Get unread notifications count.
   */
  apiV1NotificationsUnreadCountGet$Response(context?: HttpContext): Observable<StrictHttpResponse<NotificationsUnreadCountResponse>> {
    return apiV1NotificationsUnreadCountGet(this.http, this.rootUrl, context);
  }

  apiV1NotificationsUnreadCountGet(context?: HttpContext): Observable<NotificationsUnreadCountResponse> {
    return this.apiV1NotificationsUnreadCountGet$Response(context).pipe(
      map((r: StrictHttpResponse<NotificationsUnreadCountResponse>): NotificationsUnreadCountResponse => r.body)
    );
  }

  /** Path part for operation `apiV1NotificationsIdReadPut()` */
  static readonly ApiV1NotificationsIdReadPutPath = '/api/v1/notifications/{id}/read';

  /**
   * Mark single notification as read.
   */
  apiV1NotificationsIdReadPut$Response(params: ApiV1NotificationsIdReadPut$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return apiV1NotificationsIdReadPut(this.http, this.rootUrl, params, context);
  }

  apiV1NotificationsIdReadPut(params: ApiV1NotificationsIdReadPut$Params, context?: HttpContext): Observable<any> {
    return this.apiV1NotificationsIdReadPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `apiV1NotificationsReadAllPut()` */
  static readonly ApiV1NotificationsReadAllPutPath = '/api/v1/notifications/read-all';

  /**
   * Mark all notifications as read.
   */
  apiV1NotificationsReadAllPut$Response(context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return apiV1NotificationsReadAllPut(this.http, this.rootUrl, context);
  }

  apiV1NotificationsReadAllPut(context?: HttpContext): Observable<any> {
    return this.apiV1NotificationsReadAllPut$Response(context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }
}
