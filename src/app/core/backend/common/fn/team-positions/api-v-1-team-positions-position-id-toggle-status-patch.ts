/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TeamPositionsTogglePositionStatusResponse } from '../../models/team-positions-toggle-position-status-response';

export interface ApiV1TeamPositionsPositionIdToggleStatusPatch$Params {
  position_id: string;
      body?: {
}
}

export function apiV1TeamPositionsPositionIdToggleStatusPatch(http: HttpClient, rootUrl: string, params: ApiV1TeamPositionsPositionIdToggleStatusPatch$Params, context?: HttpContext): Observable<StrictHttpResponse<TeamPositionsTogglePositionStatusResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1TeamPositionsPositionIdToggleStatusPatch.PATH, 'patch');
  if (params) {
    rb.path('position_id', params.position_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<TeamPositionsTogglePositionStatusResponse>;
    })
  );
}

apiV1TeamPositionsPositionIdToggleStatusPatch.PATH = '/api/v1/team-positions/{position_id}/toggle-status';
