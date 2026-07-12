/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LookupsApiFilterGetSubscriptionStatusesResponse } from '../../models/lookups-api-filter-get-subscription-statuses-response';

export interface ApiV1LookupsSubscriptionStatusesGet$Params {
      body?: {
}
}

export function apiV1LookupsSubscriptionStatusesGet(http: HttpClient, rootUrl: string, params?: ApiV1LookupsSubscriptionStatusesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<LookupsApiFilterGetSubscriptionStatusesResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1LookupsSubscriptionStatusesGet.PATH, 'get');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LookupsApiFilterGetSubscriptionStatusesResponse>;
    })
  );
}

apiV1LookupsSubscriptionStatusesGet.PATH = '/api/v1/lookups/subscription-statuses';
