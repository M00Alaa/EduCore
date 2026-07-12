/* tslint:disable */
/* eslint-disable */
import { BranchManagementPortalUiListBranchesResponseDataItem } from '../models/branch-management-portal-ui-list-branches-response-data-item';
import { BranchManagementPortalUiListBranchesResponseLinks } from '../models/branch-management-portal-ui-list-branches-response-links';
import { BranchManagementPortalUiListBranchesResponseMeta } from '../models/branch-management-portal-ui-list-branches-response-meta';
export interface BranchManagementPortalUiListBranchesResponse {
  data?: Array<BranchManagementPortalUiListBranchesResponseDataItem>;
  links?: BranchManagementPortalUiListBranchesResponseLinks;
  meta?: BranchManagementPortalUiListBranchesResponseMeta;
}
