/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TeamPositionsGetActivePositionsOnlyDropdownResponse } from '../../models/team-positions-get-active-positions-only-dropdown-response';

export interface ApiV1SportsSportIdPositionsGet$Params {
  active_only: string;
  sport_id: string;
      body?: {
}
}

export function apiV1SportsSportIdPositionsGet(http: HttpClient, rootUrl: string, params: ApiV1SportsSportIdPositionsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<TeamPositionsGetActivePositionsOnlyDropdownResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1SportsSportIdPositionsGet.PATH, 'get');
  if (params) {
    rb.query('active_only', params.active_only, {});
    rb.path('sport_id', params.sport_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<TeamPositionsGetActivePositionsOnlyDropdownResponse>;
    })
  );
}

apiV1SportsSportIdPositionsGet.PATH = '/api/v1/sports/{sport_id}/positions';
