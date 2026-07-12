/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PackagesTogglePackageStatusResponse } from '../../models/packages-toggle-package-status-response';

export interface ApiV1PackagesPackageIdToggleStatusPatch$Params {
  package_id: string;
      body?: {
}
}

export function apiV1PackagesPackageIdToggleStatusPatch(http: HttpClient, rootUrl: string, params: ApiV1PackagesPackageIdToggleStatusPatch$Params, context?: HttpContext): Observable<StrictHttpResponse<PackagesTogglePackageStatusResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1PackagesPackageIdToggleStatusPatch.PATH, 'patch');
  if (params) {
    rb.path('package_id', params.package_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PackagesTogglePackageStatusResponse>;
    })
  );
}

apiV1PackagesPackageIdToggleStatusPatch.PATH = '/api/v1/packages/{package_id}/toggle-status';
