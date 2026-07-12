/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiV1AcademyAcademyIdPackagesGet } from '../fn/packages/api-v-1-academy-academy-id-packages-get';
import { ApiV1AcademyAcademyIdPackagesGet$Params } from '../fn/packages/api-v-1-academy-academy-id-packages-get';
import { apiV1AcademyAcademyIdPackagesPost } from '../fn/packages/api-v-1-academy-academy-id-packages-post';
import { ApiV1AcademyAcademyIdPackagesPost$Params } from '../fn/packages/api-v-1-academy-academy-id-packages-post';
import { apiV1PackagesPackageIdDelete } from '../fn/packages/api-v-1-packages-package-id-delete';
import { ApiV1PackagesPackageIdDelete$Params } from '../fn/packages/api-v-1-packages-package-id-delete';
import { apiV1PackagesPackageIdGet } from '../fn/packages/api-v-1-packages-package-id-get';
import { ApiV1PackagesPackageIdGet$Params } from '../fn/packages/api-v-1-packages-package-id-get';
import { apiV1PackagesPackageIdPut } from '../fn/packages/api-v-1-packages-package-id-put';
import { ApiV1PackagesPackageIdPut$Params } from '../fn/packages/api-v-1-packages-package-id-put';
import { apiV1PackagesPackageIdToggleStatusPatch } from '../fn/packages/api-v-1-packages-package-id-toggle-status-patch';
import { ApiV1PackagesPackageIdToggleStatusPatch$Params } from '../fn/packages/api-v-1-packages-package-id-toggle-status-patch';
import { PackagesCreatePackageResponse } from '../models/packages-create-package-response';
import { PackagesDeletePackageResponse } from '../models/packages-delete-package-response';
import { PackagesGetAllPackagesResponse } from '../models/packages-get-all-packages-response';
import { PackagesGetSinglePackageResponse } from '../models/packages-get-single-package-response';
import { PackagesTogglePackageStatusResponse } from '../models/packages-toggle-package-status-response';
import { PackagesUpdatePackageResponse } from '../models/packages-update-package-response';

@Injectable({ providedIn: 'root' })
export class PackagesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiV1AcademyAcademyIdPackagesGet()` */
  static readonly ApiV1AcademyAcademyIdPackagesGetPath = '/api/v1/academy/{academy_id}/packages';

  /**
   * Get All Packages.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AcademyAcademyIdPackagesGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdPackagesGet$Response(params: ApiV1AcademyAcademyIdPackagesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<PackagesGetAllPackagesResponse>> {
    return apiV1AcademyAcademyIdPackagesGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get All Packages.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AcademyAcademyIdPackagesGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdPackagesGet(params: ApiV1AcademyAcademyIdPackagesGet$Params, context?: HttpContext): Observable<PackagesGetAllPackagesResponse> {
    return this.apiV1AcademyAcademyIdPackagesGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<PackagesGetAllPackagesResponse>): PackagesGetAllPackagesResponse => r.body)
    );
  }

  /** Path part for operation `apiV1AcademyAcademyIdPackagesPost()` */
  static readonly ApiV1AcademyAcademyIdPackagesPostPath = '/api/v1/academy/{academy_id}/packages';

  /**
   * Create Package.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AcademyAcademyIdPackagesPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdPackagesPost$Response(params: ApiV1AcademyAcademyIdPackagesPost$Params, context?: HttpContext): Observable<StrictHttpResponse<PackagesCreatePackageResponse>> {
    return apiV1AcademyAcademyIdPackagesPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Create Package.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AcademyAcademyIdPackagesPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdPackagesPost(params: ApiV1AcademyAcademyIdPackagesPost$Params, context?: HttpContext): Observable<PackagesCreatePackageResponse> {
    return this.apiV1AcademyAcademyIdPackagesPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<PackagesCreatePackageResponse>): PackagesCreatePackageResponse => r.body)
    );
  }

  /** Path part for operation `apiV1PackagesPackageIdGet()` */
  static readonly ApiV1PackagesPackageIdGetPath = '/api/v1/packages/{package_id}';

  /**
   * Get Single Package.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1PackagesPackageIdGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1PackagesPackageIdGet$Response(params: ApiV1PackagesPackageIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<PackagesGetSinglePackageResponse>> {
    return apiV1PackagesPackageIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Single Package.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1PackagesPackageIdGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1PackagesPackageIdGet(params: ApiV1PackagesPackageIdGet$Params, context?: HttpContext): Observable<PackagesGetSinglePackageResponse> {
    return this.apiV1PackagesPackageIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<PackagesGetSinglePackageResponse>): PackagesGetSinglePackageResponse => r.body)
    );
  }

  /** Path part for operation `apiV1PackagesPackageIdPut()` */
  static readonly ApiV1PackagesPackageIdPutPath = '/api/v1/packages/{package_id}';

  /**
   * Update Package.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1PackagesPackageIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1PackagesPackageIdPut$Response(params: ApiV1PackagesPackageIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<PackagesUpdatePackageResponse>> {
    return apiV1PackagesPackageIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Package.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1PackagesPackageIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1PackagesPackageIdPut(params: ApiV1PackagesPackageIdPut$Params, context?: HttpContext): Observable<PackagesUpdatePackageResponse> {
    return this.apiV1PackagesPackageIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<PackagesUpdatePackageResponse>): PackagesUpdatePackageResponse => r.body)
    );
  }

  /** Path part for operation `apiV1PackagesPackageIdDelete()` */
  static readonly ApiV1PackagesPackageIdDeletePath = '/api/v1/packages/{package_id}';

  /**
   * Delete Package.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1PackagesPackageIdDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1PackagesPackageIdDelete$Response(params: ApiV1PackagesPackageIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<PackagesDeletePackageResponse>> {
    return apiV1PackagesPackageIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete Package.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1PackagesPackageIdDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1PackagesPackageIdDelete(params: ApiV1PackagesPackageIdDelete$Params, context?: HttpContext): Observable<PackagesDeletePackageResponse> {
    return this.apiV1PackagesPackageIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<PackagesDeletePackageResponse>): PackagesDeletePackageResponse => r.body)
    );
  }

  /** Path part for operation `apiV1PackagesPackageIdToggleStatusPatch()` */
  static readonly ApiV1PackagesPackageIdToggleStatusPatchPath = '/api/v1/packages/{package_id}/toggle-status';

  /**
   * Toggle Package Status.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1PackagesPackageIdToggleStatusPatch()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1PackagesPackageIdToggleStatusPatch$Response(params: ApiV1PackagesPackageIdToggleStatusPatch$Params, context?: HttpContext): Observable<StrictHttpResponse<PackagesTogglePackageStatusResponse>> {
    return apiV1PackagesPackageIdToggleStatusPatch(this.http, this.rootUrl, params, context);
  }

  /**
   * Toggle Package Status.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1PackagesPackageIdToggleStatusPatch$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1PackagesPackageIdToggleStatusPatch(params: ApiV1PackagesPackageIdToggleStatusPatch$Params, context?: HttpContext): Observable<PackagesTogglePackageStatusResponse> {
    return this.apiV1PackagesPackageIdToggleStatusPatch$Response(params, context).pipe(
      map((r: StrictHttpResponse<PackagesTogglePackageStatusResponse>): PackagesTogglePackageStatusResponse => r.body)
    );
  }

}
