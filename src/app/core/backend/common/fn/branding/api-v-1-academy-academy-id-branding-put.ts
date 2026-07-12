/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BrandingUpdateBrandingColorsLogoResponse } from '../../models/branding-update-branding-colors-logo-response';

export interface ApiV1AcademyAcademyIdBrandingPut$Params {
  academy_id: string;
      body?: {
'primary_color'?: string;
'logo'?: string;
}
}

export function apiV1AcademyAcademyIdBrandingPut(http: HttpClient, rootUrl: string, params: ApiV1AcademyAcademyIdBrandingPut$Params, context?: HttpContext): Observable<StrictHttpResponse<BrandingUpdateBrandingColorsLogoResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1AcademyAcademyIdBrandingPut.PATH, 'put');
  if (params) {
    rb.path('academy_id', params.academy_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BrandingUpdateBrandingColorsLogoResponse>;
    })
  );
}

apiV1AcademyAcademyIdBrandingPut.PATH = '/api/v1/academy/{academy_id}/branding';
