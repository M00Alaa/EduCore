/* tslint:disable */
/* eslint-disable */
import { AuthManagerLoginResponseDataUserProfileAvailableForBooking } from '../models/auth-manager-login-response-data-user-profile-available-for-booking';
import { AuthManagerLoginResponseDataUserProfileCity } from '../models/auth-manager-login-response-data-user-profile-city';
import { AuthManagerLoginResponseDataUserProfileDistrict } from '../models/auth-manager-login-response-data-user-profile-district';
import { AuthManagerLoginResponseDataUserProfileGender } from '../models/auth-manager-login-response-data-user-profile-gender';
export interface AuthManagerLoginResponseDataUserProfile {
  available_for_booking?: AuthManagerLoginResponseDataUserProfileAvailableForBooking;
  avatar_url?: null;
  city?: AuthManagerLoginResponseDataUserProfileCity;
  days?: Array<undefined>;
  district?: AuthManagerLoginResponseDataUserProfileDistrict;
  firstname?: string;
  gender?: AuthManagerLoginResponseDataUserProfileGender;
  identification_number?: number;
  lastname?: string;
  locale?: string;
  middlename?: null;
  mobile?: string;
  user_id?: number;
}
