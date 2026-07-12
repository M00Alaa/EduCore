/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Promos12ValidatePromoCodeResponse } from '../../models/promos-12-validate-promo-code-response';

export interface ApiV1AcademyAcademyIdPromosValidateCodePost$Params {
  academy_id: string;
      body?: {
'discount_code'?: string;
'scope'?: string;
}
}

export function apiV1AcademyAcademyIdPromosValidateCodePost(http: HttpClient, rootUrl: string, params: ApiV1AcademyAcademyIdPromosValidateCodePost$Params, context?: HttpContext): Observable<StrictHttpResponse<Promos12ValidatePromoCodeResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1AcademyAcademyIdPromosValidateCodePost.PATH, 'post');
  if (params) {
    rb.path('academy_id', params.academy_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Promos12ValidatePromoCodeResponse>;
    })
  );
}

apiV1AcademyAcademyIdPromosValidateCodePost.PATH = '/api/v1/academy/{academy_id}/promos/validate-code';
