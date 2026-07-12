/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TeamPositionsBulkCreatePositionsResponse } from '../../models/team-positions-bulk-create-positions-response';

export interface ApiV1SportsSportIdPositionsBulkPost$Params {
  sport_id: string;
      body?: {
}
}

export function apiV1SportsSportIdPositionsBulkPost(http: HttpClient, rootUrl: string, params: ApiV1SportsSportIdPositionsBulkPost$Params, context?: HttpContext): Observable<StrictHttpResponse<TeamPositionsBulkCreatePositionsResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1SportsSportIdPositionsBulkPost.PATH, 'post');
  if (params) {
    rb.path('sport_id', params.sport_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<TeamPositionsBulkCreatePositionsResponse>;
    })
  );
}

apiV1SportsSportIdPositionsBulkPost.PATH = '/api/v1/sports/{sport_id}/positions/bulk';
