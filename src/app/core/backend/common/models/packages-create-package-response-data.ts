/* tslint:disable */
/* eslint-disable */
import { PackagesCreatePackageResponseDataDurationType } from '../models/packages-create-package-response-data-duration-type';
import { PackagesCreatePackageResponseDataPackageType } from '../models/packages-create-package-response-data-package-type';
import { PackagesCreatePackageResponseDataSport } from '../models/packages-create-package-response-data-sport';
import { PackagesCreatePackageResponseDataStatus } from '../models/packages-create-package-response-data-status';
import { PackagesCreatePackageResponseDataTaxIncluded } from '../models/packages-create-package-response-data-tax-included';
export interface PackagesCreatePackageResponseData {
  academy_id?: number;
  amount?: number;
  classes?: null;
  created_at?: null;
  custom_duration_days?: null;
  duration_type?: PackagesCreatePackageResponseDataDurationType;
  formatted_amount?: string;
  id?: number;
  localized_name?: string;
  name?: string;
  package_type?: PackagesCreatePackageResponseDataPackageType;
  sport?: PackagesCreatePackageResponseDataSport;
  status?: PackagesCreatePackageResponseDataStatus;
  tax_included?: PackagesCreatePackageResponseDataTaxIncluded;
  updated_at?: null;
}
