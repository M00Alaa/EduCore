/* tslint:disable */
/* eslint-disable */
import { NotificationItem } from './notification-item';
export interface NotificationsListResponse {
  success?: boolean;
  data?: {
    notifications?: Array<NotificationItem>;
    pagination?: {
      current_page?: number;
      per_page?: number;
      total?: number;
      last_page?: number;
    };
  };
}
