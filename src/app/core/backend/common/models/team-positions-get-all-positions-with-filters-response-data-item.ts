/* tslint:disable */
/* eslint-disable */
import { TeamPositionsGetAllPositionsWithFiltersResponseDataSport } from '../models/team-positions-get-all-positions-with-filters-response-data-sport';
import { TeamPositionsGetAllPositionsWithFiltersResponseDataStatus } from '../models/team-positions-get-all-positions-with-filters-response-data-status';
export interface TeamPositionsGetAllPositionsWithFiltersResponseDataItem {
  created_at?: string;
  description?: string;
  id?: number;
  is_active?: boolean;
  localized_title?: string;
  sport?: TeamPositionsGetAllPositionsWithFiltersResponseDataSport;
  status?: TeamPositionsGetAllPositionsWithFiltersResponseDataStatus;
  title?: string;
  title_en?: string;
  updated_at?: string;
}
