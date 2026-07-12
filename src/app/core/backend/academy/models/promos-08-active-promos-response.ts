/* tslint:disable */
/* eslint-disable */
import { Promos08ActivePromosResponseDataItem } from '../models/promos-08-active-promos-response-data-item';
import { Promos08ActivePromosResponseMeta } from '../models/promos-08-active-promos-response-meta';
export interface Promos08ActivePromosResponse {
  current_page?: number;
  data?: Array<Promos08ActivePromosResponseDataItem>;
  from?: number;
  last_page?: number;
  meta?: Promos08ActivePromosResponseMeta;
  per_page?: number;
  success?: boolean;
  to?: number;
  total?: number;
}
