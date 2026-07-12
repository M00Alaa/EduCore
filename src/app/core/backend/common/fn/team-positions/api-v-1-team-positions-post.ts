/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TeamPositionsCreatePositionResponse } from '../../models/team-positions-create-position-response';

export interface ApiV1TeamPositionsPost$Params {
      body?: {
}
}

export function apiV1TeamPositionsPost(http: HttpClient, rootUrl: string, params?: ApiV1TeamPositionsPost$Params, context?: HttpContext): Observable<StrictHttpResponse<TeamPositionsCreatePositionResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1TeamPositionsPost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<TeamPositionsCreatePositionResponse>;
    })
  );
}

apiV1TeamPositionsPost.PATH = '/api/v1/team-positions';
