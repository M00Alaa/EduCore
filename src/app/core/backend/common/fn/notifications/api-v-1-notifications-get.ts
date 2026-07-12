/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { NotificationsListResponse } from '../../models/notifications-list-response';

export interface ApiV1NotificationsGet$Params {
  per_page?: string;
  page?: string;
  unread_only?: string;
}

export function apiV1NotificationsGet(http: HttpClient, rootUrl: string, params?: ApiV1NotificationsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<NotificationsListResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1NotificationsGet.PATH, 'get');
  if (params) {
    rb.query('per_page', params.per_page, {});
    rb.query('page', params.page, {});
    rb.query('unread_only', params.unread_only, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<NotificationsListResponse>;
    })
  );
}

apiV1NotificationsGet.PATH = '/api/v1/notifications';
