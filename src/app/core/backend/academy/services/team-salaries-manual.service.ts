import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import {
  TeamSalaryAdjustmentPayload,
  TeamSalaryAdjustmentRow,
  TeamSalaryHistoryRow,
  TeamSalaryPaginated,
  TeamSalaryPaymentPayload,
  TeamSalaryPaymentRow,
  TeamSalaryReportFilters,
  TeamSalaryReportPayload,
  TeamSalarySettlementFilters,
  TeamSalaryStaffPayload,
  TeamSalaryStaffRow,
  emptyTeamSalaryReportPayload,
} from '../models/team-salaries.models';

interface ApiEnvelope<T> {
  status?: string;
  message?: string;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class TeamSalariesManualService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  getReport(academyId: string | number, params: TeamSalaryReportFilters = {}): Observable<TeamSalaryReportPayload> {
    return this.http
      .get<ApiEnvelope<TeamSalaryReportPayload>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/team-salaries/report`,
        { params: this.buildParams(params as Record<string, unknown>) }
      )
      .pipe(map((response) => response?.data ?? emptyTeamSalaryReportPayload()));
  }

  getPayments(
    academyId: string | number,
    params: TeamSalarySettlementFilters = {}
  ): Observable<TeamSalaryPaginated<TeamSalaryPaymentRow>> {
    return this.http
      .get<ApiEnvelope<TeamSalaryPaginated<TeamSalaryPaymentRow>>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/team-salaries/payments`,
        { params: this.buildParams(params as Record<string, unknown>) }
      )
      .pipe(map((response) => response?.data ?? { data: [] }));
  }

  getHistory(
    academyId: string | number,
    params: TeamSalarySettlementFilters = {}
  ): Observable<TeamSalaryPaginated<TeamSalaryHistoryRow>> {
    return this.http
      .get<ApiEnvelope<TeamSalaryPaginated<TeamSalaryHistoryRow>>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/team-salaries/history`,
        { params: this.buildParams(params as Record<string, unknown>) }
      )
      .pipe(map((response) => response?.data ?? { data: [] }));
  }

  getGovernance(
    academyId: string | number,
    params: TeamSalarySettlementFilters = {}
  ): Observable<TeamSalaryPaginated<TeamSalaryAdjustmentRow>> {
    return this.http
      .get<ApiEnvelope<TeamSalaryPaginated<TeamSalaryAdjustmentRow>>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/team-salaries/governance`,
        { params: this.buildParams(params as Record<string, unknown>) }
      )
      .pipe(map((response) => response?.data ?? { data: [] }));
  }

  listStaff(
    academyId: string | number,
    params: {
      page?: number;
      per_page?: number;
      search?: string;
      is_active?: boolean | number | string;
      academy_filter_id?: number;
    } = {}
  ): Observable<TeamSalaryPaginated<TeamSalaryStaffRow>> {
    return this.http
      .get<ApiEnvelope<TeamSalaryPaginated<TeamSalaryStaffRow>>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/team-salaries/staff`,
        { params: this.buildParams(params as Record<string, unknown>) }
      )
      .pipe(map((response) => response?.data ?? { data: [] }));
  }

  createPayment(
    academyId: string | number,
    payload: TeamSalaryPaymentPayload
  ): Observable<TeamSalaryPaymentRow> {
    return this.http
      .post<ApiEnvelope<TeamSalaryPaymentRow>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/team-salaries/payments`,
        payload
      )
      .pipe(map((response) => response.data));
  }

  createAdjustment(
    academyId: string | number,
    payload: TeamSalaryAdjustmentPayload
  ): Observable<TeamSalaryAdjustmentRow> {
    return this.http
      .post<ApiEnvelope<TeamSalaryAdjustmentRow>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/team-salaries/adjustments`,
        payload
      )
      .pipe(map((response) => response.data));
  }

  createStaff(academyId: string | number, payload: TeamSalaryStaffPayload): Observable<TeamSalaryStaffRow> {
    return this.http
      .post<ApiEnvelope<TeamSalaryStaffRow>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/team-salaries/staff`,
        payload
      )
      .pipe(map((response) => response.data));
  }

  updateStaff(
    academyId: string | number,
    staffId: number,
    payload: TeamSalaryStaffPayload
  ): Observable<TeamSalaryStaffRow> {
    return this.http
      .put<ApiEnvelope<TeamSalaryStaffRow>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/team-salaries/staff/${staffId}`,
        payload
      )
      .pipe(map((response) => response.data));
  }

  deleteStaff(academyId: string | number, staffId: number): Observable<void> {
    return this.http
      .delete<ApiEnvelope<unknown>>(`${this.rootUrl}/api/v1/academy/${academyId}/team-salaries/staff/${staffId}`)
      .pipe(map(() => void 0));
  }

  private buildParams(params: Record<string, unknown>): HttpParams {
    let httpParams = new HttpParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        return;
      }

      httpParams = httpParams.set(key, String(value));
    });

    return httpParams;
  }
}
