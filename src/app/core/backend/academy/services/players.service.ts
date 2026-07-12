import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { errorCallback } from 'src/app/app-const';
import {
    ApiEnvelope,
    ApiPaginatedPayload,
    ApiPaginationMeta,
    PaginatedResult,
    PlayerEntity,
    PlayerLookups,
    PlayerTeamEntity,
    PlayerTeamLookups,
    PlayerAppointmentEntity,
    PlayerAwardEntity,
    PlayerAwardPayload,
    PlayerTeamPayload,
    AssignPlayerToTeamPayload,
    PlayerPayload,
    GuardianLookupResponse
} from '../models/players.model';

@Injectable({ providedIn: 'root' })
export class PlayersService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    private requestBuilder(params: Record<string, unknown>): any {
        const queryParams: any = {};
        Object.entries(params || {}).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                queryParams[key] = value;
            }
        });
        return queryParams;
    }

    listPlayers(
        academyId: string,
        params: { page?: number; per_page?: number; search?: string; status?: string; team_id?: number } = {}
    ): Observable<PaginatedResult<PlayerEntity>> {
        return this.http
            .get<ApiEnvelope<ApiPaginatedPayload<PlayerEntity>>>(
                `${this.rootUrl}/api/v1/academy/${academyId}/players`,
                { params: this.requestBuilder(params as Record<string, unknown>) }
            )
            .pipe(
                map((response) => this.normalizePaginated(this.unwrap(response))),
                catchError(err => { errorCallback(err); return throwError(() => err); })
            );
    }

    getPlayer(academyId: string, playerId: number): Observable<PlayerEntity> {
        return this.http
            .get<ApiEnvelope<PlayerEntity>>(`${this.rootUrl}/api/v1/academy/${academyId}/players/${playerId}`)
            .pipe(
                map((response) => this.unwrap(response)),
                catchError(err => { errorCallback(err); return throwError(() => err); })
            );
    }

    lookupGuardianByMobile(academyId: string, mobile: string): Observable<GuardianLookupResponse> {
        return this.http
            .get<ApiEnvelope<GuardianLookupResponse>>(
                `${this.rootUrl}/api/v1/academy/${academyId}/players/guardian-lookup`,
                {
                    params: this.requestBuilder({ mobile }),
                    headers: { 'X-Skip-Global-Error': 'true' },
                }
            )
            .pipe(
                map((response) => this.unwrap(response)),
                catchError(err => throwError(() => err))
            );
    }

    createPlayer(academyId: string, payload: PlayerPayload): Observable<PlayerEntity> {
        return this.http
            .post<ApiEnvelope<PlayerEntity>>(`${this.rootUrl}/api/v1/academy/${academyId}/players`, payload)
            .pipe(
                map((response) => this.unwrap(response)),
                catchError(err => { errorCallback(err); return throwError(() => err); })
            );
    }

    updatePlayer(academyId: string, playerId: number, payload: PlayerPayload): Observable<PlayerEntity> {
        return this.http
            .put<ApiEnvelope<PlayerEntity>>(`${this.rootUrl}/api/v1/academy/${academyId}/players/${playerId}`, payload)
            .pipe(
                map((response) => this.unwrap(response)),
                catchError(err => { errorCallback(err); return throwError(() => err); })
            );
    }

    assignPlayerToTeam(
        academyId: string,
        playerId: number,
        payload: AssignPlayerToTeamPayload
    ): Observable<PlayerEntity> {
        return this.http
            .post<ApiEnvelope<PlayerEntity>>(
                `${this.rootUrl}/api/v1/academy/${academyId}/players/${playerId}/assign-team`,
                payload
            )
            .pipe(
                map((response) => this.unwrap(response)),
                catchError(err => { errorCallback(err); return throwError(() => err); })
            );
    }

    deletePlayer(academyId: string, playerId: number): Observable<void> {
        return this.http
            .delete<ApiEnvelope<unknown>>(`${this.rootUrl}/api/v1/academy/${academyId}/players/${playerId}`)
            .pipe(
                map(() => void 0),
                catchError(err => { errorCallback(err); return throwError(() => err); })
            );
    }

    getLookups(academyId: string, cityId?: number | null, playerId?: number | null): Observable<PlayerLookups> {
        const params: Record<string, unknown> = {};
        if (cityId) {
            params['city_id'] = cityId;
        }
        if (playerId) {
            params['player_id'] = playerId;
        }

        return this.http
            .get<ApiEnvelope<PlayerLookups>>(
                `${this.rootUrl}/api/v1/academy/${academyId}/players/lookups`,
                { params: this.requestBuilder(params as Record<string, unknown>) }
            )
            .pipe(
                map((response) => this.unwrap(response)),
                catchError(err => { errorCallback(err); return throwError(() => err); })
            );
    }

    listTeams(
        academyId: string,
        params: { page?: number; per_page?: number; search?: string; sport_id?: number; trainer_id?: number } = {}
    ): Observable<PaginatedResult<PlayerTeamEntity>> {
        return this.http
            .get<ApiEnvelope<ApiPaginatedPayload<PlayerTeamEntity>>>(
                `${this.rootUrl}/api/v1/academy/${academyId}/player-teams`,
                { params: this.requestBuilder(params as Record<string, unknown>) }
            )
            .pipe(
                map((response) => this.normalizePaginated(this.unwrap(response))),
                catchError(err => { errorCallback(err); return throwError(() => err); })
            );
    }

    getTeamLookups(academyId: string): Observable<PlayerTeamLookups> {
        return this.http
            .get<ApiEnvelope<PlayerTeamLookups>>(`${this.rootUrl}/api/v1/academy/${academyId}/player-teams/lookups`)
            .pipe(
                map((response) => this.unwrap(response)),
                catchError(err => { errorCallback(err); return throwError(() => err); })
            );
    }

    getTeamTrainerOptions(
        academyId: string,
        params: { sport_id?: number; search?: string; limit?: number } = {}
    ): Observable<Array<{ id: number; name: string }>> {
        return this.http
            .get<ApiEnvelope<{ trainer_options: Array<{ id: number; name: string }> }>>(
                `${this.rootUrl}/api/v1/academy/${academyId}/player-teams/trainer-options`,
                { params: this.requestBuilder(params as Record<string, unknown>) }
            )
            .pipe(
                map((response) => this.unwrap(response)?.trainer_options || []),
                catchError(err => { errorCallback(err); return throwError(() => err); })
            );
    }

    getTeamPlayerOptions(
        academyId: string,
        params: {
            sport_id?: number;
            academy_sport_id?: number;
            search?: string;
            limit?: number;
            only_active_subscription?: boolean | number;
            exclude_attended_on_date?: boolean | number;
            attend_date?: string;
        } = {}
    ): Observable<Array<{
        id: number;
        name: string;
        mobile?: string | null;
        parent_name?: string | null;
        gender?: {
            id: number;
            key: string;
            name: string;
            name_ar?: string;
            name_en?: string;
        } | null;
    }>> {
        return this.http
            .get<ApiEnvelope<{
                player_options: Array<{
                    id: number;
                    name: string;
                    mobile?: string | null;
                    parent_name?: string | null;
                    gender?: {
                        id: number;
                        key: string;
                        name: string;
                        name_ar?: string;
                        name_en?: string;
                    } | null;
                }>
            }>>(
                `${this.rootUrl}/api/v1/academy/${academyId}/player-teams/player-options`,
                { params: this.requestBuilder(params as Record<string, unknown>) }
            )
            .pipe(
                map((response) => this.unwrap(response)?.player_options || []),
                catchError(err => { errorCallback(err); return throwError(() => err); })
            );
    }

    createTeam(academyId: string, payload: PlayerTeamPayload): Observable<PlayerTeamEntity> {
        return this.http
            .post<ApiEnvelope<PlayerTeamEntity>>(`${this.rootUrl}/api/v1/academy/${academyId}/player-teams`, payload)
            .pipe(
                map((response) => this.unwrap(response)),
                catchError(err => { errorCallback(err); return throwError(() => err); })
            );
    }

    updateTeam(academyId: string, teamId: number, payload: PlayerTeamPayload): Observable<PlayerTeamEntity> {
        return this.http
            .put<ApiEnvelope<PlayerTeamEntity>>(`${this.rootUrl}/api/v1/academy/${academyId}/player-teams/${teamId}`, payload)
            .pipe(
                map((response) => this.unwrap(response)),
                catchError(err => { errorCallback(err); return throwError(() => err); })
            );
    }

    deleteTeam(academyId: string, teamId: number): Observable<void> {
        return this.http
            .delete<ApiEnvelope<unknown>>(`${this.rootUrl}/api/v1/academy/${academyId}/player-teams/${teamId}`)
            .pipe(
                map(() => void 0),
                catchError(err => { errorCallback(err); return throwError(() => err); })
            );
    }

    getPlayerAppointments(
        academyId: string,
        playerId: number,
        params: { page?: number; per_page?: number; upcoming_only?: boolean } = {}
    ): Observable<PaginatedResult<PlayerAppointmentEntity>> {
        return this.http
            .get<ApiEnvelope<ApiPaginatedPayload<PlayerAppointmentEntity>>>(
                `${this.rootUrl}/api/v1/academy/${academyId}/players/${playerId}/appointments`,
                { params: this.requestBuilder(params as Record<string, unknown>) }
            )
            .pipe(
                map((response) => this.normalizePaginated(this.unwrap(response))),
                catchError(err => { errorCallback(err); return throwError(() => err); })
            );
    }

    getPlayerAwards(academyId: string, playerId: number): Observable<PlayerAwardEntity[]> {
        return this.http
            .get<ApiEnvelope<PlayerAwardEntity[]>>(`${this.rootUrl}/api/v1/academy/${academyId}/players/${playerId}/awards`)
            .pipe(
                map((response) => this.unwrap(response) || []),
                catchError(err => { errorCallback(err); return throwError(() => err); })
            );
    }

    createPlayerAward(academyId: string, playerId: number, payload: PlayerAwardPayload): Observable<PlayerAwardEntity> {
        return this.http
            .post<ApiEnvelope<PlayerAwardEntity>>(
                `${this.rootUrl}/api/v1/academy/${academyId}/players/${playerId}/awards`,
                payload
            )
            .pipe(
                map((response) => this.unwrap(response)),
                catchError(err => { errorCallback(err); return throwError(() => err); })
            );
    }

    private unwrap<T>(response: ApiEnvelope<T>): T {
        return response?.data as T;
    }

    private normalizePaginated<T>(payload: ApiPaginatedPayload<T> | undefined): PaginatedResult<T> {
        const fallbackMeta: ApiPaginationMeta = {
            current_page: 1,
            last_page: 1,
            per_page: 10,
            total: 0,
        };

        if (!payload) {
            return { items: [], meta: fallbackMeta, links: {} };
        }

        return {
            items: payload.data ?? [],
            meta: {
                current_page: payload.meta?.current_page ?? fallbackMeta.current_page,
                last_page: payload.meta?.last_page ?? fallbackMeta.last_page,
                per_page: payload.meta?.per_page ?? fallbackMeta.per_page,
                total: payload.meta?.total ?? (payload.data?.length ?? fallbackMeta.total),
            },
            links: payload.links ?? {},
        };
    }
}
