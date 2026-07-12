/* tslint:disable */
/* eslint-disable */
import { Promos07IndexPromosResponseDataAcademy } from '../models/promos-07-index-promos-response-data-academy';
import { Promos07IndexPromosResponseDataScope } from '../models/promos-07-index-promos-response-data-scope';
import { Promos07IndexPromosResponseDataStatus } from '../models/promos-07-index-promos-response-data-status';
export interface Promos07IndexPromosResponseDataItem {
  academy?: Promos07IndexPromosResponseDataAcademy;
  allow_stack?: boolean;
  amount?: number;
  created_at?: string;
  discount_code?: string;
  discount_name?: string;
  discount_type?: string;
  discount_type_label?: string;
  display_name?: string;
  expiry_date?: null;
  id?: number;
  is_expired?: boolean;
  max_usage?: number;
  name?: string;
  name_en?: string;
  percentage?: number;
  promo_name?: string;
  remaining_usage?: number;
  scope?: Promos07IndexPromosResponseDataScope;
  status?: Promos07IndexPromosResponseDataStatus;
  updated_at?: string;
  usage_count?: number;
  value?: number;
}
