/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LookupsApiFilterGetSkillCategoriesResponse } from '../../models/lookups-api-filter-get-skill-categories-response';

export interface ApiV1LookupsSkillCategoriesGet$Params {
  sport_id: string;
      body?: {
}
}

export function apiV1LookupsSkillCategoriesGet(http: HttpClient, rootUrl: string, params: ApiV1LookupsSkillCategoriesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<LookupsApiFilterGetSkillCategoriesResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1LookupsSkillCategoriesGet.PATH, 'get');
  if (params) {
    rb.query('sport_id', params.sport_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LookupsApiFilterGetSkillCategoriesResponse>;
    })
  );
}

apiV1LookupsSkillCategoriesGet.PATH = '/api/v1/lookups/skill-categories';
