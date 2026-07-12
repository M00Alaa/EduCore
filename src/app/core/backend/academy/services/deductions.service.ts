import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { DeductionListResponse, DeductionPackageOption, DeductionPayload, DeductionRow } from '../models/deductions.model';

@Injectable({ providedIn: 'root' })
export class DeductionsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  list(academyId: string | number, filters: Record<string, any> = {}): Observable<DeductionListResponse> {
    return this.http.get<any>(`${this.rootUrl}/api/v1/academy/${academyId}/deductions`, {
      params: this.toParams(filters),
    }).pipe(map((res) => res?.data ?? res));
  }

  create(academyId: string | number, payload: DeductionPayload): Observable<DeductionRow> {
    return this.http.post<any>(`${this.rootUrl}/api/v1/academy/${academyId}/deductions`, payload)
      .pipe(map((res) => res?.data ?? res));
  }

  update(deductionId: number, payload: DeductionPayload): Observable<DeductionRow> {
    return this.http.put<any>(`${this.rootUrl}/api/v1/deductions/${deductionId}`, payload)
      .pipe(map((res) => res?.data ?? res));
  }

  toggleStatus(deductionId: number): Observable<DeductionRow> {
    return this.http.patch<any>(`${this.rootUrl}/api/v1/deductions/${deductionId}/toggle-status`, {})
      .pipe(map((res) => res?.data ?? res));
  }

  delete(deductionId: number): Observable<any> {
    return this.http.delete<any>(`${this.rootUrl}/api/v1/deductions/${deductionId}`);
  }

  listPackages(academyId: string | number, filters: Record<string, any> = {}): Observable<DeductionPackageOption[]> {
    return this.http.get<any>(`${this.rootUrl}/api/v1/academy/${academyId}/packages`, {
      params: this.toParams(filters),
    }).pipe(map((res) => res?.data ?? []));
  }

  private toParams(filters: Record<string, any>): HttpParams {
    let params = new HttpParams();
    Object.entries(filters || {}).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, String(value));
      }
    });
    return params;
  }
}
