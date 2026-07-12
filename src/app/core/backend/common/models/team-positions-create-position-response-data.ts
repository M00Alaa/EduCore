/* tslint:disable */
/* eslint-disable */
import { TeamPositionsCreatePositionResponseDataSport } from '../models/team-positions-create-position-response-data-sport';
import { TeamPositionsCreatePositionResponseDataStatus } from '../models/team-positions-create-position-response-data-status';
export interface TeamPositionsCreatePositionResponseData {
  created_at?: string;
  description?: string;
  id?: number;
  is_active?: boolean;
  localized_title?: string;
  sport?: TeamPositionsCreatePositionResponseDataSport;
  status?: TeamPositionsCreatePositionResponseDataStatus;
  title?: string;
  title_en?: string;
  updated_at?: string;
}
