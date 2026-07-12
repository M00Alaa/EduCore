/* tslint:disable */
/* eslint-disable */
import { Promos05ShowPromoResponseDataAcademy } from '../models/promos-05-show-promo-response-data-academy';
import { Promos05ShowPromoResponseDataScope } from '../models/promos-05-show-promo-response-data-scope';
import { Promos05ShowPromoResponseDataStatus } from '../models/promos-05-show-promo-response-data-status';
export interface Promos05ShowPromoResponseData {
  academy?: Promos05ShowPromoResponseDataAcademy;
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
  scope?: Promos05ShowPromoResponseDataScope;
  status?: Promos05ShowPromoResponseDataStatus;
  updated_at?: string;
  usage_count?: number;
  value?: number;
}
