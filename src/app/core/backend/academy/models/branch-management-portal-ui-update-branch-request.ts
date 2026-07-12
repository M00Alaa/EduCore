/* tslint:disable */
/* eslint-disable */
export interface BranchManagementPortalUiUpdateBranchRequest {
  address?: string;
  city_id?: number;
  contact_email?: string;
  contact_phone?: string;
  days?: Array<string>;
  description?: string;
  district_id?: number;
  endTime?: string;
  manager_id?: number;
  startTime?: string;
  title?: string;
  logo_base64?: string;
  lat?: string;
  lng?: string;
  extraPhone?: string;
  manager?: {
    name?: string;
    email?: string;
    mobile?: string;
    password?: string;
  };
}
