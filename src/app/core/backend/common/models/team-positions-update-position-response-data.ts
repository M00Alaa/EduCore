/* tslint:disable */
/* eslint-disable */
import { TeamPositionsUpdatePositionResponseDataSport } from '../models/team-positions-update-position-response-data-sport';
import { TeamPositionsUpdatePositionResponseDataStatus } from '../models/team-positions-update-position-response-data-status';
export interface TeamPositionsUpdatePositionResponseData {
  created_at?: string;
  description?: string;
  id?: number;
  is_active?: boolean;
  localized_title?: string;
  sport?: TeamPositionsUpdatePositionResponseDataSport;
  status?: TeamPositionsUpdatePositionResponseDataStatus;
  title?: string;
  title_en?: string;
  updated_at?: string;
}
