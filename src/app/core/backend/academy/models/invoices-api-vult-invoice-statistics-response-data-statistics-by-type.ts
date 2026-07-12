/* tslint:disable */
/* eslint-disable */
import { InvoicesApiVultInvoiceStatisticsResponseDataStatisticsByTypeOrders } from '../models/invoices-api-vult-invoice-statistics-response-data-statistics-by-type-orders';
import { InvoicesApiVultInvoiceStatisticsResponseDataStatisticsByTypeRent } from '../models/invoices-api-vult-invoice-statistics-response-data-statistics-by-type-rent';
import { InvoicesApiVultInvoiceStatisticsResponseDataStatisticsByTypeSubscriptions } from '../models/invoices-api-vult-invoice-statistics-response-data-statistics-by-type-subscriptions';
export interface InvoicesApiVultInvoiceStatisticsResponseDataStatisticsByType {
  orders?: InvoicesApiVultInvoiceStatisticsResponseDataStatisticsByTypeOrders;
  rent?: InvoicesApiVultInvoiceStatisticsResponseDataStatisticsByTypeRent;
  subscriptions?: InvoicesApiVultInvoiceStatisticsResponseDataStatisticsByTypeSubscriptions;
}
