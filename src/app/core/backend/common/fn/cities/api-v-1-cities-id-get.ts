/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CitiesGetCityByIdResponse } from '../../models/cities-get-city-by-id-response';

export interface ApiV1CitiesIdGet$Params {
  id: string;
      body?: {
}
}

export function apiV1CitiesIdGet(http: HttpClient, rootUrl: string, params: ApiV1CitiesIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<CitiesGetCityByIdResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1CitiesIdGet.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CitiesGetCityByIdResponse>;
    })
  );
}

apiV1CitiesIdGet.PATH = '/api/v1/cities/{id}';
