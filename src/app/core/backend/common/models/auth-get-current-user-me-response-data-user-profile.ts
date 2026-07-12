/* tslint:disable */
/* eslint-disable */
import { AuthGetCurrentUserMeResponseDataUserProfileAvailableForBooking } from '../models/auth-get-current-user-me-response-data-user-profile-available-for-booking';
import { AuthGetCurrentUserMeResponseDataUserProfileCity } from '../models/auth-get-current-user-me-response-data-user-profile-city';
import { AuthGetCurrentUserMeResponseDataUserProfileDistrict } from '../models/auth-get-current-user-me-response-data-user-profile-district';
import { AuthGetCurrentUserMeResponseDataUserProfileGender } from '../models/auth-get-current-user-me-response-data-user-profile-gender';
export interface AuthGetCurrentUserMeResponseDataUserProfile {
  available_for_booking?: AuthGetCurrentUserMeResponseDataUserProfileAvailableForBooking;
  avatar_url?: null;
  city?: AuthGetCurrentUserMeResponseDataUserProfileCity;
  days?: Array<undefined>;
  district?: AuthGetCurrentUserMeResponseDataUserProfileDistrict;
  firstname?: string;
  gender?: AuthGetCurrentUserMeResponseDataUserProfileGender;
  identification_number?: number;
  lastname?: string;
  locale?: string;
  middlename?: null;
  mobile?: string;
  user_id?: number;
}
