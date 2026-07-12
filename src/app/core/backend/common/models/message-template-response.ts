/* tslint:disable */
/* eslint-disable */
import { MessageTemplateItem } from './message-template-item';
export interface MessageTemplateResponse {
  success?: boolean;
  data?: {
    template?: MessageTemplateItem;
    message?: string;
  };
}
