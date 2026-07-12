/* tslint:disable */
/* eslint-disable */
import { PackagesGetAllPackagesResponseDataItem } from '../models/packages-get-all-packages-response-data-item';
export interface PackagesGetAllPackagesResponse {
  current_page?: number;
  data?: Array<PackagesGetAllPackagesResponseDataItem>;
  from?: number | null;
  last_page?: number;
  meta?: {
    current_page?: number;
    from?: number | null;
    last_page?: number;
    per_page?: number;
    to?: number | null;
    total?: number;
  };
  per_page?: number;
  success?: boolean;
  status?: string;
  to?: number | null;
  total?: number;
}
