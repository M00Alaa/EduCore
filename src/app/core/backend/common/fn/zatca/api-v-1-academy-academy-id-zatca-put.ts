/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ZatcaCreateUpdateZatcaAccountResponse } from '../../models/zatca-create-update-zatca-account-response';

export interface ApiV1AcademyAcademyIdZatcaPut$Params {
  academy_id: string;
      body?: {
'otp'?: string;
'email'?: string;
'common_name'?: string;
'branch_name'?: string;
'main_branch_name'?: string;
'tax_number'?: string;
'commercial_registration_number'?: string;
'national_address'?: string;
'business_activity'?: string;
'street_name'?: string;
'building_number'?: string;
'plot_identification'?: string;
'city_sub_division'?: string;
'city'?: string;
'postal_number'?: string;
}
}

export function apiV1AcademyAcademyIdZatcaPut(http: HttpClient, rootUrl: string, params: ApiV1AcademyAcademyIdZatcaPut$Params, context?: HttpContext): Observable<StrictHttpResponse<ZatcaCreateUpdateZatcaAccountResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1AcademyAcademyIdZatcaPut.PATH, 'put');
  if (params) {
    rb.path('academy_id', params.academy_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ZatcaCreateUpdateZatcaAccountResponse>;
    })
  );
}

apiV1AcademyAcademyIdZatcaPut.PATH = '/api/v1/academy/{academy_id}/zatca';
