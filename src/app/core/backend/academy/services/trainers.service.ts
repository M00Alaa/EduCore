import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { errorCallback } from 'src/app/app-const';
import {
    ApiEnvelope,
    ApiPaginatedPayload,
    ApiPaginationMeta,
    PaginatedResult,
    TrainerEntity,
    TrainerPayload,
    TrainerLookups,
    TrainerAttendanceResponse,
    TrainerAttendanceSummary,
    TrainerPendingResponse
} from '../models/trainers.model';

@Injectable({ providedIn: 'root' })
export class TrainersService extends BaseService {
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

    listTrainers(
        academyId: string | number,
        params: {
            page?: number;
            per_page?: number;
            search?: string;
            gender?: string;
            is_active?: string | boolean | number;
            status?: string; // Compatibility with old filter key.
            sport_id?: number | null;
        } = {}
    ): Observable<PaginatedResult<TrainerEntity>> {
        const normalizedParams: Record<string, unknown> = { ...params };

        // Legacy UI sends status=active|inactive. Backend expects is_active.
        if (
            normalizedParams['is_active'] === undefined &&
            typeof normalizedParams['status'] === 'string' &&
            normalizedParams['status'] !== ''
        ) {
            const status = String(normalizedParams['status']).toLowerCase();
            normalizedParams['is_active'] = status === 'active' ? '1' : status === 'inactive' ? '0' : undefined;
        }

        delete normalizedParams['status'];

        return this.http
            .get<ApiEnvelope<ApiPaginatedPayload<TrainerEntity>>>(
                `${this.rootUrl}/api/v1/academy/${academyId}/trainers`,
                { params: this.requestBuilder(normalizedParams) }
            )
            .pipe(
                map((response) => this.normalizePaginated(this.unwrap(response))),
                map((paginated) => ({
                    ...paginated,
                    items: paginated.items.map((item) => this.normalizeTrainer(item)),
                })),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    getTrainer(academyId: string | number, trainerId: number): Observable<TrainerEntity> {
        return this.http
            .get<ApiEnvelope<TrainerEntity>>(`${this.rootUrl}/api/v1/academy/${academyId}/trainers/${trainerId}`)
            .pipe(
                map((response) => this.normalizeTrainer(this.unwrap(response))),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    createTrainer(academyId: string | number, payload: TrainerPayload): Observable<TrainerEntity> {
        return this.http
            .post<ApiEnvelope<TrainerEntity>>(
                `${this.rootUrl}/api/v1/academy/${academyId}/trainers`,
                this.normalizeOutgoingPayload(payload)
            )
            .pipe(
                map((response) => this.normalizeTrainer(this.unwrap(response))),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    updateTrainer(
        academyId: string | number,
        trainerId: number,
        payload: Partial<TrainerPayload>
    ): Observable<TrainerEntity> {
        return this.http
            .put<ApiEnvelope<TrainerEntity>>(
                `${this.rootUrl}/api/v1/academy/${academyId}/trainers/${trainerId}`,
                this.normalizeOutgoingPayload(payload)
            )
            .pipe(
                map((response) => this.normalizeTrainer(this.unwrap(response))),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    deleteTrainer(academyId: string | number, trainerId: number): Observable<void> {
        return this.http
            .delete<ApiEnvelope<unknown>>(`${this.rootUrl}/api/v1/academy/${academyId}/trainers/${trainerId}`)
            .pipe(
                map(() => void 0),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    toggleStatus(academyId: string | number, trainerId: number, isActive: boolean): Observable<TrainerEntity> {
        return this.http
            .patch<ApiEnvelope<TrainerEntity>>(
                `${this.rootUrl}/api/v1/academy/${academyId}/trainers/${trainerId}/toggle-status`,
                { is_active: isActive }
            )
            .pipe(
                map((response) => this.normalizeTrainer(this.unwrap(response))),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    getLookups(academyId: string | number): Observable<TrainerLookups> {
        return this.http
            .get<ApiEnvelope<TrainerLookups>>(`${this.rootUrl}/api/v1/academy/${academyId}/trainers/lookups`)
            .pipe(
                map((response) => this.unwrap(response)),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    // ── Attendance API ────────────────────────────────────────────────

    getAttendance(
        academyId: string | number,
        params: { date_from?: string; date_to?: string; search?: string; trainer_id?: number } = {}
    ): Observable<TrainerAttendanceResponse> {
        return this.http
            .get<ApiEnvelope<TrainerAttendanceResponse>>(
                `${this.rootUrl}/api/v1/academy/${academyId}/trainer-attendance`,
                { params: this.requestBuilder(params as Record<string, unknown>) }
            )
            .pipe(
                map((response) => this.unwrap(response)),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    recordAttendance(
        academyId: string | number,
        payload: {
            trainer_id: number;
            date: string;
            status: 'present' | 'absent';
            action?: 'check_in' | 'check_out';
            check_time?: string;
            hours?: number;
            comments?: string
        }
    ): Observable<any> {
        return this.http
            .post<ApiEnvelope<any>>(
                `${this.rootUrl}/api/v1/academy/${academyId}/trainer-attendance`,
                payload
            )
            .pipe(
                map((response) => this.unwrap(response)),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    bulkRecordAttendance(
        academyId: string | number,
        payload: { trainer_ids: number[]; comments?: string; hours?: number }
    ): Observable<any> {
        return this.http
            .post<ApiEnvelope<any>>(
                `${this.rootUrl}/api/v1/academy/${academyId}/trainer-attendance/bulk`,
                payload
            )
            .pipe(
                map((response) => this.unwrap(response)),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    getAttendanceSummary(academyId: string | number): Observable<TrainerAttendanceSummary> {
        return this.http
            .get<ApiEnvelope<TrainerAttendanceSummary>>(
                `${this.rootUrl}/api/v1/academy/${academyId}/trainer-attendance/summary`
            )
            .pipe(
                map((response) => this.unwrap(response)),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    getPendingTrainers(academyId: string | number): Observable<TrainerPendingResponse> {
        return this.http
            .get<ApiEnvelope<TrainerPendingResponse>>(
                `${this.rootUrl}/api/v1/academy/${academyId}/trainer-attendance/pending`
            )
            .pipe(
                map((response) => this.unwrap(response)),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    deleteAttendanceRecord(academyId: string | number, attendanceId: number): Observable<void> {
        return this.http
            .delete<ApiEnvelope<unknown>>(
                `${this.rootUrl}/api/v1/academy/${academyId}/trainer-attendance/${attendanceId}`
            )
            .pipe(
                map(() => void 0),
                catchError((err) => { errorCallback(err); return throwError(() => err); })
            );
    }

    // ── Private Helpers ───────────────────────────────────────────────

    private unwrap<T>(response: ApiEnvelope<T>): T {
        return response?.data as T;
    }

    private normalizePaginated<T>(payload: ApiPaginatedPayload<T> | T[]): PaginatedResult<T> {
        if (Array.isArray(payload)) {
            return {
                items: payload,
                meta: {
                    current_page: 1,
                    last_page: 1,
                    per_page: payload.length,
                    total: payload.length,
                },
                links: {},
            };
        }

        const meta: ApiPaginationMeta = {
            current_page: Number(payload?.meta?.current_page ?? 1),
            last_page: Number(payload?.meta?.last_page ?? 1),
            per_page: Number(payload?.meta?.per_page ?? payload?.data?.length ?? 0),
            total: Number(payload?.meta?.total ?? payload?.data?.length ?? 0),
        };

        return {
            items: payload?.data ?? [],
            meta,
            links: payload?.links ?? {},
        };
    }

    private normalizeTrainer(source: TrainerEntity): TrainerEntity {
        const active = Boolean(source?.is_active ?? source?.activity);
        const sportIds = this.resolveTrainerSportIds(source);

        return {
            ...source,
            id: Number(source?.id ?? 0),
            name: source?.name ?? '',
            password: source?.password ?? '',
            mobile: source?.mobile ?? '',
            email: source?.email ?? '',
            username: source?.username ?? '',
            gender: source?.gender === 'female' ? 'female' : 'male',
            reward_calculation_method: source?.reward_calculation_method ?? 'session',
            reward_value: Number(source?.reward_value ?? 0),
            qualifications: source?.qualifications ?? '',
            academic_achievements: source?.academic_achievements ?? '',
            personal_achievements: source?.personal_achievements ?? '',
            assigned_activities: Array.isArray(source?.assigned_activities) ? source.assigned_activities : [],
            sport_id: sportIds.length > 0 ? sportIds[0] : (source?.sport?.id ?? source?.sport_id ?? null),
            sport_ids: sportIds,
            activity_ids: sportIds,
            activity_options: Array.isArray(source?.activity_options) ? source.activity_options : [],
            attachments: Array.isArray(source?.attachments) ? source.attachments : [],
            is_active: active,
            activity: active,
        };
    }

    private resolveTrainerSportIds(source: TrainerEntity): number[] {
        const candidates = [
            ...(Array.isArray(source?.activity_ids) ? source.activity_ids : []),
            ...(Array.isArray(source?.sport_ids) ? source.sport_ids : []),
            ...(Array.isArray(source?.activity_options) ? source.activity_options.map((item) => item?.id) : []),
            source?.sport?.id,
            source?.sport_id,
        ];

        return Array.from(new Set(
            candidates
                .map((id) => Number(id))
                .filter((id) => Number.isFinite(id) && id > 0)
        ));
    }

    private normalizeOutgoingPayload(payload: Partial<TrainerPayload>): Record<string, unknown> {
        const normalized: Record<string, unknown> = { ...payload };

        if (normalized['activity'] !== undefined && normalized['is_active'] === undefined) {
            normalized['is_active'] = Boolean(normalized['activity']);
        }

        if (normalized['password'] === '') {
            delete normalized['password'];
        }

        delete normalized['activity'];

        return normalized;
    }
}
