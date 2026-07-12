/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Promos03GenerateDiscountCodeResponse } from '../../models/promos-03-generate-discount-code-response';

export interface ApiV1AcademyAcademyIdPromosGenerateCodePost$Params {
  academy_id: string;
      body?: {
'length'?: number;
}
}

export function apiV1AcademyAcademyIdPromosGenerateCodePost(http: HttpClient, rootUrl: string, params: ApiV1AcademyAcademyIdPromosGenerateCodePost$Params, context?: HttpContext): Observable<StrictHttpResponse<Promos03GenerateDiscountCodeResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1AcademyAcademyIdPromosGenerateCodePost.PATH, 'post');
  if (params) {
    rb.path('academy_id', params.academy_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Promos03GenerateDiscountCodeResponse>;
    })
  );
}

apiV1AcademyAcademyIdPromosGenerateCodePost.PATH = '/api/v1/academy/{academy_id}/promos/generate-code';
