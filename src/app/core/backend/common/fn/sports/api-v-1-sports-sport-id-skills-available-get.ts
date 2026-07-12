/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SportsGetAvailableSkillsResponse } from '../../models/sports-get-available-skills-response';

export interface ApiV1SportsSportIdSkillsAvailableGet$Params {
  sport_id: string;
  academy_id?: string | number;
      body?: {
}
}

export function apiV1SportsSportIdSkillsAvailableGet(http: HttpClient, rootUrl: string, params: ApiV1SportsSportIdSkillsAvailableGet$Params, context?: HttpContext): Observable<StrictHttpResponse<SportsGetAvailableSkillsResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1SportsSportIdSkillsAvailableGet.PATH, 'get');
  if (params) {
    rb.path('sport_id', params.sport_id, {});
    rb.query('academy_id', params.academy_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<SportsGetAvailableSkillsResponse>;
    })
  );
}

apiV1SportsSportIdSkillsAvailableGet.PATH = '/api/v1/sports/{sport_id}/skills/available';
