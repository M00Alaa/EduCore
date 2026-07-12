/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SportsUpdateSportResponse } from '../../models/sports-update-sport-response';

export interface ApiV1AcademyAcademyIdSportsSportIdPut$Params {
  academy_id: string;
  sport_id: string;
      body?: {
'color'?: string;
'skill_ids'?: Array<number>;
}
}

export function apiV1AcademyAcademyIdSportsSportIdPut(http: HttpClient, rootUrl: string, params: ApiV1AcademyAcademyIdSportsSportIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<SportsUpdateSportResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1AcademyAcademyIdSportsSportIdPut.PATH, 'put');
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
      return r as StrictHttpResponse<SportsUpdateSportResponse>;
    })
  );
}

apiV1AcademyAcademyIdSportsSportIdPut.PATH = '/api/v1/academy/{academy_id}/sports/{sport_id}';
