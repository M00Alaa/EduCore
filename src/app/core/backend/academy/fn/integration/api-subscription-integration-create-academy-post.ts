/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { IntegrationCreateAcademyResponse } from '../../models/integration-create-academy-response';

export interface ApiSubscriptionIntegrationCreateAcademyPost$Params {
      body?: {
'title'?: string;
'manager_id'?: number;
'contact_email'?: string;
}
}

export function apiSubscriptionIntegrationCreateAcademyPost(http: HttpClient, rootUrl: string, params?: ApiSubscriptionIntegrationCreateAcademyPost$Params, context?: HttpContext): Observable<StrictHttpResponse<IntegrationCreateAcademyResponse>> {
  const rb = new RequestBuilder(rootUrl, apiSubscriptionIntegrationCreateAcademyPost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<IntegrationCreateAcademyResponse>;
    })
  );
}

apiSubscriptionIntegrationCreateAcademyPost.PATH = '/api/subscription/integration/create-academy';
