import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import {
  CreateExpenseCategoryPayload,
  CreateExpensePayload,
  ExpenseLookups,
  ExpenseMainCategory,
  ExpensePaginatedResult,
  ExpensePaginationLinks,
  ExpensePaginationMeta,
  ExpenseRecord,
  UpdateExpenseCategoryPayload,
  UpdateExpensePayload,
} from '../models/expenses-manual.models';

interface ApiEnvelope<T> {
  status: string;
  message?: string;
  data: T;
}

interface ApiPaginatedPayload<T> {
  data: T[];
  links?: ExpensePaginationLinks;
  meta?: Partial<ExpensePaginationMeta>;
}

@Injectable({ providedIn: 'root' })
export class ExpensesManualService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  getLookups(academyId: string): Observable<ExpenseLookups> {
    return this.http
      .get<ApiEnvelope<ExpenseLookups>>(`${this.rootUrl}/api/v1/academy/${academyId}/expenses/lookups`)
      .pipe(map((response) => this.unwrap(response)));
  }

  listExpenses(
    academyId: string,
    params: {
      page?: number;
      per_page?: number;
      search?: string;
      receipt_number?: string;
      main_category_id?: number | null;
      expenses_category_id?: number | null;
      academy_sport_id?: number | null;
      treasury?: number | null;
      date_from?: string;
      date_to?: string;
    } = {}
  ): Observable<ExpensePaginatedResult<ExpenseRecord>> {
    return this.http
      .get<ApiEnvelope<ApiPaginatedPayload<ExpenseRecord>>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/expenses`,
        {
          params: this.buildParams(params as Record<string, unknown>),
        }
      )
      .pipe(map((response) => this.normalizePaginated(this.unwrap(response))));
  }

  createExpense(academyId: string, payload: CreateExpensePayload): Observable<ExpenseRecord> {
    return this.http
      .post<ApiEnvelope<ExpenseRecord>>(`${this.rootUrl}/api/v1/academy/${academyId}/expenses`, payload)
      .pipe(map((response) => this.unwrap(response)));
  }

  updateExpense(expenseId: number, payload: UpdateExpensePayload): Observable<ExpenseRecord> {
    return this.http
      .put<ApiEnvelope<ExpenseRecord>>(`${this.rootUrl}/api/v1/expenses/${expenseId}`, payload)
      .pipe(map((response) => this.unwrap(response)));
  }

  deleteExpense(expenseId: number): Observable<void> {
    return this.http
      .delete<ApiEnvelope<unknown>>(`${this.rootUrl}/api/v1/expenses/${expenseId}`)
      .pipe(map(() => void 0));
  }

  listCategories(
    academyId: string,
    params: {
      page?: number;
      per_page?: number;
      search?: string;
    } = {}
  ): Observable<ExpensePaginatedResult<ExpenseMainCategory>> {
    return this.http
      .get<ApiEnvelope<ApiPaginatedPayload<ExpenseMainCategory>>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/expenses/categories`,
        {
          params: this.buildParams(params as Record<string, unknown>),
        }
      )
      .pipe(map((response) => this.normalizePaginated(this.unwrap(response))));
  }

  createCategory(academyId: string, payload: CreateExpenseCategoryPayload): Observable<ExpenseMainCategory> {
    return this.http
      .post<ApiEnvelope<ExpenseMainCategory>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/expenses/categories`,
        payload
      )
      .pipe(map((response) => this.unwrap(response)));
  }

  updateCategory(categoryId: number, payload: UpdateExpenseCategoryPayload): Observable<ExpenseMainCategory> {
    return this.http
      .put<ApiEnvelope<ExpenseMainCategory>>(`${this.rootUrl}/api/v1/expenses/categories/${categoryId}`, payload)
      .pipe(map((response) => this.unwrap(response)));
  }

  deleteCategory(categoryId: number): Observable<void> {
    return this.http
      .delete<ApiEnvelope<unknown>>(`${this.rootUrl}/api/v1/expenses/categories/${categoryId}`)
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

  private normalizePaginated<T>(payload: ApiPaginatedPayload<T> | undefined): ExpensePaginatedResult<T> {
    const fallbackMeta: ExpensePaginationMeta = {
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

