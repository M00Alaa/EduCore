/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TeamPositionsUpdatePositionResponse } from '../../models/team-positions-update-position-response';

export interface ApiV1TeamPositionsPositionIdPut$Params {
  position_id: string;
      body?: {
'title'?: string;
'description'?: string;
'status'?: number;
}
}

export function apiV1TeamPositionsPositionIdPut(http: HttpClient, rootUrl: string, params: ApiV1TeamPositionsPositionIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<TeamPositionsUpdatePositionResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1TeamPositionsPositionIdPut.PATH, 'put');
  if (params) {
    rb.path('position_id', params.position_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<TeamPositionsUpdatePositionResponse>;
    })
  );
}

apiV1TeamPositionsPositionIdPut.PATH = '/api/v1/team-positions/{position_id}';
