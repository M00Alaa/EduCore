/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DistrictsGetAllDistrictsPaginatedResponse } from '../../models/districts-get-all-districts-paginated-response';

export interface ApiV1DistrictsGet$Params {
  city_id: string;
  search: string;
  per_page: string;
  page: string;
      body?: {
}
}

export function apiV1DistrictsGet(http: HttpClient, rootUrl: string, params: ApiV1DistrictsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<DistrictsGetAllDistrictsPaginatedResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1DistrictsGet.PATH, 'get');
  if (params) {
    rb.query('city_id', params.city_id, {});
    rb.query('search', params.search, {});
    rb.query('per_page', params.per_page, {});
    rb.query('page', params.page, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<DistrictsGetAllDistrictsPaginatedResponse>;
    })
  );
}

apiV1DistrictsGet.PATH = '/api/v1/districts';
