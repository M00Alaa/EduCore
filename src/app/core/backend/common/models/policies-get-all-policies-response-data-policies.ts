/* tslint:disable */
/* eslint-disable */
import { PoliciesGetAllPoliciesResponseDataPoliciesProduct } from '../models/policies-get-all-policies-response-data-policies-product';
import { PoliciesGetAllPoliciesResponseDataPoliciesRent } from '../models/policies-get-all-policies-response-data-policies-rent';
import { PoliciesGetAllPoliciesResponseDataPoliciesSubscription } from '../models/policies-get-all-policies-response-data-policies-subscription';
export interface PoliciesGetAllPoliciesResponseDataPolicies {
  product?: PoliciesGetAllPoliciesResponseDataPoliciesProduct;
  rent?: PoliciesGetAllPoliciesResponseDataPoliciesRent;
  subscription?: PoliciesGetAllPoliciesResponseDataPoliciesSubscription;
}
