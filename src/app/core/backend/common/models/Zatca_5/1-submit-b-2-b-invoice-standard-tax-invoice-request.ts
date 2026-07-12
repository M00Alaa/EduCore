/* tslint:disable */
/* eslint-disable */
import type { Zatca51SubmitB2BInvoiceStandardTaxInvoiceRequestBuyer } from '../../models/Zatca_5/1-submit-b-2-b-invoice-standard-tax-invoice-request-buyer';
export interface Zatca51SubmitB2BInvoiceStandardTaxInvoiceRequest {
  buyer?: Zatca51SubmitB2BInvoiceStandardTaxInvoiceRequestBuyer;
  invoice_number?: string;
  issue_date?: string;
  issue_time?: string;
  items?: Array<{
    'name'?: string;
    'quantity'?: number;
    'unit_price'?: number;
    'line_total'?: number;
    'tax_amount'?: number;
  }>;
  subtotal?: number;
  tax_amount?: number;
  taxable_amount?: number;
  total?: number;
}
