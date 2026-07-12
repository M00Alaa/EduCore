/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PackagesCreatePackageResponse } from '../../models/packages-create-package-response';

export interface ApiV1AcademyAcademyIdPackagesPost$Params {
  academy_id: string;
      body?: {
'name'?: string;
'sport_id'?: number;
'academy_id'?: number;
'package_type'?: number;
'classes'?: number;
'custom_duration_days'?: number;
'amount'?: number;
'tax_included'?: number;
'branch_ids'?: Array<number>;
}
}

export function apiV1AcademyAcademyIdPackagesPost(http: HttpClient, rootUrl: string, params: ApiV1AcademyAcademyIdPackagesPost$Params, context?: HttpContext): Observable<StrictHttpResponse<PackagesCreatePackageResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1AcademyAcademyIdPackagesPost.PATH, 'post');
  if (params) {
    rb.path('academy_id', params.academy_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PackagesCreatePackageResponse>;
    })
  );
}

apiV1AcademyAcademyIdPackagesPost.PATH = '/api/v1/academy/{academy_id}/packages';
