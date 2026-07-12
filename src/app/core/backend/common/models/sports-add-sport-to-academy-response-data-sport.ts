/* tslint:disable */
/* eslint-disable */
import { SportsAddSportToAcademyResponseDataSportIsTeam } from '../models/sports-add-sport-to-academy-response-data-sport-is-team';
import { SportsAddSportToAcademyResponseDataSportStatus } from '../models/sports-add-sport-to-academy-response-data-sport-status';
export interface SportsAddSportToAcademyResponseDataSport {
  color?: string;
  icon_base_url?: string;
  icon_path?: string;
  icon_url?: string;
  id?: number;
  is_team?: SportsAddSportToAcademyResponseDataSportIsTeam;
  localized_title?: string;
  status?: SportsAddSportToAcademyResponseDataSportStatus;
  title?: string;
  title_en?: string;
}
