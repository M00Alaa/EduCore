/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ZatcaFinancialSettingsResponse } from '../../models/zatca-financial-settings-response';

export interface ApiV1AcademyAcademyIdReceiptSettingsPut$Params {
  academy_id: string;
      body?: {
'commercial_name'?: string;
'commercial_registration_number'?: string;
'tax_number'?: string;
'add_tax'?: number;
'notification_mobile'?: string;
'auto_generate_receipts'?: boolean;
'receipt_sequence_start_subscription'?: number;
'receipt_sequence_start_rent'?: number;
'receipt_sequence_start_store'?: number;
'receipt_sequence_start_expenses'?: number;
'signature_image'?: string;
'stamp_image'?: string;
'mersal_base_url'?: string;
'mersal_api_key'?: string;
'mersal_chat_channel'?: 'whatsapp' | 'webchat' | 'omnichannel';
}
}

export function apiV1AcademyAcademyIdReceiptSettingsPut(http: HttpClient, rootUrl: string, params: ApiV1AcademyAcademyIdReceiptSettingsPut$Params, context?: HttpContext): Observable<StrictHttpResponse<ZatcaFinancialSettingsResponse>> {
  const rb = new RequestBuilder(rootUrl, apiV1AcademyAcademyIdReceiptSettingsPut.PATH, 'put');
  if (params) {
    rb.path('academy_id', params.academy_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ZatcaFinancialSettingsResponse>;
    })
  );
}

apiV1AcademyAcademyIdReceiptSettingsPut.PATH = '/api/v1/academy/{academy_id}/receipt-settings';
