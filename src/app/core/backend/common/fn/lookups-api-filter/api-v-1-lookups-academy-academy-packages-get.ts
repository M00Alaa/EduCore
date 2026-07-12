/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LookupsApiFilterGetPackageListResponse } from '../../models/lookups-api-filter-get-package-list-response';

export interface ApiV1LookupsAcademyAcademyPackagesGet$Params {
  academy: string;
      body?: {
}
}

export function apiV1LookupsAcademyAcademyPackagesGet(http: HttpClient, rootUrl: string, params: ApiV1LookupsAcademyAcademyPackagesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<LookupsApiFilterGetPackageListResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1LookupsAcademyAcademyPackagesGet.PATH, 'get');
  if (params) {
    rb.path('academy', params.academy, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LookupsApiFilterGetPackageListResponse>;
    })
  );
}

apiV1LookupsAcademyAcademyPackagesGet.PATH = '/api/v1/lookups/academy/{academy}/packages';
