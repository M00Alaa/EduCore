/* tslint:disable */
/* eslint-disable */
import { Promos10InactivePromosResponseDataAcademy } from '../models/promos-10-inactive-promos-response-data-academy';
import { Promos10InactivePromosResponseDataScope } from '../models/promos-10-inactive-promos-response-data-scope';
import { Promos10InactivePromosResponseDataStatus } from '../models/promos-10-inactive-promos-response-data-status';
export interface Promos10InactivePromosResponseDataItem {
  academy?: Promos10InactivePromosResponseDataAcademy;
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
  scope?: Promos10InactivePromosResponseDataScope;
  status?: Promos10InactivePromosResponseDataStatus;
  updated_at?: string;
  usage_count?: number;
  value?: number;
}
