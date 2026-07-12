/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PackagesGetSinglePackageResponse } from '../../models/packages-get-single-package-response';

export interface ApiV1PackagesPackageIdGet$Params {
  package_id: string;
      body?: {
}
}

export function apiV1PackagesPackageIdGet(http: HttpClient, rootUrl: string, params: ApiV1PackagesPackageIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<PackagesGetSinglePackageResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1PackagesPackageIdGet.PATH, 'get');
  if (params) {
    rb.path('package_id', params.package_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PackagesGetSinglePackageResponse>;
    })
  );
}

apiV1PackagesPackageIdGet.PATH = '/api/v1/packages/{package_id}';
