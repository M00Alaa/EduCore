/* tslint:disable */
/* eslint-disable */
import { Promos11ToggleStatusBackToActiveResponseDataAcademy } from '../models/promos-11-toggle-status-back-to-active-response-data-academy';
import { Promos11ToggleStatusBackToActiveResponseDataScope } from '../models/promos-11-toggle-status-back-to-active-response-data-scope';
import { Promos11ToggleStatusBackToActiveResponseDataStatus } from '../models/promos-11-toggle-status-back-to-active-response-data-status';
export interface Promos11ToggleStatusBackToActiveResponseData {
  academy?: Promos11ToggleStatusBackToActiveResponseDataAcademy;
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
  scope?: Promos11ToggleStatusBackToActiveResponseDataScope;
  status?: Promos11ToggleStatusBackToActiveResponseDataStatus;
  updated_at?: string;
  usage_count?: number;
  value?: number;
}
