/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CitiesGetAllCitiesPaginatedResponse } from '../../models/cities-get-all-cities-paginated-response';

export interface ApiV1CitiesGet$Params {
  search: string;
  per_page: string;
  page: string;
      body?: {
}
}

export function apiV1CitiesGet(http: HttpClient, rootUrl: string, params: ApiV1CitiesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<CitiesGetAllCitiesPaginatedResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1CitiesGet.PATH, 'get');
  if (params) {
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
      return r as StrictHttpResponse<CitiesGetAllCitiesPaginatedResponse>;
    })
  );
}

apiV1CitiesGet.PATH = '/api/v1/cities';
