/* tslint:disable */
/* eslint-disable */
import { TeamPositionsGetSinglePositionResponseDataSport } from '../models/team-positions-get-single-position-response-data-sport';
import { TeamPositionsGetSinglePositionResponseDataStatus } from '../models/team-positions-get-single-position-response-data-status';
export interface TeamPositionsGetSinglePositionResponseData {
  created_at?: string;
  description?: string;
  id?: number;
  is_active?: boolean;
  localized_title?: string;
  sport?: TeamPositionsGetSinglePositionResponseDataSport;
  status?: TeamPositionsGetSinglePositionResponseDataStatus;
  title?: string;
  title_en?: string;
  updated_at?: string;
}
