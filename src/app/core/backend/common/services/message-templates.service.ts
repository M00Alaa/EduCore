/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiV1MessageTemplatesGet } from '../fn/message-templates/api-v-1-message-templates-get';
import { ApiV1MessageTemplatesGet$Params } from '../fn/message-templates/api-v-1-message-templates-get';
import { apiV1MessageTemplatesPost } from '../fn/message-templates/api-v-1-message-templates-post';
import { ApiV1MessageTemplatesPost$Params } from '../fn/message-templates/api-v-1-message-templates-post';
import { apiV1MessageTemplatesIdPut } from '../fn/message-templates/api-v-1-message-templates-id-put';
import { ApiV1MessageTemplatesIdPut$Params } from '../fn/message-templates/api-v-1-message-templates-id-put';
import { apiV1MessageTemplatesIdDelete } from '../fn/message-templates/api-v-1-message-templates-id-delete';
import { ApiV1MessageTemplatesIdDelete$Params } from '../fn/message-templates/api-v-1-message-templates-id-delete';
import { apiV1MessageTemplatesIdToggleStatusPatch } from '../fn/message-templates/api-v-1-message-templates-id-toggle-status-patch';
import { ApiV1MessageTemplatesIdToggleStatusPatch$Params } from '../fn/message-templates/api-v-1-message-templates-id-toggle-status-patch';
import { MessageTemplatesListResponse } from '../models/message-templates-list-response';
import { MessageTemplateResponse } from '../models/message-template-response';

@Injectable({ providedIn: 'root' })
export class MessageTemplatesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiV1MessageTemplatesGet()` */
  static readonly ApiV1MessageTemplatesGetPath = '/api/v1/message-templates';

  /**
   * Get all message templates.
   */
  apiV1MessageTemplatesGet$Response(params?: ApiV1MessageTemplatesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<MessageTemplatesListResponse>> {
    return apiV1MessageTemplatesGet(this.http, this.rootUrl, params, context);
  }

  apiV1MessageTemplatesGet(params?: ApiV1MessageTemplatesGet$Params, context?: HttpContext): Observable<MessageTemplatesListResponse> {
    return this.apiV1MessageTemplatesGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<MessageTemplatesListResponse>): MessageTemplatesListResponse => r.body)
    );
  }

  /** Path part for operation `apiV1MessageTemplatesPost()` */
  static readonly ApiV1MessageTemplatesPostPath = '/api/v1/message-templates';

  /**
   * Create new template.
   */
  apiV1MessageTemplatesPost$Response(params: ApiV1MessageTemplatesPost$Params, context?: HttpContext): Observable<StrictHttpResponse<MessageTemplateResponse>> {
    return apiV1MessageTemplatesPost(this.http, this.rootUrl, params, context);
  }

  apiV1MessageTemplatesPost(params: ApiV1MessageTemplatesPost$Params, context?: HttpContext): Observable<MessageTemplateResponse> {
    return this.apiV1MessageTemplatesPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<MessageTemplateResponse>): MessageTemplateResponse => r.body)
    );
  }

  /** Path part for operation `apiV1MessageTemplatesIdPut()` */
  static readonly ApiV1MessageTemplatesIdPutPath = '/api/v1/message-templates/{id}';

  /**
   * Update template.
   */
  apiV1MessageTemplatesIdPut$Response(params: ApiV1MessageTemplatesIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<MessageTemplateResponse>> {
    return apiV1MessageTemplatesIdPut(this.http, this.rootUrl, params, context);
  }

  apiV1MessageTemplatesIdPut(params: ApiV1MessageTemplatesIdPut$Params, context?: HttpContext): Observable<MessageTemplateResponse> {
    return this.apiV1MessageTemplatesIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<MessageTemplateResponse>): MessageTemplateResponse => r.body)
    );
  }

  /** Path part for operation `apiV1MessageTemplatesIdDelete()` */
  static readonly ApiV1MessageTemplatesIdDeletePath = '/api/v1/message-templates/{id}';

  /**
   * Delete template.
   */
  apiV1MessageTemplatesIdDelete$Response(params: ApiV1MessageTemplatesIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return apiV1MessageTemplatesIdDelete(this.http, this.rootUrl, params, context);
  }

  apiV1MessageTemplatesIdDelete(params: ApiV1MessageTemplatesIdDelete$Params, context?: HttpContext): Observable<any> {
    return this.apiV1MessageTemplatesIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `apiV1MessageTemplatesIdToggleStatusPatch()` */
  static readonly ApiV1MessageTemplatesIdToggleStatusPatchPath = '/api/v1/message-templates/{id}/toggle-status';

  /**
   * Toggle template active status.
   */
  apiV1MessageTemplatesIdToggleStatusPatch$Response(params: ApiV1MessageTemplatesIdToggleStatusPatch$Params, context?: HttpContext): Observable<StrictHttpResponse<MessageTemplateResponse>> {
    return apiV1MessageTemplatesIdToggleStatusPatch(this.http, this.rootUrl, params, context);
  }

  apiV1MessageTemplatesIdToggleStatusPatch(params: ApiV1MessageTemplatesIdToggleStatusPatch$Params, context?: HttpContext): Observable<MessageTemplateResponse> {
    return this.apiV1MessageTemplatesIdToggleStatusPatch$Response(params, context).pipe(
      map((r: StrictHttpResponse<MessageTemplateResponse>): MessageTemplateResponse => r.body)
    );
  }
}
