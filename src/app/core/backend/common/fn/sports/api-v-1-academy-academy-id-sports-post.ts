/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SportsAddSportToAcademyResponse } from '../../models/sports-add-sport-to-academy-response';

export interface ApiV1AcademyAcademyIdSportsPost$Params {
  academy_id: string;
      body?: {
'sport_id'?: number;
'color'?: string;
'skill_ids'?: Array<number>;
}
}

export function apiV1AcademyAcademyIdSportsPost(http: HttpClient, rootUrl: string, params: ApiV1AcademyAcademyIdSportsPost$Params, context?: HttpContext): Observable<StrictHttpResponse<SportsAddSportToAcademyResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1AcademyAcademyIdSportsPost.PATH, 'post');
  if (params) {
    rb.path('academy_id', params.academy_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<SportsAddSportToAcademyResponse>;
    })
  );
}

apiV1AcademyAcademyIdSportsPost.PATH = '/api/v1/academy/{academy_id}/sports';
