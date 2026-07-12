/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AcademyCreatewithUserRequestAcademy } from '../../models/academy-createwith-user-request-academy';
import { AcademyCreatewithUserRequestUser } from '../../models/academy-createwith-user-request-user';
import { AcademyCreatewithUserResponse } from '../../models/academy-createwith-user-response';

export interface ApiSubscriptionAcademyCreatePost$Params {
      body?: {
'user'?: AcademyCreatewithUserRequestUser;
'academy'?: AcademyCreatewithUserRequestAcademy;
}
}

export function apiSubscriptionAcademyCreatePost(http: HttpClient, rootUrl: string, params?: ApiSubscriptionAcademyCreatePost$Params, context?: HttpContext): Observable<StrictHttpResponse<AcademyCreatewithUserResponse>> {
  const rb = new RequestBuilder(rootUrl, apiSubscriptionAcademyCreatePost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AcademyCreatewithUserResponse>;
    })
  );
}

apiSubscriptionAcademyCreatePost.PATH = '/api/subscription/academy/create';
