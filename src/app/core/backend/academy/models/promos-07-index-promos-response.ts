/* tslint:disable */
/* eslint-disable */
import { Promos07IndexPromosResponseDataItem } from '../models/promos-07-index-promos-response-data-item';
import { Promos07IndexPromosResponseMeta } from '../models/promos-07-index-promos-response-meta';
export interface Promos07IndexPromosResponse {
  current_page?: number;
  data?: Array<Promos07IndexPromosResponseDataItem>;
  from?: number;
  last_page?: number;
  meta?: Promos07IndexPromosResponseMeta;
  per_page?: number;
  success?: boolean;
  to?: number;
  total?: number;
}
