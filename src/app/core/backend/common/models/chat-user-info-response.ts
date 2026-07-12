/* tslint:disable */
/* eslint-disable */
export interface ChatUserInfoResponse {
  status?: string;
  data?: {
    user?: {
      id?: number;
      name?: string;
      username?: string;
      email?: string;
      mobile?: string;
      avatar?: string;
      user_type?: number;
      user_type_label?: string;
      has_firebase?: boolean;
      chat_id?: string;
      academy_id?: number;
    };
  };
}
