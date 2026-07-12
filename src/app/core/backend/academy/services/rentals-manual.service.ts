import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import {
  CreateRentPayload,
  CreateRentPaymentPayload,
  RentalAvailableSlotsResult,
  CreateRentalFacilityPayload,
  RentalContract,
  RentalFacility,
  RentalLookups,
  RentalPaginatedResult,
  RentalPaginationLinks,
  RentalPaginationMeta,
  UpdateRentalFacilityPayload,
} from '../models/rentals-manual.models';

interface ApiEnvelope<T> {
  status: string;
  message?: string;
  data: T;
}

interface ApiPaginatedPayload<T> {
  data: T[];
  links?: RentalPaginationLinks;
  meta?: Partial<RentalPaginationMeta>;
}

@Injectable({ providedIn: 'root' })
export class RentalsManualService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  getLookups(academyId: string): Observable<RentalLookups> {
    return this.http
      .get<ApiEnvelope<RentalLookups>>(`${this.rootUrl}/api/v1/academy/${academyId}/rentals/lookups`)
      .pipe(map((response) => this.unwrap(response)));
  }

  listFacilities(
    academyId: string,
    params: {
      page?: number;
      per_page?: number;
      search?: string;
      facility_type_id?: number | null;
    } = {}
  ): Observable<RentalPaginatedResult<RentalFacility>> {
    return this.http
      .get<ApiEnvelope<ApiPaginatedPayload<RentalFacility>>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/facilities`,
        {
          params: this.buildParams(params as Record<string, unknown>),
        }
      )
      .pipe(map((response) => this.normalizePaginated(this.unwrap(response))));
  }

  createFacility(academyId: string, payload: CreateRentalFacilityPayload): Observable<RentalFacility> {
    return this.http
      .post<ApiEnvelope<RentalFacility>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/facilities`,
        payload
      )
      .pipe(map((response) => this.unwrap(response)));
  }

  updateFacility(facilityId: number, payload: UpdateRentalFacilityPayload): Observable<RentalFacility> {
    return this.http
      .put<ApiEnvelope<RentalFacility>>(`${this.rootUrl}/api/v1/facilities/${facilityId}`, payload)
      .pipe(map((response) => this.unwrap(response)));
  }

  deleteFacility(facilityId: number): Observable<void> {
    return this.http
      .delete<ApiEnvelope<unknown>>(`${this.rootUrl}/api/v1/facilities/${facilityId}`)
      .pipe(map(() => void 0));
  }

  listRents(
    academyId: string,
    params: {
      page?: number;
      per_page?: number;
      search?: string;
      facility_id?: number | null;
      type?: number | null;
      payment_status?: number | null;
      payment_method?: number | null;
      date_from?: string;
      date_to?: string;
      occupancy_date?: string;
      occupancy_time?: string;
      expand_yearly_occupancy?: boolean | number;
    } = {}
  ): Observable<RentalPaginatedResult<RentalContract>> {
    return this.http
      .get<ApiEnvelope<ApiPaginatedPayload<RentalContract>>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/rentals`,
        {
          params: this.buildParams(params as Record<string, unknown>),
        }
      )
      .pipe(map((response) => this.normalizePaginated(this.unwrap(response))));
  }

  getAvailableSlots(
    academyId: string,
    params: {
      facility_id: number;
      date: string;
      period?: number | null;
      exclude_rent_id?: number | null;
    }
  ): Observable<RentalAvailableSlotsResult> {
    return this.http
      .get<ApiEnvelope<RentalAvailableSlotsResult>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/rentals/available-slots`,
        {
          params: this.buildParams(params as Record<string, unknown>),
        }
      )
      .pipe(map((response) => this.unwrap(response)));
  }

  createRent(academyId: string, payload: CreateRentPayload): Observable<RentalContract> {
    return this.http
      .post<ApiEnvelope<RentalContract>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/rentals`,
        payload
      )
      .pipe(map((response) => this.unwrap(response)));
  }

  getRent(rentId: number): Observable<RentalContract> {
    return this.http
      .get<ApiEnvelope<RentalContract>>(`${this.rootUrl}/api/v1/rentals/${rentId}`)
      .pipe(map((response) => this.unwrap(response)));
  }

  addPayment(rentId: number, payload: CreateRentPaymentPayload): Observable<RentalContract> {
    return this.http
      .post<ApiEnvelope<RentalContract>>(`${this.rootUrl}/api/v1/rentals/${rentId}/payments`, payload)
      .pipe(map((response) => this.unwrap(response)));
  }

  deleteRent(rentId: number): Observable<void> {
    return this.http
      .delete<ApiEnvelope<unknown>>(`${this.rootUrl}/api/v1/rentals/${rentId}`)
      .pipe(map(() => void 0));
  }

  private unwrap<T>(response: ApiEnvelope<T>): T {
    return response?.data as T;
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

  private normalizePaginated<T>(payload: ApiPaginatedPayload<T> | undefined): RentalPaginatedResult<T> {
    const fallbackMeta: RentalPaginationMeta = {
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
