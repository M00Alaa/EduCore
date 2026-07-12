import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import {
  MersalApiEnvelope,
  MersalAccountProfile,
  MersalContact,
  MersalContactPayload,
  MersalFaq,
  MersalFaqPayload,
  MersalFaqQuestion,
  MersalFaqQuestionPayload,
  MersalProduct,
  MersalProductPayload,
  MersalProductsListResponse,
  MersalSendTextPayload,
} from '../models/mersal-tools.models';

@Injectable({ providedIn: 'root' })
export class MersalToolsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  listProducts(
    academyId: string,
    params: {
      page?: number;
      limit?: number;
      offset?: number;
      search?: string;
      status?: string;
      source_platform?: string;
    } = {}
  ): Observable<MersalProductsListResponse> {
    return this.http
      .get<MersalApiEnvelope<MersalProductsListResponse>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/mersal/products`,
        { params: this.buildParams(params) }
      )
      .pipe(map((response) => this.unwrap(response)));
  }

  syncProducts(academyId: string): Observable<Record<string, unknown>> {
    return this.http
      .post<MersalApiEnvelope<Record<string, unknown>>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/mersal/products/sync`,
        {}
      )
      .pipe(map((response) => this.unwrap(response)));
  }

  createProduct(academyId: string, payload: MersalProductPayload): Observable<MersalProduct> {
    return this.http
      .post<MersalApiEnvelope<MersalProduct>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/mersal/products`,
        payload
      )
      .pipe(map((response) => this.unwrap(response)));
  }

  getProduct(academyId: string, productId: string): Observable<MersalProduct> {
    return this.http
      .get<MersalApiEnvelope<MersalProduct>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/mersal/products/${encodeURIComponent(productId)}`
      )
      .pipe(map((response) => this.unwrap(response)));
  }

  updateProduct(academyId: string, productId: string, payload: MersalProductPayload): Observable<MersalProduct> {
    return this.http
      .put<MersalApiEnvelope<MersalProduct>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/mersal/products/${encodeURIComponent(productId)}`,
        payload
      )
      .pipe(map((response) => this.unwrap(response)));
  }

  listFaqs(academyId: string): Observable<MersalFaq[]> {
    return this.http
      .get<MersalApiEnvelope<MersalFaq[]>>(`${this.rootUrl}/api/v1/academy/${academyId}/mersal/faqs`)
      .pipe(map((response) => this.unwrap(response)));
  }

  syncFaqs(academyId: string): Observable<Record<string, unknown>> {
    return this.http
      .post<MersalApiEnvelope<Record<string, unknown>>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/mersal/faqs/sync`,
        {}
      )
      .pipe(map((response) => this.unwrap(response)));
  }

  createFaq(academyId: string, payload: MersalFaqPayload): Observable<MersalFaq> {
    return this.http
      .post<MersalApiEnvelope<MersalFaq>>(`${this.rootUrl}/api/v1/academy/${academyId}/mersal/faqs`, payload)
      .pipe(map((response) => this.unwrap(response)));
  }

  getFaq(academyId: string, faqId: string): Observable<MersalFaq> {
    return this.http
      .get<MersalApiEnvelope<MersalFaq>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/mersal/faqs/${encodeURIComponent(faqId)}`
      )
      .pipe(map((response) => this.unwrap(response)));
  }

  updateFaq(academyId: string, faqId: string, payload: MersalFaqPayload): Observable<MersalFaq> {
    return this.http
      .put<MersalApiEnvelope<MersalFaq>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/mersal/faqs/${encodeURIComponent(faqId)}`,
        payload
      )
      .pipe(map((response) => this.unwrap(response)));
  }

  listFaqQuestions(academyId: string, faqId: string): Observable<MersalFaqQuestion[]> {
    return this.http
      .get<MersalApiEnvelope<MersalFaqQuestion[]>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/mersal/faqs/${encodeURIComponent(faqId)}/questions`
      )
      .pipe(map((response) => this.unwrap(response)));
  }

  createFaqQuestion(
    academyId: string,
    faqId: string,
    payload: MersalFaqQuestionPayload
  ): Observable<MersalFaqQuestion> {
    return this.http
      .post<MersalApiEnvelope<MersalFaqQuestion>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/mersal/faqs/${encodeURIComponent(faqId)}/questions`,
        payload
      )
      .pipe(map((response) => this.unwrap(response)));
  }

  updateFaqQuestion(
    academyId: string,
    faqId: string,
    questionId: string,
    payload: MersalFaqQuestionPayload
  ): Observable<MersalFaqQuestion> {
    return this.http
      .put<MersalApiEnvelope<MersalFaqQuestion>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/mersal/faqs/${encodeURIComponent(faqId)}/questions/${encodeURIComponent(questionId)}`,
        payload
      )
      .pipe(map((response) => this.unwrap(response)));
  }

  deleteFaqQuestion(academyId: string, faqId: string, questionId: string): Observable<Record<string, unknown>> {
    return this.http
      .delete<MersalApiEnvelope<Record<string, unknown>>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/mersal/faqs/${encodeURIComponent(faqId)}/questions/${encodeURIComponent(questionId)}`
      )
      .pipe(map((response) => this.unwrap(response)));
  }

  getChatAccount(academyId: string): Observable<MersalAccountProfile> {
    return this.http
      .get<MersalApiEnvelope<MersalAccountProfile>>(`${this.rootUrl}/api/v1/academy/${academyId}/mersal/chat/account`)
      .pipe(map((response) => this.unwrap(response)));
  }

  findContactsByField(academyId: string, fieldId: string, value: string): Observable<MersalContact[]> {
    const params = this.buildParams({ field_id: fieldId, value });

    return this.http
      .get<MersalApiEnvelope<MersalContact[]>>(`${this.rootUrl}/api/v1/academy/${academyId}/mersal/chat/contacts/find`, { params })
      .pipe(map((response) => this.unwrap(response)));
  }

  createContact(academyId: string, payload: MersalContactPayload): Observable<MersalContact> {
    return this.http
      .post<MersalApiEnvelope<MersalContact>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/mersal/chat/contacts`,
        payload
      )
      .pipe(map((response) => this.unwrap(response)));
  }

  getContact(academyId: string, contactId: string): Observable<MersalContact> {
    return this.http
      .get<MersalApiEnvelope<MersalContact>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/mersal/chat/contacts/${encodeURIComponent(contactId)}`
      )
      .pipe(map((response) => this.unwrap(response)));
  }

  sendText(academyId: string, contactId: string, payload: MersalSendTextPayload): Observable<Record<string, unknown>> {
    return this.http
      .post<MersalApiEnvelope<Record<string, unknown>>>(
        `${this.rootUrl}/api/v1/academy/${academyId}/mersal/chat/contacts/${encodeURIComponent(contactId)}/send-text`,
        payload
      )
      .pipe(map((response) => this.unwrap(response)));
  }

  private unwrap<T>(response: MersalApiEnvelope<T>): T {
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
}
