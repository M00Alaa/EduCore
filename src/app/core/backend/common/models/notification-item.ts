/* tslint:disable */
/* eslint-disable */
export interface NotificationItem {
  id?: number;
  key_id?: number;
  from_id?: number;
  to_id?: number;
  title?: string;
  title_ar?: string;
  title_en?: string;
  message?: string;
  message_ar?: string;
  message_en?: string;
  module?: string;
  module_id?: number;
  route?: string;
  payload?: any;
  seen?: number;
  read?: boolean;
  approval_status?: number;
  created_at?: string;
  updated_at?: string;
}
