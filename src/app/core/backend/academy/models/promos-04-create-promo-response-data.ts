/* tslint:disable */
/* eslint-disable */
import { Promos04CreatePromoResponseDataAcademy } from '../models/promos-04-create-promo-response-data-academy';
import { Promos04CreatePromoResponseDataScope } from '../models/promos-04-create-promo-response-data-scope';
import { Promos04CreatePromoResponseDataStatus } from '../models/promos-04-create-promo-response-data-status';
export interface Promos04CreatePromoResponseData {
  academy?: Promos04CreatePromoResponseDataAcademy;
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
  scope?: Promos04CreatePromoResponseDataScope;
  status?: Promos04CreatePromoResponseDataStatus;
  updated_at?: string;
  usage_count?: number;
  value?: number;
}
