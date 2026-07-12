/* tslint:disable */
/* eslint-disable */
import { TeamPositionsGetActivePositionsOnlyDropdownResponseDataSport } from '../models/team-positions-get-active-positions-only-dropdown-response-data-sport';
import { TeamPositionsGetActivePositionsOnlyDropdownResponseDataStatus } from '../models/team-positions-get-active-positions-only-dropdown-response-data-status';
export interface TeamPositionsGetActivePositionsOnlyDropdownResponseDataItem {
  created_at?: string;
  description?: string;
  id?: number;
  is_active?: boolean;
  localized_title?: string;
  sport?: TeamPositionsGetActivePositionsOnlyDropdownResponseDataSport;
  status?: TeamPositionsGetActivePositionsOnlyDropdownResponseDataStatus;
  title?: string;
  title_en?: string;
  updated_at?: string;
}
