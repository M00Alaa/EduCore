/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ZatcaFinancialSettingsResponse } from '../../models/zatca-financial-settings-response';

export interface ApiV1AcademyAcademyFinancialSettingsGet$Params {
  academy: string;
      body?: {
}
}

export function apiV1AcademyAcademyFinancialSettingsGet(http: HttpClient, rootUrl: string, params: ApiV1AcademyAcademyFinancialSettingsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<ZatcaFinancialSettingsResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1AcademyAcademyFinancialSettingsGet.PATH, 'get');
  if (params) {
    rb.path('academy', params.academy, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ZatcaFinancialSettingsResponse>;
    })
  );
}

apiV1AcademyAcademyFinancialSettingsGet.PATH = '/api/v1/academy/{academy}/financial-settings';
