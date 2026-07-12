/* tslint:disable */
/* eslint-disable */
import { TeamPositionsGetPositionsBySportPaginatedResponseDataItem } from '../models/team-positions-get-positions-by-sport-paginated-response-data-item';
export interface TeamPositionsGetPositionsBySportPaginatedResponse {
  current_page?: number;
  data?: Array<TeamPositionsGetPositionsBySportPaginatedResponseDataItem>;
  from?: number;
  last_page?: number;
  per_page?: number;
  success?: boolean;
  to?: number;
  total?: number;
}
