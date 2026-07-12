import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import {
  BalanceTransferPayload,
  BalanceTransferResponse,
  BalancesReportFilters,
  BalancesReportPayload,
  createEmptyBalancesReportPayload,
} from '../models/balances-report-manual.models';

interface ApiEnvelope<T> {
  success?: boolean;
  status?: string;
  message?: string;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class BalancesReportManualService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  getReport(params: BalancesReportFilters = {}): Observable<BalancesReportPayload> {
    return this.http
      .get<ApiEnvelope<BalancesReportPayload>>(`${this.rootUrl}/api/v1/reports/balances`, {
        params: this.buildParams(params as Record<string, unknown>),
      })
      .pipe(map((response) => response?.data ?? createEmptyBalancesReportPayload()));
  }

  transferFunds(payload: BalanceTransferPayload): Observable<BalanceTransferResponse> {
    return this.http
      .post<ApiEnvelope<BalanceTransferResponse>>(`${this.rootUrl}/api/v1/reports/balances/transfer`, payload)
      .pipe(
        map((response) => {
          const data = response?.data;
          return {
            message: data?.message ?? response?.message ?? 'Transfer completed successfully.',
            summary: data?.summary ?? {
              cash_amount: 0,
              bank_amount: 0,
              total_amount: 0,
            },
          };
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
