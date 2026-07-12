import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfiguration } from '../../common/api-configuration';

import { MarkAttendancePayload } from '../models/player-attendance-manual.models';

@Injectable({ providedIn: 'root' })
export class PlayerAttendanceService {
  constructor(
    private http: HttpClient,
    private config: ApiConfiguration
  ) { }

  /**
   * Get players for a schedule on a specific date.
   * trainerScope: true → uses /trainer/ prefix in URL
   */
  getSchedulePlayers(
    academyId: string,
    scheduleId: number,
    date: string,
    trainerScope = false
  ): Observable<any> {
    const prefix = trainerScope ? 'trainer/' : '';
    const url = `${this.config.rootUrl}/api/v1/academy/${academyId}/${prefix}player-attendance/schedule/${scheduleId}`;
    const params = new HttpParams().set('date', date);
    return this.http.get(url, { params });
  }

  /**
   * Mark/toggle attendance for a player.
   */
  markAttendance(
    academyId: string,
    payload: MarkAttendancePayload,
    trainerScope = false
  ): Observable<any> {
    const prefix = trainerScope ? 'trainer/' : '';
    const url = `${this.config.rootUrl}/api/v1/academy/${academyId}/${prefix}player-attendance/mark`;
    return this.http.post(url, payload);
  }

  /**
   * Get attendance history.
   */
  getHistory(
    academyId: string,
    filters: Record<string, string>,
    trainerScope = false
  ): Observable<any> {
    const prefix = trainerScope ? 'trainer/' : '';
    const url = `${this.config.rootUrl}/api/v1/academy/${academyId}/${prefix}player-attendance/history`;
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params = params.set(key, value);
    });
    return this.http.get(url, { params });
  }

  /**
   * Bulk-mark attendance for multiple players at once (Admin scope).
   * payload.attendances: [{ schedule_player_id: [id1, id2, ...] }]
   */
  markBulk(
    academyId: string,
    payload: {
      schedule_id: number;
      attend_date: string;
      attendances?: { schedule_player_id: number[]; attend_status?: string }[];
      manual_attendances?: { player_id: number[]; attend_status?: string }[];
    },
    trainerScope = false
  ): Observable<any> {
    const prefix = trainerScope ? 'trainer/' : '';
    const url = `${this.config.rootUrl}/api/v1/academy/${academyId}/${prefix}player-attendance/bulk-mark`;
    return this.http.post(url, payload);
  }

  /**
   * Mark manual attendance (Admin only).
   */
  markManual(
    academyId: string,
    payload: any
  ): Observable<any> {
    const url = `${this.config.rootUrl}/api/v1/academy/${academyId}/player-attendance/mark-manual`;
    return this.http.post(url, payload);
  }

  /**
   * Scan a QR code string (from hardware scanner) to resolve player + schedule info.
   * Sends numeric_string to /api/v1/parent/player/scan-qr
   */
  scanQr(numericString: string): Observable<any> {
    const url = `${this.config.rootUrl}/api/v1/parent/player/scan-qr`;
    return this.http.post(url, { numeric_string: numericString });
  }
}
