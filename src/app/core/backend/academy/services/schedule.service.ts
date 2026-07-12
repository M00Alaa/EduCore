import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { errorCallback } from 'src/app/app-const';
import {
    ScheduleRow,
    ScheduleListResponse,
    ScheduleOptions,
    ScheduleFilters,
    SchedulePlayerRow,
    ScheduleDayDetailsResponse
} from '../models/schedule.model';

// ─── Service ──────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class ScheduleService extends BaseService {
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

    /**
     * List schedules for an academy with optional filters.
     */
    getSchedules(academyId: string | number, filters: ScheduleFilters = {}): Observable<ScheduleListResponse> {
        const params: any = {};
        if (filters.search) params.search = filters.search;
        if (filters.gender) params.gender = filters.gender;
        if (filters.academy_sport_id) params.academy_sport_id = filters.academy_sport_id;
        if (filters.age_group_id) params.age_group_id = filters.age_group_id;
        if (filters.day !== undefined && filters.day !== null && filters.day !== '') params.day = filters.day;
        if (filters.date) params.date = filters.date;
        if (filters.date_from) params.date_from = filters.date_from;
        if (filters.date_to) params.date_to = filters.date_to;
        if (filters.page) params.page = filters.page;
        if (filters.per_page) params.per_page = filters.per_page;

        return this.http
            .get<{ data: ScheduleListResponse }>(`${this.rootUrl}/api/v1/academy/${academyId}/schedules`, {
                params: this.requestBuilder(params)
            })
            .pipe(
                map(res => res.data),
                catchError(err => { errorCallback(err); return throwError(() => err); })
            );
    }

    /**
     * List schedules for a trainer.
     */
    getTrainerAppointments(academyId: string | number, filters: ScheduleFilters = {}): Observable<ScheduleListResponse> {
        const params: any = {};
        if (filters.search) params.search = filters.search;
        if (filters.gender) params.gender = filters.gender;
        if (filters.academy_sport_id) params.academy_sport_id = filters.academy_sport_id;
        if (filters.age_group_id) params.age_group_id = filters.age_group_id;
        if (filters.day !== undefined && filters.day !== null && filters.day !== '') params.day = filters.day;
        if (filters.date) params.date = filters.date;
        if (filters.date_from) params.date_from = filters.date_from;
        if (filters.date_to) params.date_to = filters.date_to;
        if (filters.page) params.page = filters.page;
        if (filters.per_page) params.per_page = filters.per_page;

        return this.http
            .get<{ data: ScheduleListResponse }>(`${this.rootUrl}/api/v1/academy/${academyId}/trainer/appointments`, {
                params: this.requestBuilder(params)
            })
            .pipe(
                map(res => res.data),
                catchError(err => { errorCallback(err); return throwError(() => err); })
            );
    }

    /**
     * Get form dropdown options for schedules.
     */
    getOptions(academyId: string | number): Observable<ScheduleOptions> {
        return this.http
            .get<{ data: ScheduleOptions }>(`${this.rootUrl}/api/v1/academy/${academyId}/schedules/options`)
            .pipe(
                map(res => res.data),
                catchError(err => { errorCallback(err); return throwError(() => err); })
            );
    }

    /**
     * Get a single schedule by id (same shape as list items).
     */
    getById(academyId: string | number, scheduleId: number): Observable<ScheduleRow> {
        return this.http
            .get<{ data: ScheduleRow }>(`${this.rootUrl}/api/v1/academy/${academyId}/schedules/${scheduleId}`)
            .pipe(
                map(res => res.data),
                catchError(err => { errorCallback(err); return throwError(() => err); })
            );
    }

    /**
     * Get enrolled players for a schedule.
     */
    getSchedulePlayers(academyId: string | number, scheduleId: number): Observable<SchedulePlayerRow[]> {
        return this.http
            .get<{ data: SchedulePlayerRow[] }>(`${this.rootUrl}/api/v1/academy/${academyId}/schedules/${scheduleId}/players`)
            .pipe(
                map(res => res.data),
                catchError(err => { errorCallback(err); return throwError(() => err); })
            );
    }

    /**
     * Get one schedule day with its assigned players.
     */
    getScheduleDayDetails(academyId: string | number, scheduleId: number): Observable<ScheduleDayDetailsResponse> {
        return this.http
            .get<{ data: ScheduleDayDetailsResponse }>(`${this.rootUrl}/api/v1/academy/${academyId}/schedules/${scheduleId}/day-details`)
            .pipe(
                map(res => res.data),
                catchError(err => { errorCallback(err); return throwError(() => err); })
            );
    }

    /**
     * Create new schedule(s) — one per day selected.
     */
    createSchedule(academyId: string | number, payload: Partial<ScheduleRow> & { days: string[] }): Observable<any> {
        return this.http
            .post<{ data: any }>(`${this.rootUrl}/api/v1/academy/${academyId}/schedules`, payload)
            .pipe(
                map(res => res.data),
                catchError(err => { errorCallback(err); return throwError(() => err); })
            );
    }

    /**
     * Update an existing schedule by id.
     */
    updateSchedule(academyId: string | number, scheduleId: number, payload: Partial<ScheduleRow>): Observable<ScheduleRow> {
        return this.http
            .put<{ data: ScheduleRow }>(`${this.rootUrl}/api/v1/academy/${academyId}/schedules/${scheduleId}`, payload)
            .pipe(
                map(res => res.data),
                catchError(err => { errorCallback(err); return throwError(() => err); })
            );
    }

    /**
     * Delete a schedule by id.
     */
    deleteSchedule(academyId: string | number, scheduleId: number): Observable<void> {
        return this.http
            .delete<void>(`${this.rootUrl}/api/v1/academy/${academyId}/schedules/${scheduleId}`)
            .pipe(
                catchError(err => { errorCallback(err); return throwError(() => err); })
            );
    }

    /**
     * Delete multiple schedules atomically.
     */
    deleteSchedules(academyId: string | number, scheduleIds: number[]): Observable<void> {
        return this.http
            .delete<void>(`${this.rootUrl}/api/v1/academy/${academyId}/schedules`, {
                body: { schedule_ids: scheduleIds },
            })
            .pipe(
                catchError(err => { errorCallback(err); return throwError(() => err); })
            );
    }
}
