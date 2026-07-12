/* tslint:disable */
/* eslint-disable */
import { ChatAvailableUserItem } from './chat-available-user-item';
export interface ChatAvailableUsersResponse {
  success?: boolean;
  data?: {
    users?: Array<ChatAvailableUserItem>;
    is_master?: boolean;
  };
}
