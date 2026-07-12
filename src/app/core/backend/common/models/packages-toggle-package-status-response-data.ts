/* tslint:disable */
/* eslint-disable */
import { PackagesTogglePackageStatusResponseDataDurationType } from '../models/packages-toggle-package-status-response-data-duration-type';
import { PackagesTogglePackageStatusResponseDataPackageType } from '../models/packages-toggle-package-status-response-data-package-type';
import { PackagesTogglePackageStatusResponseDataSport } from '../models/packages-toggle-package-status-response-data-sport';
import { PackagesTogglePackageStatusResponseDataStatus } from '../models/packages-toggle-package-status-response-data-status';
import { PackagesTogglePackageStatusResponseDataTaxIncluded } from '../models/packages-toggle-package-status-response-data-tax-included';
export interface PackagesTogglePackageStatusResponseData {
  amount?: number;
  classes?: null;
  created_at?: string;
  custom_duration_days?: null;
  duration_type?: PackagesTogglePackageStatusResponseDataDurationType;
  formatted_amount?: string;
  id?: number;
  localized_name?: string;
  name?: string;
  package_type?: PackagesTogglePackageStatusResponseDataPackageType;
  sport?: PackagesTogglePackageStatusResponseDataSport;
  status?: PackagesTogglePackageStatusResponseDataStatus;
  tax_included?: PackagesTogglePackageStatusResponseDataTaxIncluded;
  updated_at?: string;
}
