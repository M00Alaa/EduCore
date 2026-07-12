/* tslint:disable */
/* eslint-disable */
import { TeamPositionsGetPositionsBySportPaginatedResponseDataSport } from '../models/team-positions-get-positions-by-sport-paginated-response-data-sport';
import { TeamPositionsGetPositionsBySportPaginatedResponseDataStatus } from '../models/team-positions-get-positions-by-sport-paginated-response-data-status';
export interface TeamPositionsGetPositionsBySportPaginatedResponseDataItem {
  created_at?: string;
  description?: string;
  id?: number;
  is_active?: boolean;
  localized_title?: string;
  sport?: TeamPositionsGetPositionsBySportPaginatedResponseDataSport;
  status?: TeamPositionsGetPositionsBySportPaginatedResponseDataStatus;
  title?: string;
  title_en?: string;
  updated_at?: string;
}
