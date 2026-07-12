/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BrandingGetBrandingColorsLogoResponse } from '../../models/branding-get-branding-colors-logo-response';

export interface ApiV1AcademyAcademyIdBrandingGet$Params {
  academy_id: string;
      body?: {
}
}

export function apiV1AcademyAcademyIdBrandingGet(http: HttpClient, rootUrl: string, params: ApiV1AcademyAcademyIdBrandingGet$Params, context?: HttpContext): Observable<StrictHttpResponse<BrandingGetBrandingColorsLogoResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1AcademyAcademyIdBrandingGet.PATH, 'get');
  if (params) {
    rb.path('academy_id', params.academy_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BrandingGetBrandingColorsLogoResponse>;
    })
  );
}

apiV1AcademyAcademyIdBrandingGet.PATH = '/api/v1/academy/{academy_id}/branding';
