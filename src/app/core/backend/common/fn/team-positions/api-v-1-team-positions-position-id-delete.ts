/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TeamPositionsDeletePositionResponse } from '../../models/team-positions-delete-position-response';

export interface ApiV1TeamPositionsPositionIdDelete$Params {
  position_id: string;
      body?: {
}
}

export function apiV1TeamPositionsPositionIdDelete(http: HttpClient, rootUrl: string, params: ApiV1TeamPositionsPositionIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<TeamPositionsDeletePositionResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1TeamPositionsPositionIdDelete.PATH, 'delete');
  if (params) {
    rb.path('position_id', params.position_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<TeamPositionsDeletePositionResponse>;
    })
  );
}

apiV1TeamPositionsPositionIdDelete.PATH = '/api/v1/team-positions/{position_id}';
