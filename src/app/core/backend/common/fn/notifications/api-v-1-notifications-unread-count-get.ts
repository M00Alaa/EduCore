/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { NotificationsUnreadCountResponse } from '../../models/notifications-unread-count-response';

export function apiV1NotificationsUnreadCountGet(http: HttpClient, rootUrl: string, context?: HttpContext): Observable<StrictHttpResponse<NotificationsUnreadCountResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1NotificationsUnreadCountGet.PATH, 'get');

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<NotificationsUnreadCountResponse>;
    })
  );
}

apiV1NotificationsUnreadCountGet.PATH = '/api/v1/notifications/unread-count';
