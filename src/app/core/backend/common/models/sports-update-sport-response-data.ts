/* tslint:disable */
/* eslint-disable */
import { SportsUpdateSportResponseDataSport } from '../models/sports-update-sport-response-data-sport';
export interface SportsUpdateSportResponseData {
  color?: string;
  created_at?: string;
  id?: number;
  skills?: Array<{
'id'?: number;
'academy_sport_id'?: number;
'sport_skill_id'?: number;
'title'?: string;
'localized_title'?: string;
'category_id'?: null;
'created_at'?: string;
'updated_at'?: string;
}>;
  skills_count?: number;
  sport?: SportsUpdateSportResponseDataSport;
  sport_id?: number;
  updated_at?: string;
}
