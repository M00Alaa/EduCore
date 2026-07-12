/* tslint:disable */
/* eslint-disable */
import { Promos12ValidatePromoCodeResponseDataPromoScope } from '../models/promos-12-validate-promo-code-response-data-promo-scope';
import { Promos12ValidatePromoCodeResponseDataPromoStatus } from '../models/promos-12-validate-promo-code-response-data-promo-status';
export interface Promos12ValidatePromoCodeResponseDataPromo {
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
  scope?: Promos12ValidatePromoCodeResponseDataPromoScope;
  status?: Promos12ValidatePromoCodeResponseDataPromoStatus;
  updated_at?: string;
  usage_count?: number;
  value?: number;
}
