/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MessageTemplateResponse } from '../../models/message-template-response';

export interface ApiV1MessageTemplatesIdPut$Params {
  id: string;
  body: {
    name?: string;
    type?: string;
    subject?: string;
    content?: string;
    send_timing?: string;
    active?: boolean;
  };
}

export function apiV1MessageTemplatesIdPut(http: HttpClient, rootUrl: string, params: ApiV1MessageTemplatesIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<MessageTemplateResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1MessageTemplatesIdPut.PATH.replace('{id}', params.id), 'put');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<MessageTemplateResponse>;
    })
  );
}

apiV1MessageTemplatesIdPut.PATH = '/api/v1/message-templates/{id}';
