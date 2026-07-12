/* tslint:disable */
/* eslint-disable */
import { Promos10InactivePromosResponseDataItem } from '../models/promos-10-inactive-promos-response-data-item';
import { Promos10InactivePromosResponseMeta } from '../models/promos-10-inactive-promos-response-meta';
export interface Promos10InactivePromosResponse {
  current_page?: number;
  data?: Array<Promos10InactivePromosResponseDataItem>;
  from?: number;
  last_page?: number;
  meta?: Promos10InactivePromosResponseMeta;
  per_page?: number;
  success?: boolean;
  to?: number;
  total?: number;
}
