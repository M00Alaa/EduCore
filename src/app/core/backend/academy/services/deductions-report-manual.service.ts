import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import {
  DeductionPaymentHistoryPayload,
  DeductionPaymentPayload,
  DeductionPaymentResponse,
  DeductionsReportFilters,
  DeductionsReportPayload,
  createEmptyDeductionsReportPayload,
} from '../models/deductions-report-manual.models';

interface ApiEnvelope<T> {
  status?: string;
  message?: string;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class DeductionsReportManualService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  getReport(academyId: string | number, params: DeductionsReportFilters = {}): Observable<DeductionsReportPayload> {
    return this.http
      .get<ApiEnvelope<DeductionsReportPayload>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/reports/deductions`,
        { params: this.buildParams(params as Record<string, unknown>) }
      )
      .pipe(map((response) => response?.data ?? createEmptyDeductionsReportPayload()));
  }

  createPayment(deductionId: number, payload: DeductionPaymentPayload): Observable<DeductionPaymentResponse> {
    return this.http
      .post<ApiEnvelope<DeductionPaymentResponse>>(
        `${this.rootUrl}/api/v1/reports/deductions/${deductionId}/payments`,
        payload
      )
      .pipe(map((response) => response?.data ?? { remaining_amount: 0 }));
  }

  getPaymentHistory(
    deductionId: number,
    params: DeductionsReportFilters = {}
  ): Observable<DeductionPaymentHistoryPayload> {
    return this.http
      .get<ApiEnvelope<DeductionPaymentHistoryPayload>>(
        `${this.rootUrl}/api/v1/reports/deductions/${deductionId}/payments`,
        { params: this.buildParams(params as Record<string, unknown>) }
      )
      .pipe(
        map((response) => response?.data ?? {
          deduction: {} as any,
          items: { data: [] },
        })
      );
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
