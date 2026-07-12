import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { errorCallback } from 'src/app/app-const';

import {
    Subscription,
    CreateSubscriptionActivityPayload,
    CreateSubscriptionPlayerPayload,
    CreateSubscriptionPayload,
    GuardianFamilyLookupPlayer,
    GuardianFamilyLookupResponse,
    PlayerMobileCheckResponse,
    SubscriptionPricingPreview,
    SubscriptionPricingPreviewPayload
} from '../models/subscription.model';

@Injectable({
    providedIn: 'root'
})
export class SubscriptionService extends BaseService {
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

    getSubscriptions(params: any = {}): Observable<any> {
        const queryParams: any = {};

        // Keep list scoped to the selected branch (supports number or object storage shape).
        const impersonatedBranchId = this.getImpersonatedBranchId();
        if (impersonatedBranchId) {
            queryParams['academy_id'] = impersonatedBranchId;
        }

        if (params) {
            Object.keys(params).forEach(key => {
                if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
                    queryParams[key] = params[key];
                }
            });
        }

        return this.http.get<any>(`${this.rootUrl}/api/v1/subscriptions`, {
            params: this.requestBuilder(queryParams)
        }).pipe(
            catchError(err => { errorCallback(err); return throwError(() => err); })
        );
    }

    createSubscription(payload: CreateSubscriptionPayload): Observable<any> {
        const body: CreateSubscriptionPayload = {
            ...payload,
        };

        // Keep creation in the selected branch context.
        const impersonatedBranchId = this.getImpersonatedBranchId();
        if (impersonatedBranchId) {
            body.academy_id = impersonatedBranchId;
        }

        return this.http.post<any>(`${this.rootUrl}/api/v1/subscriptions`, body, {
            headers: {
                'X-Skip-Global-Error': 'true'
            }
        }).pipe(
            catchError(err => { errorCallback(err); return throwError(() => err); })
        );
    }

    previewSubscriptionPricing(payload: SubscriptionPricingPreviewPayload): Observable<SubscriptionPricingPreview> {
        const body: SubscriptionPricingPreviewPayload = {
            ...payload,
        };

        const impersonatedBranchId = this.getImpersonatedBranchId();
        if (impersonatedBranchId) {
            body.academy_id = impersonatedBranchId;
        }

        return this.http.post<any>(`${this.rootUrl}/api/v1/subscriptions/preview`, body, {
            headers: {
                'X-Skip-Global-Error': 'true'
            }
        }).pipe(
            catchError(err => throwError(() => err))
        );
    }

    getSubscription(id: number, params: { detail_id?: number } = {}): Observable<any> {
        return this.http.get<any>(`${this.rootUrl}/api/v1/subscriptions/${id}`, {
            params: this.requestBuilder(params)
        }).pipe(
            catchError(err => { errorCallback(err); return throwError(() => err); })
        );
    }

    findGuardianFamilyByMobile(mobile: string): Observable<GuardianFamilyLookupResponse> {
        return this.http.get<GuardianFamilyLookupResponse>(`${this.rootUrl}/api/v1/subscriptions/family-by-mobile`, {
            params: this.requestBuilder({ mobile })
        }).pipe(
            catchError(err => { errorCallback(err); return throwError(() => err); })
        );
    }

    checkPlayerMobileInAcademy(
        mobile: string,
        academyId?: number | null,
        playerId?: number | null
    ): Observable<PlayerMobileCheckResponse> {
        const resolvedAcademyId = academyId ?? this.getImpersonatedBranchId();

        return this.http.get<PlayerMobileCheckResponse>(`${this.rootUrl}/api/v1/subscriptions/check-player-mobile`, {
            params: this.requestBuilder({
                mobile,
                academy_id: resolvedAcademyId ?? undefined,
                player_id: playerId ?? undefined,
            }),
            headers: {
                'X-Skip-Global-Error': 'true'
            }
        }).pipe(
            catchError(err => throwError(() => err))
        );
    }

    rescheduleSubscriptions(data: { academy_id: number; from_date: string; to_date: string }): Observable<any> {
        return this.http.post<any>(`${this.rootUrl}/api/v1/subscriptions/reschedule`, data).pipe(
            catchError(err => { errorCallback(err); return throwError(() => err); })
        );
    }

    renewSubscription(id: number, data: any): Observable<any> {
        return this.http.post<any>(`${this.rootUrl}/api/v1/subscriptions/${id}/renew`, data).pipe(
            catchError(err => { errorCallback(err); return throwError(() => err); })
        );
    }

    processPayment(id: number, data: any): Observable<any> {
        return this.http.post<any>(`${this.rootUrl}/api/v1/subscriptions/${id}/pay`, data).pipe(
            catchError(err => { errorCallback(err); return throwError(() => err); })
        );
    }

    processRefund(id: number, data: any): Observable<any> {
        return this.http.post<any>(`${this.rootUrl}/api/v1/subscriptions/${id}/refund`, data).pipe(
            catchError(err => { errorCallback(err); return throwError(() => err); })
        );
    }

    activateSubscription(id: number, options?: { silent?: boolean }): Observable<any> {
        const headers = options?.silent ? { 'X-Skip-Global-Error': 'true' } : undefined;

        return this.http.post<any>(`${this.rootUrl}/api/v1/subscriptions/${id}/activate`, {}, { headers }).pipe(
            catchError(err => {
                if (!options?.silent) {
                    errorCallback(err);
                }
                return throwError(() => err);
            })
        );
    }

    deactivateSubscription(id: number): Observable<any> {
        return this.http.post<any>(`${this.rootUrl}/api/v1/subscriptions/${id}/deactivate`, {}).pipe(
            catchError(err => { errorCallback(err); return throwError(() => err); })
        );
    }

    activateSubscriptionDetail(
        subscriptionId: number,
        detailId: number,
        options?: { silent?: boolean }
    ): Observable<any> {
        const headers = options?.silent ? { 'X-Skip-Global-Error': 'true' } : undefined;

        return this.http.post<any>(
            `${this.rootUrl}/api/v1/subscriptions/${subscriptionId}/details/${detailId}/activate`,
            {},
            { headers }
        ).pipe(
            catchError(err => {
                if (!options?.silent) {
                    errorCallback(err);
                }
                return throwError(() => err);
            })
        );
    }

    deactivateSubscriptionDetail(subscriptionId: number, detailId: number): Observable<any> {
        return this.http.post<any>(`${this.rootUrl}/api/v1/subscriptions/${subscriptionId}/details/${detailId}/deactivate`, {}).pipe(
            catchError(err => { errorCallback(err); return throwError(() => err); })
        );
    }

    freezeSubscriptionDetail(
        subscriptionId: number,
        detailId: number,
        data: { from_date: string; to_date: string; suspend_comment: string }
    ): Observable<any> {
        return this.http.post<any>(
            `${this.rootUrl}/api/v1/subscriptions/${subscriptionId}/details/${detailId}/freeze`,
            data
        ).pipe(
            catchError(err => { errorCallback(err); return throwError(() => err); })
        );
    }

    unfreezeSubscriptionDetail(subscriptionId: number, detailId: number): Observable<any> {
        return this.http.post<any>(
            `${this.rootUrl}/api/v1/subscriptions/${subscriptionId}/details/${detailId}/unfreeze`,
            {}
        ).pipe(
            catchError(err => { errorCallback(err); return throwError(() => err); })
        );
    }

    addSessions(id: number, data: { subscription_detail_id: number; count: number; appointment_ids?: number[] }): Observable<any> {
        return this.http.post<any>(`${this.rootUrl}/api/v1/subscriptions/${id}/add-sessions`, data).pipe(
            catchError(err => { errorCallback(err); return throwError(() => err); })
        );
    }

    assignCoach(subscriptionId: number, detailId: number, data: { trainer_id: number }): Observable<any> {
        return this.http.post<any>(
            `${this.rootUrl}/api/v1/subscriptions/${subscriptionId}/details/${detailId}/assign-coach`,
            data
        ).pipe(
            catchError(err => { errorCallback(err); return throwError(() => err); })
        );
    }

    getDetailScheduleOptions(subscriptionId: number, detailId: number): Observable<any> {
        return this.http.get<any>(
            `${this.rootUrl}/api/v1/subscriptions/${subscriptionId}/details/${detailId}/schedule-options`
        ).pipe(
            catchError(err => { errorCallback(err); return throwError(() => err); })
        );
    }

    updateStartDate(subscriptionId: number, detailId: number, startDate: string): Observable<any> {
        return this.http.post<any>(
            `${this.rootUrl}/api/v1/subscriptions/${subscriptionId}/details/${detailId}/update-start-date`,
            { start_date: startDate }
        ).pipe(
            catchError(err => { errorCallback(err); return throwError(() => err); })
        );
    }

    saveDetailSchedule(subscriptionId: number, detailId: number, data: { appointment_ids: number[] }): Observable<any> {
        return this.http.post<any>(
            `${this.rootUrl}/api/v1/subscriptions/${subscriptionId}/details/${detailId}/schedule`,
            data
        ).pipe(
            catchError(err => { errorCallback(err); return throwError(() => err); })
        );
    }

    deleteSubscription(id: number): Observable<any> {
        return this.http.delete<any>(`${this.rootUrl}/api/v1/subscriptions/${id}`).pipe(
            catchError(err => { errorCallback(err); return throwError(() => err); })
        );
    }

    private getImpersonatedBranchId(): number | null {
        try {
            const raw = localStorage.getItem('impersonated_branch_id');
            if (!raw) {
                return null;
            }

            // Case 1: raw numeric string, e.g. "8"
            const numericRaw = Number(raw);
            if (Number.isInteger(numericRaw) && numericRaw > 0) {
                return numericRaw;
            }

            // Case 2: JSON payload, e.g. {"id":8} or "8"
            const parsed = JSON.parse(raw);
            if (typeof parsed === 'number' && Number.isInteger(parsed) && parsed > 0) {
                return parsed;
            }

            const id = Number(parsed?.id);
            if (Number.isInteger(id) && id > 0) {
                return id;
            }
        } catch {
            // Ignore malformed localStorage and fallback to null.
        }

        return null;
    }
}
