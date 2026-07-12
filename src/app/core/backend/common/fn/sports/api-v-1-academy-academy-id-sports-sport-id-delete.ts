/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SportsDeleteSportResponse } from '../../models/sports-delete-sport-response';

export interface ApiV1AcademyAcademyIdSportsSportIdDelete$Params {
  academy_id: string;
  sport_id: string;
      body?: {
}
}

export function apiV1AcademyAcademyIdSportsSportIdDelete(http: HttpClient, rootUrl: string, params: ApiV1AcademyAcademyIdSportsSportIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<SportsDeleteSportResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1AcademyAcademyIdSportsSportIdDelete.PATH, 'delete');
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
      return r as StrictHttpResponse<SportsDeleteSportResponse>;
    })
  );
}

apiV1AcademyAcademyIdSportsSportIdDelete.PATH = '/api/v1/academy/{academy_id}/sports/{sport_id}';
