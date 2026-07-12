/* tslint:disable */
/* eslint-disable */
import { TeamPositionsTogglePositionStatusResponseDataSport } from '../models/team-positions-toggle-position-status-response-data-sport';
import { TeamPositionsTogglePositionStatusResponseDataStatus } from '../models/team-positions-toggle-position-status-response-data-status';
export interface TeamPositionsTogglePositionStatusResponseData {
  created_at?: string;
  description?: string;
  id?: number;
  is_active?: boolean;
  localized_title?: string;
  sport?: TeamPositionsTogglePositionStatusResponseDataSport;
  status?: TeamPositionsTogglePositionStatusResponseDataStatus;
  title?: string;
  title_en?: string;
  updated_at?: string;
}
