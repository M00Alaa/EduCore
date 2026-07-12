/* tslint:disable */
/* eslint-disable */
import { TeamPositionsGetAllPositionsWithFiltersResponseDataItem } from '../models/team-positions-get-all-positions-with-filters-response-data-item';
export interface TeamPositionsGetAllPositionsWithFiltersResponse {
  current_page?: number;
  data?: Array<TeamPositionsGetAllPositionsWithFiltersResponseDataItem>;
  from?: number;
  last_page?: number;
  per_page?: number;
  success?: boolean;
  to?: number;
  total?: number;
}
