/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PackagesDeletePackageResponse } from '../../models/packages-delete-package-response';

export interface ApiV1PackagesPackageIdDelete$Params {
  package_id: string;
      body?: {
}
}

export function apiV1PackagesPackageIdDelete(http: HttpClient, rootUrl: string, params: ApiV1PackagesPackageIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<PackagesDeletePackageResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1PackagesPackageIdDelete.PATH, 'delete');
  if (params) {
    rb.path('package_id', params.package_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PackagesDeletePackageResponse>;
    })
  );
}

apiV1PackagesPackageIdDelete.PATH = '/api/v1/packages/{package_id}';
