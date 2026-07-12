/* tslint:disable */
/* eslint-disable */
import { BranchManagementPortalUiGetBranchDetailsResponseDataCity } from '../models/branch-management-portal-ui-get-branch-details-response-data-city';
import { BranchManagementPortalUiGetBranchDetailsResponseDataDistrict } from '../models/branch-management-portal-ui-get-branch-details-response-data-district';
import { BranchManagementPortalUiGetBranchDetailsResponseDataManager } from '../models/branch-management-portal-ui-get-branch-details-response-data-manager';
import { BranchManagementPortalUiGetBranchDetailsResponseDataParent } from '../models/branch-management-portal-ui-get-branch-details-response-data-parent';
import { BranchManagementPortalUiGetBranchDetailsResponseDataStatus } from '../models/branch-management-portal-ui-get-branch-details-response-data-status';
import { BranchManagementPortalUiGetBranchDetailsResponseDataSubscriptionStatus } from '../models/branch-management-portal-ui-get-branch-details-response-data-subscription-status';
export interface BranchManagementPortalUiGetBranchDetailsResponseData {
  address?: string;
  city?: BranchManagementPortalUiGetBranchDetailsResponseDataCity;
  city_id?: number;
  contact_email?: string;
  contact_phone?: string;
  created_at?: string;
  days?: Array<string>;
  description?: string;
  district?: BranchManagementPortalUiGetBranchDetailsResponseDataDistrict;
  district_id?: number;
  end_time?: string;
  extra_phone?: string;
  id?: number;
  lat?: string;
  lng?: string;
  location?: string;
  logo_url?: string;
  manager?: BranchManagementPortalUiGetBranchDetailsResponseDataManager;
  manager_id?: number;
  parent?: BranchManagementPortalUiGetBranchDetailsResponseDataParent;
  parent_id?: number;
  plan_label?: string;
  plan_name?: string | null;
  start_time?: string;
  status?: BranchManagementPortalUiGetBranchDetailsResponseDataStatus;
  status_label?: string;
  subscription_end_date?: string;
  subscription_status?: BranchManagementPortalUiGetBranchDetailsResponseDataSubscriptionStatus;
  subscription_type?: {
    id?: number | string;
    name?: string;
  };
  title?: string;
  updated_at?: string;
  website?: string;
}
