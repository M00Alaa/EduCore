/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PackagesUpdatePackageResponse } from '../../models/packages-update-package-response';

export interface ApiV1PackagesPackageIdPut$Params {
  package_id: string;
      body?: {
'name'?: string;
'price'?: number;
'sport_id'?: number;
'package_type'?: number;
'duration_type'?: number;
'custom_duration_days'?: null;
'amount'?: number;
'tax_included'?: number;
'branch_ids'?: Array<number>;
}
}

export function apiV1PackagesPackageIdPut(http: HttpClient, rootUrl: string, params: ApiV1PackagesPackageIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<PackagesUpdatePackageResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1PackagesPackageIdPut.PATH, 'put');
  if (params) {
    rb.path('package_id', params.package_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PackagesUpdatePackageResponse>;
    })
  );
}

apiV1PackagesPackageIdPut.PATH = '/api/v1/packages/{package_id}';
