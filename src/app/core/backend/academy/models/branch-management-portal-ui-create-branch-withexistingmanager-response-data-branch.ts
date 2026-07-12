/* tslint:disable */
/* eslint-disable */
import { BranchManagementPortalUiCreateBranchWithexistingmanagerResponseDataBranchCity } from '../models/branch-management-portal-ui-create-branch-withexistingmanager-response-data-branch-city';
import { BranchManagementPortalUiCreateBranchWithexistingmanagerResponseDataBranchDistrict } from '../models/branch-management-portal-ui-create-branch-withexistingmanager-response-data-branch-district';
import { BranchManagementPortalUiCreateBranchWithexistingmanagerResponseDataBranchManager } from '../models/branch-management-portal-ui-create-branch-withexistingmanager-response-data-branch-manager';
import { BranchManagementPortalUiCreateBranchWithexistingmanagerResponseDataBranchParent } from '../models/branch-management-portal-ui-create-branch-withexistingmanager-response-data-branch-parent';
import { BranchManagementPortalUiCreateBranchWithexistingmanagerResponseDataBranchStatus } from '../models/branch-management-portal-ui-create-branch-withexistingmanager-response-data-branch-status';
import { BranchManagementPortalUiCreateBranchWithexistingmanagerResponseDataBranchSubscriptionStatus } from '../models/branch-management-portal-ui-create-branch-withexistingmanager-response-data-branch-subscription-status';
export interface BranchManagementPortalUiCreateBranchWithexistingmanagerResponseDataBranch {
  address?: string;
  city?: BranchManagementPortalUiCreateBranchWithexistingmanagerResponseDataBranchCity;
  city_id?: number;
  contact_email?: string;
  contact_phone?: string;
  days?: Array<string>;
  description?: string;
  district?: BranchManagementPortalUiCreateBranchWithexistingmanagerResponseDataBranchDistrict;
  district_id?: number;
  end_time?: string;
  extra_phone?: string;
  id?: number;
  lat?: string;
  lng?: string;
  location?: string;
  logo_url?: string;
  manager?: BranchManagementPortalUiCreateBranchWithexistingmanagerResponseDataBranchManager;
  manager_id?: number;
  parent?: BranchManagementPortalUiCreateBranchWithexistingmanagerResponseDataBranchParent;
  parent_id?: number;
  plan_name?: null;
  start_time?: string;
  status?: BranchManagementPortalUiCreateBranchWithexistingmanagerResponseDataBranchStatus;
  status_label?: string;
  subscription_end_date?: string;
  subscription_status?: BranchManagementPortalUiCreateBranchWithexistingmanagerResponseDataBranchSubscriptionStatus;
  title?: string;
  website?: string;
}
