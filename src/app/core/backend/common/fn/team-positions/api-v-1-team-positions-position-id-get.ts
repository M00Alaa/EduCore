/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TeamPositionsGetSinglePositionResponse } from '../../models/team-positions-get-single-position-response';

export interface ApiV1TeamPositionsPositionIdGet$Params {
  position_id: string;
      body?: {
}
}

export function apiV1TeamPositionsPositionIdGet(http: HttpClient, rootUrl: string, params: ApiV1TeamPositionsPositionIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<TeamPositionsGetSinglePositionResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1TeamPositionsPositionIdGet.PATH, 'get');
  if (params) {
    rb.path('position_id', params.position_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<TeamPositionsGetSinglePositionResponse>;
    })
  );
}

apiV1TeamPositionsPositionIdGet.PATH = '/api/v1/team-positions/{position_id}';
