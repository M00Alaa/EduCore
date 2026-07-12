/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { TeamPositionListResponse, TeamPositionSingleResponse } from '../../models/team-position';

// ─── List team positions ────────────────────────────────────────────
export interface ApiV1TeamPositionsGet$Params {
  sport_id?: string;
  status?: string;
  search?: string;
  per_page?: string;
  page?: string;
}

export function apiV1TeamPositionsGet(http: HttpClient, rootUrl: string, params?: ApiV1TeamPositionsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<TeamPositionListResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1TeamPositionsGet.PATH, 'get');
  if (params) {
    rb.query('sport_id', params.sport_id, {});
    rb.query('status', params.status, {});
    rb.query('search', params.search, {});
    rb.query('per_page', params.per_page, {});
    rb.query('page', params.page, {});
  }
  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => r as StrictHttpResponse<TeamPositionListResponse>)
  );
}
apiV1TeamPositionsGet.PATH = '/api/v1/team-positions';

// ─── Create team position ───────────────────────────────────────────
export interface ApiV1TeamPositionsPost$Params {
  body: {
    sport_id: number;
    title: string;
    title_en?: string;
    description?: string;
  };
}

export function apiV1TeamPositionsPost(http: HttpClient, rootUrl: string, params: ApiV1TeamPositionsPost$Params, context?: HttpContext): Observable<StrictHttpResponse<TeamPositionSingleResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1TeamPositionsPost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }
  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => r as StrictHttpResponse<TeamPositionSingleResponse>)
  );
}
apiV1TeamPositionsPost.PATH = '/api/v1/team-positions';

// ─── Update team position ───────────────────────────────────────────
export interface ApiV1TeamPositionsIdPut$Params {
  id: string;
  body: {
    title?: string;
    title_en?: string;
    description?: string;
    status?: number;
  };
}

export function apiV1TeamPositionsIdPut(http: HttpClient, rootUrl: string, params: ApiV1TeamPositionsIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<TeamPositionSingleResponse>> {
  const rb = new RequestBuilder(rootUrl, `/api/v1/team-positions/${params.id}`, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
  }
  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => r as StrictHttpResponse<TeamPositionSingleResponse>)
  );
}

// ─── Delete team position ───────────────────────────────────────────
export interface ApiV1TeamPositionsIdDelete$Params {
  id: string;
}

export function apiV1TeamPositionsIdDelete(http: HttpClient, rootUrl: string, params: ApiV1TeamPositionsIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<TeamPositionSingleResponse>> {
  const rb = new RequestBuilder(rootUrl, `/api/v1/team-positions/${params.id}`, 'delete');
  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => r as StrictHttpResponse<TeamPositionSingleResponse>)
  );
}

// ─── Toggle status ──────────────────────────────────────────────────
export interface ApiV1TeamPositionsIdToggleStatus$Params {
  id: string;
}

export function apiV1TeamPositionsIdToggleStatus(http: HttpClient, rootUrl: string, params: ApiV1TeamPositionsIdToggleStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<TeamPositionSingleResponse>> {
  const rb = new RequestBuilder(rootUrl, `/api/v1/team-positions/${params.id}/toggle-status`, 'patch');
  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => r as StrictHttpResponse<TeamPositionSingleResponse>)
  );
}
