/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { IntegrationUpdateSubscriptionResponse } from '../../models/integration-update-subscription-response';

export interface ApiSubscriptionIntegrationUpdateSubscriptionPut$Params {
      body?: {
'academy_id'?: number;
'subscription_type'?: number;
'subscription_status'?: number;
'subscription_ends_at'?: string;
}
}

export function apiSubscriptionIntegrationUpdateSubscriptionPut(http: HttpClient, rootUrl: string, params?: ApiSubscriptionIntegrationUpdateSubscriptionPut$Params, context?: HttpContext): Observable<StrictHttpResponse<IntegrationUpdateSubscriptionResponse>> {
  const rb = new RequestBuilder(rootUrl, apiSubscriptionIntegrationUpdateSubscriptionPut.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<IntegrationUpdateSubscriptionResponse>;
    })
  );
}

apiSubscriptionIntegrationUpdateSubscriptionPut.PATH = '/api/subscription/integration/update-subscription';
