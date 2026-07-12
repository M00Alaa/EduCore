/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SportsAddSkillResponse } from '../../models/sports-add-skill-response';

export interface ApiV1AcademyAcademyIdSportsSportIdSkillsPost$Params {
  academy_id: string;
  sport_id: string;
      body?: {
'title'?: string;
'category_id'?: number;
}
}

export function apiV1AcademyAcademyIdSportsSportIdSkillsPost(http: HttpClient, rootUrl: string, params: ApiV1AcademyAcademyIdSportsSportIdSkillsPost$Params, context?: HttpContext): Observable<StrictHttpResponse<SportsAddSkillResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1AcademyAcademyIdSportsSportIdSkillsPost.PATH, 'post');
  if (params) {
    rb.path('academy_id', params.academy_id, {});
    rb.path('sport_id', params.sport_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<SportsAddSkillResponse>;
    })
  );
}

apiV1AcademyAcademyIdSportsSportIdSkillsPost.PATH = '/api/v1/academy/{academy_id}/sports/{sport_id}/skills';
