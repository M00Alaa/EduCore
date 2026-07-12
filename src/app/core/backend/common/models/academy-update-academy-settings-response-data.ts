/* tslint:disable */
/* eslint-disable */
import { AcademyUpdateAcademySettingsResponseDataWorkingDays } from '../models/academy-update-academy-settings-response-data-working-days';
export interface AcademyUpdateAcademySettingsResponseData {
  address?: string;
  city_id?: number;
  days?: Array<string>;
  district_id?: number;
  email?: string;
  id?: number;
  latitude?: string;
  longitude?: string;
  mobile?: string;
  name?: string;
  working_days?: AcademyUpdateAcademySettingsResponseDataWorkingDays;
}
