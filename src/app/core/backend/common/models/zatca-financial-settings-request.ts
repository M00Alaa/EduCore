/* tslint:disable */
/* eslint-disable */
export interface ZatcaFinancialSettingsRequest {
  add_tax?: number;
  auto_generate_receipts?: boolean;
  commercial_name?: string;
  commercial_registration_number?: string;
  notification_mobile?: string;
  receipt_sequence_start_expenses?: number;
  receipt_sequence_start_rent?: number;
  receipt_sequence_start_store?: number;
  receipt_sequence_start_subscription?: number;
  signature_image?: string;
  stamp_image?: string;
  tax_number?: string;
}
