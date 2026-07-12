/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { IntegrationCheckStatusResponse } from '../../models/integration-check-status-response';

export interface ApiSubscriptionIntegrationCheckStatusGet$Params {
  academy_id: string;
      body?: {
}
}

export function apiSubscriptionIntegrationCheckStatusGet(http: HttpClient, rootUrl: string, params: ApiSubscriptionIntegrationCheckStatusGet$Params, context?: HttpContext): Observable<StrictHttpResponse<IntegrationCheckStatusResponse>> {
  const rb = new RequestBuilder(rootUrl, apiSubscriptionIntegrationCheckStatusGet.PATH, 'get');
  if (params) {
    rb.query('academy_id', params.academy_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<IntegrationCheckStatusResponse>;
    })
  );
}

apiSubscriptionIntegrationCheckStatusGet.PATH = '/api/subscription/integration/check-status';
