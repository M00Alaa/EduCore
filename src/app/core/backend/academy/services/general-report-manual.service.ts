import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import {
  createEmptyGeneralReportPayload,
  GeneralReportFilters,
  GeneralReportPayload,
} from '../models/general-report-manual.models';

interface ApiEnvelope<T> {
  success?: boolean;
  status?: string;
  message?: string;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class GeneralReportManualService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  getReport(params: GeneralReportFilters = {}): Observable<GeneralReportPayload> {
    return this.http
      .get<ApiEnvelope<GeneralReportPayload>>(`${this.rootUrl}/api/v1/reports/general`, {
        params: this.buildParams(params as Record<string, unknown>),
      })
      .pipe(map((response) => response?.data ?? createEmptyGeneralReportPayload()));
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
