/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BrandingGenerateColorPaletteResponse } from '../../models/branding-generate-color-palette-response';

export interface ApiV1BrandingColorPalettePost$Params {
      body?: {
'color'?: string;
}
}

export function apiV1BrandingColorPalettePost(http: HttpClient, rootUrl: string, params?: ApiV1BrandingColorPalettePost$Params, context?: HttpContext): Observable<StrictHttpResponse<BrandingGenerateColorPaletteResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1BrandingColorPalettePost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BrandingGenerateColorPaletteResponse>;
    })
  );
}

apiV1BrandingColorPalettePost.PATH = '/api/v1/branding/color-palette';
