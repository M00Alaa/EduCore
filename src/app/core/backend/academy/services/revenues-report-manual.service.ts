import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import {
  createEmptyRevenuesReportPayload,
  RevenuesReportFilters,
  RevenuesReportPayload,
} from '../models/revenues-report-manual.models';

interface ApiEnvelope<T> {
  status: string;
  message?: string;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class RevenuesReportManualService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  getReport(params: RevenuesReportFilters = {}): Observable<RevenuesReportPayload> {
    return this.http
      .get<ApiEnvelope<RevenuesReportPayload>>(`${this.rootUrl}/api/v1/reports/revenues`, {
        params: this.buildParams(params as Record<string, unknown>),
      })
      .pipe(map((response) => response?.data ?? createEmptyRevenuesReportPayload()));
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
