/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AcademyUpdateAcademySettingsResponse } from '../../models/academy-update-academy-settings-response';

export interface ApiV1AcademyAcademyIdSettingsPut$Params {
  academy_id: string;
      body?: {
'name'?: string;
'mobile'?: string;
'email'?: string;
'city_id'?: number;
'district_id'?: number;
'latitude'?: number;
'longitude'?: number;
'start_time'?: string;
'end_time'?: string;
'startTime'?: string;
'endTime'?: string;
'working_days'?: Array<string>;
}
}

export function apiV1AcademyAcademyIdSettingsPut(http: HttpClient, rootUrl: string, params: ApiV1AcademyAcademyIdSettingsPut$Params, context?: HttpContext): Observable<StrictHttpResponse<AcademyUpdateAcademySettingsResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1AcademyAcademyIdSettingsPut.PATH, 'put');
  if (params) {
    rb.path('academy_id', params.academy_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AcademyUpdateAcademySettingsResponse>;
    })
  );
}

apiV1AcademyAcademyIdSettingsPut.PATH = '/api/v1/academy/{academy_id}/settings';
