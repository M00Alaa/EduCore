import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, shareReplay, throwError } from 'rxjs';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { errorCallback } from 'src/app/app-const';
import {
    AssetItem, AssetLookups, AssetMainCategory, AssetSubCategory, PaginatedResult,
    AssetListParams, MainCategoryListParams, SubCategoryListParams,
    AssetPayload, MainCategoryPayload, StandaloneSubCategoryPayload, SubCategoryPayload,
    ApiEnvelope, ApiPaginatedPayload
} from '../models/equipment.model';

@Injectable({ providedIn: 'root' })
export class EquipmentService extends BaseService {
    private readonly lookupsCache = new Map<string, Observable<AssetLookups>>();

    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    listAssets(academyId: string, params: AssetListParams = {}): Observable<PaginatedResult<AssetItem>> {
        return this.http
            .get<ApiEnvelope<ApiPaginatedPayload<AssetItem>>>(`${this.rootUrl}/api/v1/academy/${academyId}/assets`, {
                params: this.requestBuilder(params as Record<string, unknown>)
            })
            .pipe(
                map((response) => this.normalizePaginated(this.unwrap(response))),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            ) as unknown as Observable<PaginatedResult<AssetItem>>;
    }

    getAssetLookups(academyId: string, forceRefresh = false): Observable<AssetLookups> {
        if (forceRefresh) {
            this.lookupsCache.delete(academyId);
        }

        const cachedRequest = this.lookupsCache.get(academyId);
        if (cachedRequest) {
            return cachedRequest;
        }

        const request = this.http
            .get<ApiEnvelope<AssetLookups>>(`${this.rootUrl}/api/v1/academy/${academyId}/assets/lookups`)
            .pipe(
                map((response) => this.unwrap(response)),
                shareReplay({ bufferSize: 1, refCount: true }),
                catchError((error) => {
                    this.lookupsCache.delete(academyId);
                    errorCallback(error);
                    return throwError(() => error);
                })
            );

        this.lookupsCache.set(academyId, request);
        return request;
    }

    invalidateLookups(academyId?: string): void {
        if (academyId) {
            this.lookupsCache.delete(academyId);
            return;
        }
        this.lookupsCache.clear();
    }

    createAsset(academyId: string, payload: AssetPayload): Observable<AssetItem> {
        return this.http
            .post<ApiEnvelope<AssetItem>>(`${this.rootUrl}/api/v1/academy/${academyId}/assets`, payload)
            .pipe(
                map((response) => this.unwrap(response)),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    updateAsset(assetId: number, payload: Partial<AssetPayload>): Observable<AssetItem> {
        return this.http
            .put<ApiEnvelope<AssetItem>>(`${this.rootUrl}/api/v1/assets/${assetId}`, payload)
            .pipe(
                map((response) => this.unwrap(response)),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    deleteAsset(assetId: number): Observable<void> {
        return this.http
            .delete<ApiEnvelope<unknown>>(`${this.rootUrl}/api/v1/assets/${assetId}`)
            .pipe(
                map(() => void 0),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    listMainCategories(academyId: string, params: MainCategoryListParams = {}): Observable<PaginatedResult<AssetMainCategory>> {
        return this.http
            .get<ApiEnvelope<ApiPaginatedPayload<AssetMainCategory>>>(`${this.rootUrl}/api/v1/academy/${academyId}/asset-main-categories`, {
                params: this.requestBuilder(params as Record<string, unknown>)
            })
            .pipe(
                map((response) => this.normalizePaginated(this.unwrap(response))),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    listSubCategories(academyId: string, params: SubCategoryListParams = {}): Observable<AssetSubCategory[]> {
        return this.http
            .get<ApiEnvelope<AssetSubCategory[]>>(`${this.rootUrl}/api/v1/academy/${academyId}/asset-sub-categories`, {
                params: this.requestBuilder(params as Record<string, unknown>)
            })
            .pipe(
                map((response) => this.unwrap(response) || []),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    createMainCategory(academyId: string, payload: MainCategoryPayload): Observable<AssetMainCategory> {
        return this.http
            .post<ApiEnvelope<AssetMainCategory>>(`${this.rootUrl}/api/v1/academy/${academyId}/asset-main-categories`, payload)
            .pipe(
                map((response) => this.unwrap(response)),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    updateMainCategory(categoryId: number, payload: Partial<MainCategoryPayload>): Observable<AssetMainCategory> {
        return this.http
            .put<ApiEnvelope<AssetMainCategory>>(`${this.rootUrl}/api/v1/asset-main-categories/${categoryId}`, payload)
            .pipe(
                map((response) => this.unwrap(response)),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    deleteMainCategory(categoryId: number): Observable<void> {
        return this.http
            .delete<ApiEnvelope<unknown>>(`${this.rootUrl}/api/v1/asset-main-categories/${categoryId}`)
            .pipe(
                map(() => void 0),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    createSubCategory(academyId: string, payload: StandaloneSubCategoryPayload): Observable<AssetSubCategory> {
        return this.http
            .post<ApiEnvelope<AssetSubCategory>>(`${this.rootUrl}/api/v1/academy/${academyId}/asset-sub-categories`, payload)
            .pipe(
                map((response) => this.unwrap(response)),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    updateSubCategory(subCategoryId: number, payload: Partial<StandaloneSubCategoryPayload>): Observable<AssetSubCategory> {
        return this.http
            .put<ApiEnvelope<AssetSubCategory>>(`${this.rootUrl}/api/v1/asset-sub-categories/${subCategoryId}`, payload)
            .pipe(
                map((response) => this.unwrap(response)),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    deleteSubCategory(subCategoryId: number): Observable<void> {
        return this.http
            .delete<ApiEnvelope<unknown>>(`${this.rootUrl}/api/v1/asset-sub-categories/${subCategoryId}`)
            .pipe(
                map(() => void 0),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    private unwrap<T>(response: ApiEnvelope<T>): T {
        return response?.data as T;
    }

    private normalizePaginated<T>(payload: ApiPaginatedPayload<T> | T[]): PaginatedResult<T> {
        if (Array.isArray(payload)) {
            return {
                items: payload,
                meta: { current_page: 1, last_page: 1, per_page: payload.length, total: payload.length },
                links: {},
            };
        }
        const items = Array.isArray(payload?.data) ? payload.data : [];
        const perPage = Number(payload?.meta?.per_page ?? items.length);
        const total = Number(payload?.meta?.total ?? items.length);

        return {
            items,
            meta: {
                current_page: Number(payload?.meta?.current_page ?? 1),
                last_page: Number(payload?.meta?.last_page ?? 1),
                per_page: perPage > 0 ? perPage : items.length,
                total: total >= 0 ? total : items.length,
            },
            links: {
                first: payload?.links?.first ?? null,
                last: payload?.links?.last ?? null,
                prev: payload?.links?.prev ?? null,
                next: payload?.links?.next ?? null,
            },
        };
    }

    protected requestBuilder(params: Record<string, unknown>): HttpParams {
        let httpParams = new HttpParams();
        if (!params) return httpParams;
        Object.entries(params).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                httpParams = httpParams.set(key, String(value));
            }
        });
        return httpParams;
    }
}
