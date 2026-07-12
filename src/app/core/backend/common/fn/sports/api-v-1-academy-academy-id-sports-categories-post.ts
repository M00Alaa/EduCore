/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SportsAddCategoryResponse } from '../../models/sports-add-category-response';

export interface ApiV1AcademyAcademyIdSportsCategoriesPost$Params {
  academy_id: string;
      body?: {
'title'?: string;
'sport_id'?: number;
}
}

export function apiV1AcademyAcademyIdSportsCategoriesPost(http: HttpClient, rootUrl: string, params: ApiV1AcademyAcademyIdSportsCategoriesPost$Params, context?: HttpContext): Observable<StrictHttpResponse<SportsAddCategoryResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1AcademyAcademyIdSportsCategoriesPost.PATH, 'post');
  if (params) {
    rb.path('academy_id', params.academy_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<SportsAddCategoryResponse>;
    })
  );
}

apiV1AcademyAcademyIdSportsCategoriesPost.PATH = '/api/v1/academy/{academy_id}/sports/categories';
