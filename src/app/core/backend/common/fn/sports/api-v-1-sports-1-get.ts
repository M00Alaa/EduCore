/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SportsGetSportByIdResponse } from '../../models/sports-get-sport-by-id-response';

export interface ApiV1Sports1Get$Params {
      body?: {
}
}

export function apiV1Sports1Get(http: HttpClient, rootUrl: string, params?: ApiV1Sports1Get$Params, context?: HttpContext): Observable<StrictHttpResponse<SportsGetSportByIdResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1Sports1Get.PATH, 'get');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<SportsGetSportByIdResponse>;
    })
  );
}

apiV1Sports1Get.PATH = '/api/v1/sports/1';
