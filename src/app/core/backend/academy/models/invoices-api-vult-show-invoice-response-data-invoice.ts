/* tslint:disable */
/* eslint-disable */
import { InvoicesApiVultShowInvoiceResponseDataInvoiceAcademy } from '../models/invoices-api-vult-show-invoice-response-data-invoice-academy';
import { InvoicesApiVultShowInvoiceResponseDataInvoiceType } from '../models/invoices-api-vult-show-invoice-response-data-invoice-type';

export interface InvoicesApiVultShowInvoiceResponseDataInvoice {
  academy?: InvoicesApiVultShowInvoiceResponseDataInvoiceAcademy;
  amount?: number;
  created_at?: string;
  created_at_formatted?: string;
  details?: string;
  remaining_amount?: number;
  paid_amount?: number;
  refunded_amount?: number;
  settled_amount?: number;
  discount?: number;
  payment_method?: string;
  payment_status?: {
    id?: number;
    name?: string;
    name_en?: string;
  };
  receipt_number?: string;
  download_url?: string;
  end_date?: string;
  end_date_formatted?: string;
  start_date_formatted?: string;
  formatted_serial?: string;
  id?: number;
  qr_url?: string;
  related_id?: number;
  serial_number?: number;
  start_date?: string;
  tax?: number;
  total?: number;
  type?: InvoicesApiVultShowInvoiceResponseDataInvoiceType;
  view_url?: string;
  // Detail-only fields
  tax_number?: string;
  commercial_number?: string;
  commercial_name?: string;
  main_academy_name?: string;
  academy_district?: string;
  client_name?: string;
  client_phone?: string;
  invoice_note?: string;
  current_payment_amount?: number;
  previous_paid_amount?: number;
  items?: InvoicesApiVultShowInvoiceResponseDataInvoiceItem[];
}

export interface InvoicesApiVultShowInvoiceResponseDataInvoiceItem {
  name?: string;
  guardian_name?: string;
  sport_name?: string;
  package_name?: string;
  item_type?: string;
  price?: number;
  quantity?: number;
  total?: number;
  note?: string;
}
