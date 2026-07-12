import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { errorCallback } from 'src/app/app-const';
import {
    PermissionGroup, PermissionGroupLookups, PermissionGroupPayload,
    PermissionUser, PermissionUserLookups, PermissionUserPayload,
    PaginatedResult, ApiEnvelope, ApiPaginatedPayload, ApiPaginationMeta
} from '../models/permissions.model';

@Injectable({ providedIn: 'root' })
export class PermissionsService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    listGroups(academyId: string, params: { page?: number; per_page?: number; search?: string; is_active?: boolean | number } = {}): Observable<PaginatedResult<PermissionGroup>> {
        return this.http
            .get<ApiEnvelope<ApiPaginatedPayload<PermissionGroup>>>(`${this.rootUrl}/api/v1/academy/${academyId}/permission-groups`, {
                params: this.requestBuilder(params as Record<string, unknown>)
            })
            .pipe(
                map((response) => this.normalizePaginated(this.unwrap(response))),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    getGroupLookups(academyId: string): Observable<PermissionGroupLookups> {
        return this.http
            .get<ApiEnvelope<PermissionGroupLookups>>(`${this.rootUrl}/api/v1/academy/${academyId}/permission-groups/lookups`)
            .pipe(
                map((response) => this.unwrap(response)),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    getGroup(academyId: string, groupKey: string): Observable<PermissionGroup> {
        return this.http
            .get<ApiEnvelope<PermissionGroup>>(`${this.rootUrl}/api/v1/academy/${academyId}/permission-groups/${groupKey}`)
            .pipe(
                map((response) => this.unwrap(response)),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    createGroup(academyId: string, payload: PermissionGroupPayload): Observable<PermissionGroup> {
        return this.http
            .post<ApiEnvelope<PermissionGroup>>(`${this.rootUrl}/api/v1/academy/${academyId}/permission-groups`, payload)
            .pipe(
                map((response) => this.unwrap(response)),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    updateGroup(academyId: string, groupKey: string, payload: Partial<PermissionGroupPayload>): Observable<PermissionGroup> {
        return this.http
            .put<ApiEnvelope<PermissionGroup>>(`${this.rootUrl}/api/v1/academy/${academyId}/permission-groups/${groupKey}`, payload)
            .pipe(
                map((response) => this.unwrap(response)),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    deleteGroup(academyId: string, groupKey: string): Observable<void> {
        return this.http
            .delete<ApiEnvelope<unknown>>(`${this.rootUrl}/api/v1/academy/${academyId}/permission-groups/${groupKey}`)
            .pipe(
                map(() => void 0),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    listUsers(academyId: string, params: { page?: number; per_page?: number; search?: string; role_key?: string; activity?: string } = {}): Observable<PaginatedResult<PermissionUser>> {
        return this.http
            .get<ApiEnvelope<ApiPaginatedPayload<PermissionUser>>>(`${this.rootUrl}/api/v1/academy/${academyId}/permission-users`, {
                params: this.requestBuilder(params as Record<string, unknown>)
            })
            .pipe(
                map((response) => this.normalizePaginated(this.unwrap(response))),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    getUserLookups(academyId: string, cityId?: number | null): Observable<PermissionUserLookups> {
        const params = cityId ? { city_id: cityId } : {};
        return this.http
            .get<ApiEnvelope<PermissionUserLookups>>(`${this.rootUrl}/api/v1/academy/${academyId}/permission-users/lookups`, {
                params: this.requestBuilder(params as Record<string, unknown>)
            })
            .pipe(
                map((response) => this.unwrap(response)),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    getUser(academyId: string, userId: number): Observable<PermissionUser> {
        return this.http
            .get<ApiEnvelope<PermissionUser>>(`${this.rootUrl}/api/v1/academy/${academyId}/permission-users/${userId}`)
            .pipe(
                map((response) => this.unwrap(response)),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    createUser(academyId: string, payload: PermissionUserPayload): Observable<PermissionUser> {
        return this.http
            .post<ApiEnvelope<PermissionUser>>(`${this.rootUrl}/api/v1/academy/${academyId}/permission-users`, payload)
            .pipe(
                map((response) => this.unwrap(response)),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    updateUser(academyId: string, userId: number, payload: Partial<PermissionUserPayload>): Observable<PermissionUser> {
        return this.http
            .put<ApiEnvelope<PermissionUser>>(`${this.rootUrl}/api/v1/academy/${academyId}/permission-users/${userId}`, payload)
            .pipe(
                map((response) => this.unwrap(response)),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    deleteUser(academyId: string, userId: number): Observable<void> {
        return this.http
            .delete<ApiEnvelope<unknown>>(`${this.rootUrl}/api/v1/academy/${academyId}/permission-users/${userId}`)
            .pipe(
                map(() => void 0),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    toggleUserStatus(academyId: string, userId: number, isActive: boolean): Observable<PermissionUser> {
        return this.http
            .patch<ApiEnvelope<PermissionUser>>(`${this.rootUrl}/api/v1/academy/${academyId}/permission-users/${userId}/toggle-status`, { is_active: isActive })
            .pipe(
                map((response) => this.unwrap(response)),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    private unwrap<T>(response: ApiEnvelope<T>): T {
        return response?.data as T;
    }

    private normalizePaginated<T>(payload: ApiPaginatedPayload<T> | undefined): PaginatedResult<T> {
        const fallbackMeta: ApiPaginationMeta = {
            current_page: 1, last_page: 1, per_page: 10, total: 0,
        };
        if (!payload) return { items: [], meta: fallbackMeta, links: {} };
        return {
            items: payload.data ?? [],
            meta: {
                current_page: payload.meta?.current_page ?? fallbackMeta.current_page,
                last_page: payload.meta?.last_page ?? fallbackMeta.last_page,
                per_page: payload.meta?.per_page ?? fallbackMeta.per_page,
                total: payload.meta?.total ?? (payload.data?.length ?? fallbackMeta.total),
            },
            links: payload.links ?? {},
        };
    }

    protected requestBuilder(params: Record<string, unknown>): HttpParams {
        let httpParams = new HttpParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value === undefined || value === null || value === '') return;
            if (Array.isArray(value)) {
                value.forEach((entry) => {
                    if (entry !== undefined && entry !== null && entry !== '') {
                        httpParams = httpParams.append(`${key}[]`, String(entry));
                    }
                });
                return;
            }
            httpParams = httpParams.set(key, String(value));
        });
        return httpParams;
    }
}
