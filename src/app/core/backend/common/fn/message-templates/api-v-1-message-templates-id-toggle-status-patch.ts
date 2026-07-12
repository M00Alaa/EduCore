/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MessageTemplateResponse } from '../../models/message-template-response';

export interface ApiV1MessageTemplatesIdToggleStatusPatch$Params {
  id: string;
}

export function apiV1MessageTemplatesIdToggleStatusPatch(http: HttpClient, rootUrl: string, params: ApiV1MessageTemplatesIdToggleStatusPatch$Params, context?: HttpContext): Observable<StrictHttpResponse<MessageTemplateResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1MessageTemplatesIdToggleStatusPatch.PATH.replace('{id}', params.id), 'patch');

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<MessageTemplateResponse>;
    })
  );
}

apiV1MessageTemplatesIdToggleStatusPatch.PATH = '/api/v1/message-templates/{id}/toggle-status';
