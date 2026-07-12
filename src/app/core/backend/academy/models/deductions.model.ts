export type DeductionType = 'percentage' | 'fixed';
export type DeductionBeneficiaryType = 'existing_coach' | 'external_coach' | 'company' | 'academy' | 'other';

export interface DeductionPackageSport {
  id: number | null;
  name?: string | null;
  name_ar?: string | null;
  name_en?: string | null;
  title?: string | null;
  localized_title?: string | null;
}

export interface DeductionPackageLink {
  id: number;
  deduction_id: number | null;
  package_id: number;
  package: {
    id: number;
    name: string;
    sport_id?: number | null;
    sport?: DeductionPackageSport | null;
  };
  type: DeductionType | null;
  value: number | null;
  is_active: boolean;
}

export interface DeductionRow {
  id: number;
  academy_id: number;
  name: string;
  type: DeductionType;
  beneficiary_type: DeductionBeneficiaryType;
  coach_id: number | null;
  coach_name: string | null;
  external_beneficiary_name: string | null;
  external_beneficiary_phone: string | null;
  external_beneficiary_email: string | null;
  external_beneficiary_notes: string | null;
  description: string | null;
  is_active: boolean;
  totals?: {
    total_amount: number;
    total_paid: number;
    remaining: number;
  };
  packages: DeductionPackageLink[];
  created_at?: string | null;
  updated_at?: string | null;
}

export interface DeductionListResponse {
  data: DeductionRow[];
  current_page?: number;
  per_page?: number;
  total?: number;
  meta?: {
    current_page?: number;
    per_page?: number;
    total?: number;
  };
}

export interface DeductionPayload {
  name: string;
  type: DeductionType;
  beneficiary_type: DeductionBeneficiaryType;
  coach_id?: number | null;
  external_beneficiary_name?: string | null;
  external_beneficiary_phone?: string | null;
  external_beneficiary_email?: string | null;
  external_beneficiary_notes?: string | null;
  description?: string | null;
  is_active?: boolean;
  packages: Array<{
    package_id: number;
    type: DeductionType;
    value: number;
  }>;
}

export interface DeductionPackageOption {
  id: number;
  name: string;
  sport_id?: number | null;
  sport?: {
    id: number;
    title?: string | null;
    title_en?: string | null;
    localized_title?: string | null;
  } | null;
  status?: {
    id: number;
    name: string;
  } | null;
}
