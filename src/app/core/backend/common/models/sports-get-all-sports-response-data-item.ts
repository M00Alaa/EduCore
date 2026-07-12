/* tslint:disable */
/* eslint-disable */
import { SportsGetAllSportsResponseDataItemSkillsItem } from '../models/sports-get-all-sports-response-data-item-skills-item';
import { SportsGetAllSportsResponseDataSport } from '../models/sports-get-all-sports-response-data-sport';
export interface SportsGetAllSportsResponseDataItem {
  color?: string;
  created_at?: string;
  id?: number;
  skills?: Array<SportsGetAllSportsResponseDataItemSkillsItem>;
  skills_count?: number;
  sport?: SportsGetAllSportsResponseDataSport;
  sport_id?: number;
  updated_at?: string;
}
