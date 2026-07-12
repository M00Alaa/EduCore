/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CitiesGetCityDistrictsResponse } from '../../models/cities-get-city-districts-response';

export interface ApiV1CitiesCityIdDistrictsGet$Params {
  city_id: string;
      body?: {
}
}

export function apiV1CitiesCityIdDistrictsGet(http: HttpClient, rootUrl: string, params: ApiV1CitiesCityIdDistrictsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<CitiesGetCityDistrictsResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1CitiesCityIdDistrictsGet.PATH, 'get');
  if (params) {
    rb.path('city_id', params.city_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CitiesGetCityDistrictsResponse>;
    })
  );
}

apiV1CitiesCityIdDistrictsGet.PATH = '/api/v1/cities/{city_id}/districts';
