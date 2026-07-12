/* tslint:disable */
/* eslint-disable */
import { BranchManagementPortalUiListBranchesResponseDataCity } from '../models/branch-management-portal-ui-list-branches-response-data-city';
import { BranchManagementPortalUiListBranchesResponseDataDistrict } from '../models/branch-management-portal-ui-list-branches-response-data-district';
import { BranchManagementPortalUiListBranchesResponseDataManager } from '../models/branch-management-portal-ui-list-branches-response-data-manager';
import { BranchManagementPortalUiListBranchesResponseDataParent } from '../models/branch-management-portal-ui-list-branches-response-data-parent';
import { BranchManagementPortalUiListBranchesResponseDataStatus } from '../models/branch-management-portal-ui-list-branches-response-data-status';
import { BranchManagementPortalUiListBranchesResponseDataSubscriptionStatus } from '../models/branch-management-portal-ui-list-branches-response-data-subscription-status';
export interface BranchManagementPortalUiListBranchesResponseDataItem {
  address?: string;
  city?: BranchManagementPortalUiListBranchesResponseDataCity;
  city_id?: number;
  contact_email?: string;
  contact_phone?: string;
  days?: Array<string>;
  description?: string;
  district?: BranchManagementPortalUiListBranchesResponseDataDistrict;
  district_id?: number;
  end_time?: string;
  extra_phone?: string;
  id?: number;
  lat?: string;
  lng?: string;
  location?: string;
  logo_url?: string;
  manager?: BranchManagementPortalUiListBranchesResponseDataManager;
  manager_id?: number;
  parent?: BranchManagementPortalUiListBranchesResponseDataParent;
  parent_id?: number;
  plan_label?: string;
  plan_name?: string | null;
  start_time?: string;
  status?: BranchManagementPortalUiListBranchesResponseDataStatus;
  status_label?: string;
  subscription_end_date?: string;
  subscription_status?: BranchManagementPortalUiListBranchesResponseDataSubscriptionStatus;
  subscription_type?: {
    id?: number | string;
    name?: string;
  };
  title?: string;
  website?: string;
}
