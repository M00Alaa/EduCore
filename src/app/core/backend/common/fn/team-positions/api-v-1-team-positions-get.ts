/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TeamPositionsGetAllPositionsWithFiltersResponse } from '../../models/team-positions-get-all-positions-with-filters-response';

export interface ApiV1TeamPositionsGet$Params {
  status: string;
  search: string;
  per_page: string;
  sport_id: string;
      body?: {
}
}

export function apiV1TeamPositionsGet(http: HttpClient, rootUrl: string, params: ApiV1TeamPositionsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<TeamPositionsGetAllPositionsWithFiltersResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1TeamPositionsGet.PATH, 'get');
  if (params) {
    rb.query('status', params.status, {});
    rb.query('search', params.search, {});
    rb.query('per_page', params.per_page, {});
    rb.query('sport_id', params.sport_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<TeamPositionsGetAllPositionsWithFiltersResponse>;
    })
  );
}

apiV1TeamPositionsGet.PATH = '/api/v1/team-positions';
