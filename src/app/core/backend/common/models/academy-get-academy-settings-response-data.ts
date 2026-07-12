/* tslint:disable */
/* eslint-disable */
import { AcademyGetAcademySettingsResponseDataCity } from '../models/academy-get-academy-settings-response-data-city';
export interface AcademyGetAcademySettingsResponseData {
  address?: string;
  city?: AcademyGetAcademySettingsResponseDataCity;
  city_id?: number;
  district?: null;
  district_id?: number;
  email?: string;
  id?: number;
  latitude?: string;
  longitude?: string;
  mobile?: string;
  name?: string;
  name_en?: string;
  start_time?: string;
  end_time?: string;
  startTime?: string;
  endTime?: string;
  working_days?: string[];
}
