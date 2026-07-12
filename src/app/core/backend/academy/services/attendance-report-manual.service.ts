import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import {
    AttendanceReportFilters,
    AttendanceReportPayload,
    createEmptyAttendanceReportPayload,
} from '../models/attendance-report-manual.models';

interface ApiEnvelope<T> {
    success?: boolean;
    status?: string;
    message?: string;
    data: T;
}

@Injectable({ providedIn: 'root' })
export class AttendanceReportManualService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    getReport(params: AttendanceReportFilters = {}): Observable<AttendanceReportPayload> {
        return this.http
            .get<ApiEnvelope<AttendanceReportPayload>>(`${this.rootUrl}/api/v1/reports/attendance`, {
                params: this.buildParams(params as Record<string, unknown>),
            })
            .pipe(map((response) => response?.data ?? createEmptyAttendanceReportPayload()));
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
