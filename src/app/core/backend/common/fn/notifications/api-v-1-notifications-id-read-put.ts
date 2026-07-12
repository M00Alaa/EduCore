/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

export interface ApiV1NotificationsIdReadPut$Params {
  id: string;
}

export function apiV1NotificationsIdReadPut(http: HttpClient, rootUrl: string, params: ApiV1NotificationsIdReadPut$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, apiV1NotificationsIdReadPut.PATH.replace('{id}', params.id), 'put');

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<any>;
    })
  );
}

apiV1NotificationsIdReadPut.PATH = '/api/v1/notifications/{id}/read';
