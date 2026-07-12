/* tslint:disable */
/* eslint-disable */
import { CitiesGetAllCitiesPaginatedResponseDataPagination } from '../models/cities-get-all-cities-paginated-response-data-pagination';
export interface CitiesGetAllCitiesPaginatedResponseData {
  cities?: Array<{
'id'?: number;
'title'?: string;
'created_at'?: string;
'created_by'?: null;
'updated_at'?: string;
'updated_by'?: null;
'districts'?: Array<{
'id'?: number;
'city_id'?: number;
'title'?: string;
'created_at'?: string;
'updated_at'?: string;
}>;
}>;
  pagination?: CitiesGetAllCitiesPaginatedResponseDataPagination;
}
