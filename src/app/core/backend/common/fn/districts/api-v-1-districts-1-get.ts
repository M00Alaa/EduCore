/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DistrictsGetDistrictByIdResponse } from '../../models/districts-get-district-by-id-response';

export interface ApiV1Districts1Get$Params {
      body?: {
}
}

export function apiV1Districts1Get(http: HttpClient, rootUrl: string, params?: ApiV1Districts1Get$Params, context?: HttpContext): Observable<StrictHttpResponse<DistrictsGetDistrictByIdResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1Districts1Get.PATH, 'get');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<DistrictsGetDistrictByIdResponse>;
    })
  );
}

apiV1Districts1Get.PATH = '/api/v1/districts/1';
