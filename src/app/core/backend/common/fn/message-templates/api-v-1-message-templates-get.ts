/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MessageTemplatesListResponse } from '../../models/message-templates-list-response';

export interface ApiV1MessageTemplatesGet$Params {
  type?: string;
  active_only?: string;
}

export function apiV1MessageTemplatesGet(http: HttpClient, rootUrl: string, params?: ApiV1MessageTemplatesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<MessageTemplatesListResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1MessageTemplatesGet.PATH, 'get');
  if (params) {
    rb.query('type', params.type, {});
    rb.query('active_only', params.active_only, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<MessageTemplatesListResponse>;
    })
  );
}

apiV1MessageTemplatesGet.PATH = '/api/v1/message-templates';
