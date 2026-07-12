import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { errorCallback } from 'src/app/app-const';
import { ApiConfiguration } from '../../common/api-configuration';

export interface TrainerPortalPaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface TrainerPortalPaginated<T> {
  items: T[];
  meta: TrainerPortalPaginationMeta;
  links?: Record<string, unknown>;
}

export interface TrainerPortalPlayer {
  id: number;
  name: string;
  mobile: string | null;
  guardian_name: string | null;
  guardian_mobile: string | null;
  team: { id: number; name: string; slug?: string } | null;
  team_name: string | null;
  teams: Array<{ id: number; name: string; slug?: string }>;
  appointments_count: number;
  awards_count: number;
  status?: { id: number; key: string; name: string };
}

export interface TrainerPortalLookupOption {
  id: number;
  name: string;
  title?: string;
  coach?: string;
  day?: string | null;
  time?: string | null;
  sport?: string;
  name_en?: string | null;
}

export interface TrainerPlayerAppointment {
  id: number;
  date: string | null;
  time: string | null;
  start_time: string | null;
  end_time: string | null;
  type: string | null;
  team?: { id: number; name: string } | null;
  sport?: { id: number; name: string } | null;
  attendance_status?: { key: string; name: string };
}

export interface TrainerDashboardTeam {
  id: number;
  title: string;
  coach: string;
  sport_label: string;
  day_label: string | null;
  time_start: string | null;
  duration_label: string | null;
}

export interface TrainerDashboardAttendanceItem {
  schedule_id: number;
  activity: string;
  age_group: string;
  time_start: string | null;
  time_end: string | null;
  duration_label: string | null;
  date: string;
  date_iso: string;
  day: string;
}

export interface TrainerDashboardResponse {
  cards: {
    players_count: number;
    teams_count: number;
  };
  teams: TrainerDashboardTeam[];
  attendance_items: TrainerDashboardAttendanceItem[];
}

@Injectable({ providedIn: 'root' })
export class TrainerPortalService {
  constructor(
    private http: HttpClient,
    private config: ApiConfiguration
  ) { }

  getDashboard(academyId: string | number, filters: Record<string, unknown> = {}): Observable<TrainerDashboardResponse> {
    return this.http
      .get<{ data: TrainerDashboardResponse }>(`${this.config.rootUrl}/api/v1/academy/${academyId}/trainer/dashboard`, {
        params: this.cleanParams(filters)
      })
      .pipe(
        map(res => res.data),
        catchError(err => { errorCallback(err); return throwError(() => err); })
      );
  }

  getAppointments(academyId: string | number, filters: Record<string, unknown> = {}): Observable<any[]> {
    return this.http
      .get<{ data: any }>(`${this.config.rootUrl}/api/v1/academy/${academyId}/trainer/appointments`, {
        params: this.cleanParams(filters)
      })
      .pipe(
        map(res => res.data?.data ?? res.data ?? []),
        catchError(err => { errorCallback(err); return throwError(() => err); })
      );
  }

  getPlayerLookups(academyId: string | number): Observable<{ teams: TrainerPortalLookupOption[]; sports: TrainerPortalLookupOption[] }> {
    return this.http
      .get<{ data: { teams?: TrainerPortalLookupOption[]; sports?: TrainerPortalLookupOption[] } }>(
        `${this.config.rootUrl}/api/v1/academy/${academyId}/trainer/players/lookups`
      )
      .pipe(
        map(res => ({
          teams: res.data?.teams ?? [],
          sports: res.data?.sports ?? []
        })),
        catchError(err => { errorCallback(err); return throwError(() => err); })
      );
  }

  getPlayers(
    academyId: string | number,
    filters: Record<string, unknown> = {}
  ): Observable<TrainerPortalPaginated<TrainerPortalPlayer>> {
    return this.http
      .get<{ data: any }>(`${this.config.rootUrl}/api/v1/academy/${academyId}/trainer/players`, {
        params: this.cleanParams(filters)
      })
      .pipe(
        map(res => this.normalizePaginated<TrainerPortalPlayer>(res.data)),
        catchError(err => { errorCallback(err); return throwError(() => err); })
      );
  }

  getPlayerAppointments(
    academyId: string | number,
    playerId: number,
    filters: Record<string, unknown> = {}
  ): Observable<TrainerPortalPaginated<TrainerPlayerAppointment>> {
    return this.http
      .get<{ data: any }>(`${this.config.rootUrl}/api/v1/academy/${academyId}/trainer/players/${playerId}/appointments`, {
        params: this.cleanParams(filters)
      })
      .pipe(
        map(res => this.normalizePaginated<TrainerPlayerAppointment>(res.data)),
        catchError(err => { errorCallback(err); return throwError(() => err); })
      );
  }

  getTrainingPlansLookups(academyId: string | number): Observable<{ teams: TrainerPortalLookupOption[] }> {
    return this.http
      .get<{ data: { teams?: TrainerPortalLookupOption[] } }>(
        `${this.config.rootUrl}/api/v1/academy/${academyId}/trainer/training-plans/lookups`
      )
      .pipe(
        map(res => ({
          teams: res.data?.teams ?? []
        })),
        catchError(err => { errorCallback(err); return throwError(() => err); })
      );
  }

  getTrainingPlans(
    academyId: string | number,
    filters: Record<string, unknown> = {}
  ): Observable<TrainerPortalPaginated<any>> {
    return this.http
      .get<{ data: any }>(`${this.config.rootUrl}/api/v1/academy/${academyId}/trainer/training-plans`, {
        params: this.cleanParams(filters)
      })
      .pipe(
        map(res => this.normalizePaginated<any>(res.data)),
        catchError(err => { errorCallback(err); return throwError(() => err); })
      );
  }

  createTrainingPlan(academyId: string | number, payload: any): Observable<any> {
    return this.http
      .post<{ data: any }>(`${this.config.rootUrl}/api/v1/academy/${academyId}/trainer/training-plans`, payload)
      .pipe(
        map(res => res.data),
        catchError(err => { errorCallback(err); return throwError(() => err); })
      );
  }

  updateTrainingPlan(academyId: string | number, planId: number, payload: any): Observable<any> {
    return this.http
      .put<{ data: any }>(`${this.config.rootUrl}/api/v1/academy/${academyId}/trainer/training-plans/${planId}`, payload)
      .pipe(
        map(res => res.data),
        catchError(err => { errorCallback(err); return throwError(() => err); })
      );
  }

  deleteTrainingPlan(academyId: string | number, planId: number): Observable<any> {
    return this.http
      .delete<{ data: any }>(`${this.config.rootUrl}/api/v1/academy/${academyId}/trainer/training-plans/${planId}`)
      .pipe(
        map(res => res.data),
        catchError(err => { errorCallback(err); return throwError(() => err); })
      );
  }

  private cleanParams(params: Record<string, unknown>): Record<string, string> {
    const result: Record<string, string> = {};
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        result[key] = String(value);
      }
    });
    return result;
  }

  private normalizePaginated<T>(payload: any): TrainerPortalPaginated<T> {
    const items = Array.isArray(payload?.data) ? payload.data : (Array.isArray(payload) ? payload : []);
    const meta = payload?.meta ?? {};

    return {
      items,
      meta: {
        current_page: Number(meta.current_page ?? 1),
        last_page: Number(meta.last_page ?? 1),
        per_page: Number(meta.per_page ?? items.length),
        total: Number(meta.total ?? items.length)
      },
      links: payload?.links ?? {}
    };
  }
}
