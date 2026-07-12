/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';

import {
    BranchSettingsResponse,
    BranchSettingsItem,
    BranchSettingsUpdateResponse
} from '../models/manual-branch-settings-models';

@Injectable({ providedIn: 'root' })
export class ManualBranchSettingsService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /** Path part for operation `apiV1BranchesIdSettingsGet()` */
    static readonly ApiV1BranchesIdSettingsGetPath = '/api/v1/branches/{id}/settings';

    /**
     * Get Branch Settings.
     *
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `apiV1BranchesIdSettingsGet()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    apiV1BranchesIdSettingsGet$Response(params: { id: number }, context?: HttpContext): Observable<StrictHttpResponse<BranchSettingsResponse>> {
        const rb = new RequestBuilder(this.rootUrl, ManualBranchSettingsService.ApiV1BranchesIdSettingsGetPath, 'get');
        if (params) {
            rb.path('id', params.id, {});
        }

        return this.http.request(
            rb.build({ responseType: 'json', accept: 'application/json', context })
        ).pipe(
            map((r: any) => {
                return r as StrictHttpResponse<BranchSettingsResponse>;
            })
        );
    }

    /**
     * Get Branch Settings.
     *
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `apiV1BranchesIdSettingsGet$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    apiV1BranchesIdSettingsGet(params: { id: number }, context?: HttpContext): Observable<BranchSettingsResponse> {
        return this.apiV1BranchesIdSettingsGet$Response(params, context).pipe(
            map((r: StrictHttpResponse<BranchSettingsResponse>): BranchSettingsResponse => r.body)
        );
    }

    /** Path part for operation `apiV1BranchesIdSettingsPut()` */
    static readonly ApiV1BranchesIdSettingsPutPath = '/api/v1/branches/{id}/settings';

    /**
     * Update Branch Settings.
     *
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `apiV1BranchesIdSettingsPut()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    apiV1BranchesIdSettingsPut$Response(params: { id: number; body: BranchSettingsItem }, context?: HttpContext): Observable<StrictHttpResponse<BranchSettingsUpdateResponse>> {
        const rb = new RequestBuilder(this.rootUrl, ManualBranchSettingsService.ApiV1BranchesIdSettingsPutPath, 'put');
        if (params) {
            rb.path('id', params.id, {});
            rb.body(params.body, 'application/json');
        }

        return this.http.request(
            rb.build({ responseType: 'json', accept: 'application/json', context })
        ).pipe(
            map((r: any) => {
                return r as StrictHttpResponse<BranchSettingsUpdateResponse>;
            })
        );
    }

    /**
     * Update Branch Settings.
     *
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `apiV1BranchesIdSettingsPut$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    apiV1BranchesIdSettingsPut(params: { id: number; body: BranchSettingsItem }, context?: HttpContext): Observable<BranchSettingsUpdateResponse> {
        return this.apiV1BranchesIdSettingsPut$Response(params, context).pipe(
            map((r: StrictHttpResponse<BranchSettingsUpdateResponse>): BranchSettingsUpdateResponse => r.body)
        );
    }
}
