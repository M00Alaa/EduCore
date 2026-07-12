/* tslint:disable */
/* eslint-disable */
import { TeamPositionsBulkCreatePositionsResponseDataSport } from '../models/team-positions-bulk-create-positions-response-data-sport';
import { TeamPositionsBulkCreatePositionsResponseDataStatus } from '../models/team-positions-bulk-create-positions-response-data-status';
export interface TeamPositionsBulkCreatePositionsResponseDataItem {
  created_at?: string;
  description?: string;
  id?: number;
  is_active?: boolean;
  localized_title?: string;
  sport?: TeamPositionsBulkCreatePositionsResponseDataSport;
  status?: TeamPositionsBulkCreatePositionsResponseDataStatus;
  title?: string;
  title_en?: string;
  updated_at?: string;
}
