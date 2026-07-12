/* tslint:disable */
/* eslint-disable */
export interface Zatca61SubmitB2CInvoiceSimplifiedTaxInvoiceRequest {
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
