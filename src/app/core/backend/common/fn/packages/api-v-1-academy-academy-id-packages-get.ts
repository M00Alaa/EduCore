/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PackagesGetAllPackagesResponse } from '../../models/packages-get-all-packages-response';

export interface ApiV1AcademyAcademyIdPackagesGet$Params {
  type: string;
  status: string;
  branch: string;
  activity?: string;
  amount_from?: string | number;
  amount_to?: string | number;
  search?: string;
  per_page?: string | number;
  page?: string | number;
  academy_id: string;
  body?: {
  }
}

export function apiV1AcademyAcademyIdPackagesGet(http: HttpClient, rootUrl: string, params: ApiV1AcademyAcademyIdPackagesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<PackagesGetAllPackagesResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1AcademyAcademyIdPackagesGet.PATH, 'get');
  if (params) {
    rb.query('type', params.type, {});
    rb.query('status', params.status, {});
    rb.query('branch', params.branch, {});
    rb.query('activity', params.activity, {});
    rb.query('amount_from', params.amount_from, {});
    rb.query('amount_to', params.amount_to, {});
    rb.query('search', params.search, {});
    rb.query('per_page', params.per_page, {});
    rb.query('page', params.page, {});
    rb.path('academy_id', params.academy_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PackagesGetAllPackagesResponse>;
    })
  );
}

apiV1AcademyAcademyIdPackagesGet.PATH = '/api/v1/academy/{academy_id}/packages';
