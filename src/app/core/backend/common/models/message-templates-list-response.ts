/* tslint:disable */
/* eslint-disable */
import { MessageTemplateItem } from './message-template-item';
export interface MessageTemplatesListResponse {
  success?: boolean;
  data?: {
    templates?: Array<MessageTemplateItem>;
  };
}
