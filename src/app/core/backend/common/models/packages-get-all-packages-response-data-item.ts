/* tslint:disable */
/* eslint-disable */
import { PackagesGetAllPackagesResponseDataAcademy } from '../models/packages-get-all-packages-response-data-academy';
import { PackagesGetAllPackagesResponseDataDurationType } from '../models/packages-get-all-packages-response-data-duration-type';
import { PackagesGetAllPackagesResponseDataPackageType } from '../models/packages-get-all-packages-response-data-package-type';
import { PackagesGetAllPackagesResponseDataSport } from '../models/packages-get-all-packages-response-data-sport';
import { PackagesGetAllPackagesResponseDataStatus } from '../models/packages-get-all-packages-response-data-status';
import { PackagesGetAllPackagesResponseDataTaxIncluded } from '../models/packages-get-all-packages-response-data-tax-included';
export interface PackagesGetAllPackagesResponseDataItem {
  academy?: PackagesGetAllPackagesResponseDataAcademy;
  amount?: number;
  classes?: null;
  created_at?: string;
  custom_duration_days?: null;
  duration_type?: PackagesGetAllPackagesResponseDataDurationType;
  formatted_amount?: string;
  id?: number;
  localized_name?: string;
  name?: string;
  package_type?: PackagesGetAllPackagesResponseDataPackageType;
  serial_number?: number;
  sport?: PackagesGetAllPackagesResponseDataSport;
  status?: PackagesGetAllPackagesResponseDataStatus;
  tax_included?: PackagesGetAllPackagesResponseDataTaxIncluded;
  updated_at?: string;
}
