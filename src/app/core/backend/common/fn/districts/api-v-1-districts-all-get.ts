/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DistrictsGetAllDistrictsNoPaginationResponse } from '../../models/districts-get-all-districts-no-pagination-response';

export interface ApiV1DistrictsAllGet$Params {
  city_id: string;
  search: string;
      body?: {
}
}

export function apiV1DistrictsAllGet(http: HttpClient, rootUrl: string, params: ApiV1DistrictsAllGet$Params, context?: HttpContext): Observable<StrictHttpResponse<DistrictsGetAllDistrictsNoPaginationResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1DistrictsAllGet.PATH, 'get');
  if (params) {
    rb.query('city_id', params.city_id, {});
    rb.query('search', params.search, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<DistrictsGetAllDistrictsNoPaginationResponse>;
    })
  );
}

apiV1DistrictsAllGet.PATH = '/api/v1/districts/all';
