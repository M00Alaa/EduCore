/* tslint:disable */
/* eslint-disable */
import { PackagesGetSinglePackageResponseDataAcademy } from '../models/packages-get-single-package-response-data-academy';
import { PackagesGetSinglePackageResponseDataPackageType } from '../models/packages-get-single-package-response-data-package-type';
import { PackagesGetSinglePackageResponseDataSport } from '../models/packages-get-single-package-response-data-sport';
import { PackagesGetSinglePackageResponseDataStatus } from '../models/packages-get-single-package-response-data-status';
import { PackagesGetSinglePackageResponseDataTaxIncluded } from '../models/packages-get-single-package-response-data-tax-included';
export interface PackagesGetSinglePackageResponseData {
  academy?: PackagesGetSinglePackageResponseDataAcademy;
  amount?: number;
  classes?: number;
  created_at?: string;
  custom_duration_days?: number;
  duration_type?: null;
  formatted_amount?: string;
  id?: number;
  localized_name?: string;
  name?: string;
  package_type?: PackagesGetSinglePackageResponseDataPackageType;
  sport?: PackagesGetSinglePackageResponseDataSport;
  status?: PackagesGetSinglePackageResponseDataStatus;
  tax_included?: PackagesGetSinglePackageResponseDataTaxIncluded;
  updated_at?: string;
}
