/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AcademyGetAcademyDataResponse } from '../../models/academy-get-academy-data-response';

export interface ApiSubscriptionAcademyGetAcademyDataGet$Params {
  academy_id: string;
      body?: {
}
}

export function apiSubscriptionAcademyGetAcademyDataGet(http: HttpClient, rootUrl: string, params: ApiSubscriptionAcademyGetAcademyDataGet$Params, context?: HttpContext): Observable<StrictHttpResponse<AcademyGetAcademyDataResponse>> {
  const rb = new RequestBuilder(rootUrl, apiSubscriptionAcademyGetAcademyDataGet.PATH, 'get');
  if (params) {
    rb.query('academy_id', params.academy_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AcademyGetAcademyDataResponse>;
    })
  );
}

apiSubscriptionAcademyGetAcademyDataGet.PATH = '/api/subscription/academy/get-academy-data';
