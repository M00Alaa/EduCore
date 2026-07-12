/* tslint:disable */
/* eslint-disable */
import { BranchManagementPortalUiUpdateBranchResponseDataCity } from '../models/branch-management-portal-ui-update-branch-response-data-city';
import { BranchManagementPortalUiUpdateBranchResponseDataDistrict } from '../models/branch-management-portal-ui-update-branch-response-data-district';
import { BranchManagementPortalUiUpdateBranchResponseDataManager } from '../models/branch-management-portal-ui-update-branch-response-data-manager';
import { BranchManagementPortalUiUpdateBranchResponseDataParent } from '../models/branch-management-portal-ui-update-branch-response-data-parent';
import { BranchManagementPortalUiUpdateBranchResponseDataStatus } from '../models/branch-management-portal-ui-update-branch-response-data-status';
import { BranchManagementPortalUiUpdateBranchResponseDataSubscriptionStatus } from '../models/branch-management-portal-ui-update-branch-response-data-subscription-status';
export interface BranchManagementPortalUiUpdateBranchResponseData {
  parent_id?: string;
  title?: string;
  lat?: string;
  lng?: string;
  city_id?: number;
  district_id?: number;
  days?: Array<string>;
  startTime?: string;
  endTime?: string;
  contact_phone?: string;
  extraPhone?: string;
  contact_email?: string;
  description?: string;
  logo_base64?: string;

  manager_id?: number;
  manager?: BranchManagementPortalUiUpdateBranchResponseDataManager;
}
