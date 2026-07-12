/* tslint:disable */
/* eslint-disable */
import { Promos08ActivePromosResponseDataAcademy } from '../models/promos-08-active-promos-response-data-academy';
import { Promos08ActivePromosResponseDataScope } from '../models/promos-08-active-promos-response-data-scope';
import { Promos08ActivePromosResponseDataStatus } from '../models/promos-08-active-promos-response-data-status';
export interface Promos08ActivePromosResponseDataItem {
  academy?: Promos08ActivePromosResponseDataAcademy;
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
  scope?: Promos08ActivePromosResponseDataScope;
  status?: Promos08ActivePromosResponseDataStatus;
  updated_at?: string;
  usage_count?: number;
  value?: number;
}
