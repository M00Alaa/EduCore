/* tslint:disable */
/* eslint-disable */
import { Promos06UpdatePromoResponseDataAcademy } from '../models/promos-06-update-promo-response-data-academy';
import { Promos06UpdatePromoResponseDataScope } from '../models/promos-06-update-promo-response-data-scope';
import { Promos06UpdatePromoResponseDataStatus } from '../models/promos-06-update-promo-response-data-status';
export interface Promos06UpdatePromoResponseData {
  academy?: Promos06UpdatePromoResponseDataAcademy;
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
  scope?: Promos06UpdatePromoResponseDataScope;
  status?: Promos06UpdatePromoResponseDataStatus;
  updated_at?: string;
  usage_count?: number;
  value?: number;
}
