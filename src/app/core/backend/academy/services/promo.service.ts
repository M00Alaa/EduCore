import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { errorCallback } from 'src/app/app-const';
import { PromoPayload } from '../models/promo.model';
@Injectable({
    providedIn: 'root'
})
export class PromoService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    private requestBuilder(params: Record<string, unknown>): any {
        const queryParams: any = {};
        Object.entries(params || {}).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                queryParams[key] = value;
            }
        });
        return queryParams;
    }

    getPromos(academyId: number, filters: Record<string, any> = {}): Observable<any> {
        const params: any = { per_page: filters?.per_page ?? 200 };

        Object.entries(filters || {}).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                params[key] = value;
            }
        });

        return this.http.get<any>(`${this.rootUrl}/api/v1/academy/${academyId}/promos`, {
            params: this.requestBuilder(params)
        }).pipe(
            catchError(err => { errorCallback(err); return throwError(() => err); })
        );
    }

    getActivePromos(academyId: number): Observable<any> {
        return this.getPromos(academyId, { status: 0, per_page: 200 });
    }

    getInactivePromos(academyId: number): Observable<any> {
        return this.getPromos(academyId, { status: 1, per_page: 200 });
    }

    getPromo(promoId: number): Observable<any> {
        return this.http.get<any>(`${this.rootUrl}/api/v1/promos/${promoId}`).pipe(
            catchError(err => { errorCallback(err); return throwError(() => err); })
        );
    }

    createPromo(academyId: number, payload: PromoPayload): Observable<any> {
        return this.http.post<any>(`${this.rootUrl}/api/v1/academy/${academyId}/promos`, payload).pipe(
            catchError(err => { errorCallback(err); return throwError(() => err); })
        );
    }

    updatePromo(promoId: number, payload: Partial<PromoPayload>): Observable<any> {
        return this.http.put<any>(`${this.rootUrl}/api/v1/promos/${promoId}`, payload).pipe(
            catchError(err => { errorCallback(err); return throwError(() => err); })
        );
    }

    deletePromo(promoId: number): Observable<any> {
        return this.http.delete<any>(`${this.rootUrl}/api/v1/promos/${promoId}`).pipe(
            catchError(err => { errorCallback(err); return throwError(() => err); })
        );
    }

    togglePromoStatus(promoId: number): Observable<any> {
        return this.http.patch<any>(`${this.rootUrl}/api/v1/promos/${promoId}/toggle-status`, {}).pipe(
            catchError(err => { errorCallback(err); return throwError(() => err); })
        );
    }

    generateCode(academyId: number, length: number = 8): Observable<any> {
        return this.http.post<any>(`${this.rootUrl}/api/v1/academy/${academyId}/promos/generate-code`, { length }).pipe(
            catchError(err => { errorCallback(err); return throwError(() => err); })
        );
    }

    validateCode(academyId: number, discountCode: string, scope: 'subscriptions' | 'products' | 'general' = 'subscriptions'): Observable<any> {
        return this.http.post<any>(`${this.rootUrl}/api/v1/academy/${academyId}/promos/validate-code`, {
            discount_code: discountCode,
            scope,
        }).pipe(
            catchError(err => { errorCallback(err); return throwError(() => err); })
        );
    }

    getSubscriptionPromos(academyId: number): Observable<any> {
        return this.getActivePromos(academyId);
    }
}
