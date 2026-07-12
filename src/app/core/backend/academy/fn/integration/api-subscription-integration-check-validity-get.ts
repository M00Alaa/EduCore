/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { IntegrationCheckValidityResponse } from '../../models/integration-check-validity-response';

export interface ApiSubscriptionIntegrationCheckValidityGet$Params {
  email: string;
  mobile: string;
  academy_mobile: string;
      body?: {
}
}

export function apiSubscriptionIntegrationCheckValidityGet(http: HttpClient, rootUrl: string, params: ApiSubscriptionIntegrationCheckValidityGet$Params, context?: HttpContext): Observable<StrictHttpResponse<IntegrationCheckValidityResponse>> {
  const rb = new RequestBuilder(rootUrl, apiSubscriptionIntegrationCheckValidityGet.PATH, 'get');
  if (params) {
    rb.query('email', params.email, {});
    rb.query('mobile', params.mobile, {});
    rb.query('academy_mobile', params.academy_mobile, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<IntegrationCheckValidityResponse>;
    })
  );
}

apiSubscriptionIntegrationCheckValidityGet.PATH = '/api/subscription/integration/check-validity';
