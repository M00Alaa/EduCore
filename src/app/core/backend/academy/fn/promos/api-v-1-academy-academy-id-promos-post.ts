/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Promos04CreatePromoResponse } from '../../models/promos-04-create-promo-response';

export interface ApiV1AcademyAcademyIdPromosPost$Params {
  academy_id: string;
      body?: {
'name'?: string;
'name_en'?: string;
'discount_type'?: string;
'percentage'?: number;
'allow_stack'?: boolean;
'status'?: number;
'scope'?: string;
'discount_code'?: string;
'max_usage'?: number;
}
}

export function apiV1AcademyAcademyIdPromosPost(http: HttpClient, rootUrl: string, params: ApiV1AcademyAcademyIdPromosPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Promos04CreatePromoResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1AcademyAcademyIdPromosPost.PATH, 'post');
  if (params) {
    rb.path('academy_id', params.academy_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Promos04CreatePromoResponse>;
    })
  );
}

apiV1AcademyAcademyIdPromosPost.PATH = '/api/v1/academy/{academy_id}/promos';
