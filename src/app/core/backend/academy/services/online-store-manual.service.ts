import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import {
  CreateOnlineStoreOrderPayload,
  CreateOnlineStoreCategoryPayload,
  CreateOnlineStoreProductPayload,
  OnlineStoreCategory,
  OnlineStoreLookups,
  OnlineStoreOrder,
  OnlineStorePromoOption,
  OnlineStorePaginatedResult,
  OnlineStorePaginationLinks,
  OnlineStorePaginationMeta,
  OnlineStoreProduct,
  RefundOnlineStoreOrderPayload,
  UpdateOnlineStoreCategoryPayload,
  UpdateOnlineStoreProductPayload,
  AddStockPayload,
} from '../models/online-store-manual.models';

interface ApiEnvelope<T> {
  status: string;
  message?: string;
  data: T;
}

interface ApiPaginatedPayload<T> {
  data: T[];
  links?: OnlineStorePaginationLinks;
  meta?: Partial<OnlineStorePaginationMeta>;
}

@Injectable({ providedIn: 'root' })
export class OnlineStoreManualService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  listCategories(
    academyId: string,
    params: { page?: number; per_page?: number; search?: string; status?: string | number } = {}
  ): Observable<OnlineStorePaginatedResult<OnlineStoreCategory>> {
    return this.http
      .get<ApiEnvelope<ApiPaginatedPayload<OnlineStoreCategory>>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/online-store/categories`,
        { params: this.buildParams(params as Record<string, unknown>) }
      )
      .pipe(map((response) => this.normalizePaginated(this.unwrap(response))));
  }

  createCategory(academyId: string, payload: CreateOnlineStoreCategoryPayload): Observable<OnlineStoreCategory> {
    return this.http
      .post<ApiEnvelope<OnlineStoreCategory>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/online-store/categories`,
        payload
      )
      .pipe(map((response) => this.unwrap(response)));
  }

  updateCategory(categoryId: number, payload: UpdateOnlineStoreCategoryPayload): Observable<OnlineStoreCategory> {
    return this.http
      .put<ApiEnvelope<OnlineStoreCategory>>(
        `${this.rootUrl}/api/v1/online-store/categories/${categoryId}`,
        payload
      )
      .pipe(map((response) => this.unwrap(response)));
  }

  deleteCategory(categoryId: number): Observable<void> {
    return this.http
      .delete<ApiEnvelope<unknown>>(`${this.rootUrl}/api/v1/online-store/categories/${categoryId}`)
      .pipe(map(() => void 0));
  }

  listProducts(
    academyId: string,
    params: {
      page?: number;
      per_page?: number;
      search?: string;
      category_id?: number | null;
      sport_id?: number | null;
      status?: string | number | null;
      price_from?: number | null;
      price_to?: number | null;
    } = {}
  ): Observable<OnlineStorePaginatedResult<OnlineStoreProduct>> {
    return this.http
      .get<ApiEnvelope<ApiPaginatedPayload<OnlineStoreProduct>>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/online-store/products`,
        { params: this.buildParams(params as Record<string, unknown>) }
      )
      .pipe(map((response) => this.normalizePaginated(this.unwrap(response))));
  }

  getProduct(productId: number): Observable<OnlineStoreProduct> {
    return this.http
      .get<ApiEnvelope<OnlineStoreProduct>>(`${this.rootUrl}/api/v1/online-store/products/${productId}`)
      .pipe(map((response) => this.unwrap(response)));
  }

  createProduct(academyId: string, payload: CreateOnlineStoreProductPayload): Observable<OnlineStoreProduct> {
    return this.http
      .post<ApiEnvelope<OnlineStoreProduct>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/online-store/products`,
        payload
      )
      .pipe(map((response) => this.unwrap(response)));
  }

  importProducts(academyId: string, payload: { products: any[] }): Observable<{ imported: number }> {
    return this.http
      .post<ApiEnvelope<{ imported: number }>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/online-store/products/import`,
        payload
      )
      .pipe(map((response) => this.unwrap(response)));
  }

  updateProduct(productId: number, payload: UpdateOnlineStoreProductPayload): Observable<OnlineStoreProduct> {
    return this.http
      .put<ApiEnvelope<OnlineStoreProduct>>(`${this.rootUrl}/api/v1/online-store/products/${productId}`, payload)
      .pipe(map((response) => this.unwrap(response)));
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http
      .delete<ApiEnvelope<unknown>>(`${this.rootUrl}/api/v1/online-store/products/${productId}`)
      .pipe(map(() => void 0));
  }

  addStock(academyId: string, payload: AddStockPayload): Observable<OnlineStoreProduct[]> {
    return this.http
      .post<ApiEnvelope<OnlineStoreProduct[]>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/online-store/products/stock`,
        payload
      )
      .pipe(map((response) => this.unwrap(response)));
  }

  listOrders(
    academyId: string,
    params: {
      page?: number;
      per_page?: number;
      search?: string;
      payment_status?: number | null;
      order_status?: number | null;
      sport_id?: number | null;
      price_from?: number | null;
      price_to?: number | null;
      include_cancelled?: boolean;
    } = {}
  ): Observable<OnlineStorePaginatedResult<OnlineStoreOrder>> {
    return this.http
      .get<ApiEnvelope<ApiPaginatedPayload<OnlineStoreOrder>>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/online-store/orders`,
        { params: this.buildParams(params as Record<string, unknown>) }
      )
      .pipe(map((response) => this.normalizePaginated(this.unwrap(response))));
  }

  getOrder(orderId: number): Observable<OnlineStoreOrder> {
    return this.http
      .get<ApiEnvelope<OnlineStoreOrder>>(`${this.rootUrl}/api/v1/online-store/orders/${orderId}`)
      .pipe(map((response) => this.unwrap(response)));
  }

  cancelOrder(orderId: number): Observable<OnlineStoreOrder> {
    return this.http
      .delete<ApiEnvelope<OnlineStoreOrder>>(`${this.rootUrl}/api/v1/online-store/orders/${orderId}`)
      .pipe(map((response) => this.unwrap(response)));
  }

  refundOrder(orderId: number, payload: RefundOnlineStoreOrderPayload): Observable<OnlineStoreOrder> {
    return this.http
      .post<ApiEnvelope<OnlineStoreOrder>>(`${this.rootUrl}/api/v1/online-store/orders/${orderId}/refund`, payload)
      .pipe(map((response) => this.unwrap(response)));
  }

  createOrder(academyId: string, payload: CreateOnlineStoreOrderPayload): Observable<OnlineStoreOrder> {
    return this.http
      .post<ApiEnvelope<OnlineStoreOrder>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/online-store/orders`,
        payload
      )
      .pipe(map((response) => this.unwrap(response)));
  }

  updateOrder(orderId: number, payload: CreateOnlineStoreOrderPayload): Observable<OnlineStoreOrder> {
    return this.http
      .put<ApiEnvelope<OnlineStoreOrder>>(
        `${this.rootUrl}/api/v1/online-store/orders/${orderId}`,
        payload
      )
      .pipe(map((response) => this.unwrap(response)));
  }

  getLookups(academyId: string): Observable<OnlineStoreLookups> {
    return this.http
      .get<ApiEnvelope<OnlineStoreLookups>>(`${this.rootUrl}/api/v1/academy/${academyId}/online-store/lookups`)
      .pipe(map((response) => this.unwrap(response)));
  }

  validatePromoCode(academyId: string, discountCode: string): Observable<OnlineStorePromoOption> {
    return this.http
      .post<ApiEnvelope<{ valid: boolean; promo: OnlineStorePromoOption | null }>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/promos/validate-code`,
        {
          discount_code: discountCode,
          scope: 'products',
        }
      )
      .pipe(map((response) => this.unwrap(response)?.promo as OnlineStorePromoOption));
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

  private normalizePaginated<T>(payload: ApiPaginatedPayload<T> | undefined): OnlineStorePaginatedResult<T> {
    const fallbackMeta: OnlineStorePaginationMeta = {
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
