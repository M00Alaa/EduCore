/* tslint:disable */
/* eslint-disable */
import { AuthManagerLoginResponseDataUserApproval } from '../models/auth-manager-login-response-data-user-approval';
import { AuthManagerLoginResponseDataUserProfile } from '../models/auth-manager-login-response-data-user-profile';
import { AuthManagerLoginResponseDataUserStatus } from '../models/auth-manager-login-response-data-user-status';
import { AuthManagerLoginResponseDataUserUserType } from '../models/auth-manager-login-response-data-user-user-type';
export interface AuthManagerLoginResponseDataUser {
  academy?: null;
  academy_id?: null;
  approval?: AuthManagerLoginResponseDataUserApproval;
  email?: string;
  full_name?: string;
  id?: number;
  mobile?: string;
  parent_id?: null;
  profile?: AuthManagerLoginResponseDataUserProfile;
  status?: AuthManagerLoginResponseDataUserStatus;
  user_type?: AuthManagerLoginResponseDataUserUserType;
  username?: string;
}
