/* tslint:disable */
/* eslint-disable */
import { InvoicesApiVultListInvoicesResponseDataFilters } from '../models/invoices-api-vult-list-invoices-response-data-filters';
import { InvoicesApiVultListInvoicesResponseDataInvoicesAcademy } from '../models/invoices-api-vult-list-invoices-response-data-invoices-academy';
import { InvoicesApiVultListInvoicesResponseDataInvoicesPaymentStatus } from '../models/invoices-api-vult-list-invoices-response-data-invoices-payment-status';
import { InvoicesApiVultListInvoicesResponseDataInvoicesType } from '../models/invoices-api-vult-list-invoices-response-data-invoices-type';
import { InvoicesApiVultListInvoicesResponseDataPagination } from '../models/invoices-api-vult-list-invoices-response-data-pagination';
export interface InvoicesApiVultListInvoicesResponseData {
  filters?: InvoicesApiVultListInvoicesResponseDataFilters;
  invoices?: Array<{
'id'?: number;
'serial_number'?: number;
'formatted_serial'?: string;
'type'?: InvoicesApiVultListInvoicesResponseDataInvoicesType;
'amount'?: number;
'tax'?: number;
'remaining_amount'?: number;
'total'?: number;
'payment_status'?: InvoicesApiVultListInvoicesResponseDataInvoicesPaymentStatus;
'payment_method'?: string;
'receipt_number'?: string;
'academy'?: InvoicesApiVultListInvoicesResponseDataInvoicesAcademy;
'start_date'?: string;
'start_date_formatted'?: string;
'end_date'?: string;
'end_date_formatted'?: string;
'created_at'?: string;
'created_at_formatted'?: string;
'related_id'?: number;
'details'?: string;
'qr_url'?: string;
'view_url'?: string;
'download_url'?: string;
}>;
  pagination?: InvoicesApiVultListInvoicesResponseDataPagination;
}
