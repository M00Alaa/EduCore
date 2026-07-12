/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { Zatca21ActivateZatcaIntegrationResponse } from '../../models';


export interface ApiV1Zatca7B7BaccountId7D7DActivatePost$Params {
  body?: {
  }
}

export function apiV1Zatca7B7BaccountId7D7DActivatePost(http: HttpClient, rootUrl: string, params?: ApiV1Zatca7B7BaccountId7D7DActivatePost$Params, context?: HttpContext): Observable<StrictHttpResponse<Zatca21ActivateZatcaIntegrationResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1Zatca7B7BaccountId7D7DActivatePost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Zatca21ActivateZatcaIntegrationResponse>;
    })
  );
}

apiV1Zatca7B7BaccountId7D7DActivatePost.PATH = '/api/v1/zatca/%7B%7Baccount_id%7D%7D/activate';
