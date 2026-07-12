/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

export interface ApiV1MessageTemplatesIdDelete$Params {
  id: string;
}

export function apiV1MessageTemplatesIdDelete(http: HttpClient, rootUrl: string, params: ApiV1MessageTemplatesIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, apiV1MessageTemplatesIdDelete.PATH.replace('{id}', params.id), 'delete');

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<any>;
    })
  );
}

apiV1MessageTemplatesIdDelete.PATH = '/api/v1/message-templates/{id}';
