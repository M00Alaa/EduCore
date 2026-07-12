/* tslint:disable */
/* eslint-disable */
import { SportsUpdateSportResponseDataSportIsTeam } from '../models/sports-update-sport-response-data-sport-is-team';
import { SportsUpdateSportResponseDataSportStatus } from '../models/sports-update-sport-response-data-sport-status';
export interface SportsUpdateSportResponseDataSport {
  color?: string;
  icon_base_url?: string;
  icon_path?: string;
  icon_url?: string;
  id?: number;
  is_team?: SportsUpdateSportResponseDataSportIsTeam;
  localized_title?: string;
  status?: SportsUpdateSportResponseDataSportStatus;
  title?: string;
  title_en?: string;
}
