/* tslint:disable */
/* eslint-disable */
import { AuthGetCurrentUserMeResponseDataUserApproval } from '../models/auth-get-current-user-me-response-data-user-approval';
import { AuthGetCurrentUserMeResponseDataUserProfile } from '../models/auth-get-current-user-me-response-data-user-profile';
import { AuthGetCurrentUserMeResponseDataUserStatus } from '../models/auth-get-current-user-me-response-data-user-status';
import { AuthGetCurrentUserMeResponseDataUserUserType } from '../models/auth-get-current-user-me-response-data-user-user-type';
export interface AuthGetCurrentUserMeResponseDataUser {
  id?: number;
  parent_id?: number;
  username?: string;
  email?: string;
  mobile?: string;
  user_type?: AuthGetCurrentUserMeResponseDataUserUserType;
  permissions?: string[];
  status?: AuthGetCurrentUserMeResponseDataUserStatus;
  approval?: AuthGetCurrentUserMeResponseDataUserApproval;
  academy_id?: string;
  full_name?: string;
  profile?: AuthGetCurrentUserMeResponseDataUserProfile;
  academy?: {
    id?: number;
    parent_id?: number;
    title?: string;
    logo_url?: string;
    plan_name?: string;
    packages_enabled?: boolean;
    subscription_type?: number;
    subscription_status?: number;
    subscription_ends_at?: string;
    trial_days_remaining?: number | null;
    start_time?: string | null;
    end_time?: string | null;
    is_impersonated?: boolean;
    working_days?: string[];
  };
  zatca?: boolean;
  academy_profile_completed?: boolean;
  academy_profile_completion_step?: string;
}
