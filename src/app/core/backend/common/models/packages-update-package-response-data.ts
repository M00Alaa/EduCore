/* tslint:disable */
/* eslint-disable */
import { PackagesUpdatePackageResponseDataDurationType } from '../models/packages-update-package-response-data-duration-type';
import { PackagesUpdatePackageResponseDataPackageType } from '../models/packages-update-package-response-data-package-type';
import { PackagesUpdatePackageResponseDataSport } from '../models/packages-update-package-response-data-sport';
import { PackagesUpdatePackageResponseDataStatus } from '../models/packages-update-package-response-data-status';
import { PackagesUpdatePackageResponseDataTaxIncluded } from '../models/packages-update-package-response-data-tax-included';
export interface PackagesUpdatePackageResponseData {
  amount?: number;
  classes?: null;
  created_at?: string;
  custom_duration_days?: null;
  duration_type?: PackagesUpdatePackageResponseDataDurationType;
  formatted_amount?: string;
  id?: number;
  localized_name?: string;
  name?: string;
  package_type?: PackagesUpdatePackageResponseDataPackageType;
  sport?: PackagesUpdatePackageResponseDataSport;
  status?: PackagesUpdatePackageResponseDataStatus;
  tax_included?: PackagesUpdatePackageResponseDataTaxIncluded;
  updated_at?: string;
}
