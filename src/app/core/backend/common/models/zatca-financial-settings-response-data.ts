/* tslint:disable */
/* eslint-disable */
export interface ZatcaFinancialSettingsResponseData {
  commercial_name: string;
  commercial_registration_number: string;
  tax_number: string;
  add_tax: number;
  notification_mobile: string;
  auto_generate_receipts: boolean;
  receipt_sequence_start_subscription: number;
  receipt_sequence_start_rent: number;
  receipt_sequence_start_store: number;
  receipt_sequence_start_expenses: number;
  signature_image_url: string;
  stamp_image_url: string;
  zatca_enabled: boolean;
  taxes_enabled: boolean;
  products_enabled: boolean;
  mersal_base_url?: string;
  mersal_has_api_key?: boolean;
  mersal_enabled?: boolean;
  mersal_api_key_hint?: string;
  mersal_chat_channel?: 'whatsapp' | 'webchat' | 'omnichannel';
}
