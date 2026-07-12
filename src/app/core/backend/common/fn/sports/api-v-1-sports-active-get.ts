/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SportsGetActiveSportsOnlyResponse } from '../../models/sports-get-active-sports-only-response';

export interface ApiV1SportsActiveGet$Params {
  search: string;
  is_team: string;
      body?: {
}
}

export function apiV1SportsActiveGet(http: HttpClient, rootUrl: string, params: ApiV1SportsActiveGet$Params, context?: HttpContext): Observable<StrictHttpResponse<SportsGetActiveSportsOnlyResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1SportsActiveGet.PATH, 'get');
  if (params) {
    rb.query('search', params.search, {});
    rb.query('is_team', params.is_team, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<SportsGetActiveSportsOnlyResponse>;
    })
  );
}

apiV1SportsActiveGet.PATH = '/api/v1/sports/active';
