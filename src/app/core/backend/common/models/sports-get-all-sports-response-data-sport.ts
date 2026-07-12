/* tslint:disable */
/* eslint-disable */
import { SportsGetAllSportsResponseDataSportIsTeam } from '../models/sports-get-all-sports-response-data-sport-is-team';
import { SportsGetAllSportsResponseDataSportStatus } from '../models/sports-get-all-sports-response-data-sport-status';
export interface SportsGetAllSportsResponseDataSport {
  color?: string;
  icon_base_url?: string;
  icon_path?: string;
  icon_url?: string;
  id?: number;
  is_team?: SportsGetAllSportsResponseDataSportIsTeam;
  localized_title?: string;
  status?: SportsGetAllSportsResponseDataSportStatus;
  title?: string;
  title_en?: string;
}
