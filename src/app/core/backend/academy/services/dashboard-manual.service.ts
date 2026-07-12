import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { DashboardStatisticsResponse } from '../models/dashboard-manual.models';

interface ApiEnvelope<T> {
  status: string;
  message?: string;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class DashboardManualService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  getStatistics(params: { branch_id?: number | null; selected_date?: string | null; date_from?: string | null; date_to?: string | null } = {}): Observable<DashboardStatisticsResponse> {
    return this.http
      .get<ApiEnvelope<DashboardStatisticsResponse>>(`${this.rootUrl}/api/v1/dashboard`, {
        params: this.buildParams(params),
      })
      .pipe(map((response) => response.data));
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
