/* tslint:disable */
/* eslint-disable */
import { PoliciesGetAllPoliciesResponseDataDefaultFlags } from '../models/policies-get-all-policies-response-data-default-flags';
import { PoliciesGetAllPoliciesResponseDataPolicies } from '../models/policies-get-all-policies-response-data-policies';
import { PoliciesGetAllPoliciesResponseDataPolicyTypes } from '../models/policies-get-all-policies-response-data-policy-types';
import { PoliciesGetAllPoliciesResponseDataPolicyTypesEn } from '../models/policies-get-all-policies-response-data-policy-types-en';
export interface PoliciesGetAllPoliciesResponseData {
  default_flags?: PoliciesGetAllPoliciesResponseDataDefaultFlags;
  policies?: PoliciesGetAllPoliciesResponseDataPolicies;
  policy_types?: PoliciesGetAllPoliciesResponseDataPolicyTypes;
  policy_types_en?: PoliciesGetAllPoliciesResponseDataPolicyTypesEn;
}
