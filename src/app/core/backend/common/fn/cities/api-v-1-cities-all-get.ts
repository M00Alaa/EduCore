/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CitiesGetAllCitiesNoPaginationResponse } from '../../models/cities-get-all-cities-no-pagination-response';

export interface ApiV1CitiesAllGet$Params {
  search: string;
      body?: {
}
}

export function apiV1CitiesAllGet(http: HttpClient, rootUrl: string, params: ApiV1CitiesAllGet$Params, context?: HttpContext): Observable<StrictHttpResponse<CitiesGetAllCitiesNoPaginationResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1CitiesAllGet.PATH, 'get');
  if (params) {
    rb.query('search', params.search, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CitiesGetAllCitiesNoPaginationResponse>;
    })
  );
}

apiV1CitiesAllGet.PATH = '/api/v1/cities/all';
