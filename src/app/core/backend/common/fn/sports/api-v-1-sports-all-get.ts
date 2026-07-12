/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SportsGetAllSportsNoPaginationResponse } from '../../models/sports-get-all-sports-no-pagination-response';

export interface ApiV1SportsAllGet$Params {
  search: string;
  status: string;
  is_team: string;
      body?: {
}
}

export function apiV1SportsAllGet(http: HttpClient, rootUrl: string, params: ApiV1SportsAllGet$Params, context?: HttpContext): Observable<StrictHttpResponse<SportsGetAllSportsNoPaginationResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1SportsAllGet.PATH, 'get');
  if (params) {
    rb.query('search', params.search, {});
    rb.query('status', params.status, {});
    rb.query('is_team', params.is_team, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<SportsGetAllSportsNoPaginationResponse>;
    })
  );
}

apiV1SportsAllGet.PATH = '/api/v1/sports/all';
