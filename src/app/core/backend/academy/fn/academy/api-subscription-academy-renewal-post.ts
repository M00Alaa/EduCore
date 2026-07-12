/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AcademyRenewalResponse } from '../../models/academy-renewal-response';

export interface ApiSubscriptionAcademyRenewalPost$Params {
      body?: {
'academy_id'?: number;
'subscription_ends_at'?: string;
}
}

export function apiSubscriptionAcademyRenewalPost(http: HttpClient, rootUrl: string, params?: ApiSubscriptionAcademyRenewalPost$Params, context?: HttpContext): Observable<StrictHttpResponse<AcademyRenewalResponse>> {
  const rb = new RequestBuilder(rootUrl, apiSubscriptionAcademyRenewalPost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AcademyRenewalResponse>;
    })
  );
}

apiSubscriptionAcademyRenewalPost.PATH = '/api/subscription/academy/renewal';
