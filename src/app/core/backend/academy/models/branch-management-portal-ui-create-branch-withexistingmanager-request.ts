/* tslint:disable */
/* eslint-disable */
import { BranchManagementPortalUiCreateBranchWithexistingmanagerRequestManager } from '../models/branch-management-portal-ui-create-branch-withexistingmanager-request-manager';
export interface BranchManagementPortalUiCreateBranchWithexistingmanagerRequest {
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
  manager?: BranchManagementPortalUiCreateBranchWithexistingmanagerRequestManager;
}
