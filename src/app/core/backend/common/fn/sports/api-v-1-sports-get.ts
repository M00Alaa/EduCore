/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SportsGetAllSportsPaginatedResponse } from '../../models/sports-get-all-sports-paginated-response';

export interface ApiV1SportsGet$Params {
  search: string;
  status: string;
  is_team: string;
  per_page: string;
  page: string;
      body?: {
}
}

export function apiV1SportsGet(http: HttpClient, rootUrl: string, params: ApiV1SportsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<SportsGetAllSportsPaginatedResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1SportsGet.PATH, 'get');
  if (params) {
    rb.query('search', params.search, {});
    rb.query('status', params.status, {});
    rb.query('is_team', params.is_team, {});
    rb.query('per_page', params.per_page, {});
    rb.query('page', params.page, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<SportsGetAllSportsPaginatedResponse>;
    })
  );
}

apiV1SportsGet.PATH = '/api/v1/sports';
