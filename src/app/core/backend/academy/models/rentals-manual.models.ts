export interface RentalOption {
  id: number;
  key?: string | null;
  name: string | null;
  name_ar?: string | null;
  name_en?: string | null;
}

export interface RentalActivityOption {
  id: number;
  name: string;
  name_ar?: string;
  name_en?: string;
  academy_sport_id?: number;
  color?: string | null;
}

export interface RentalFacilityTypeOption {
  id: number;
  name: string | null;
  name_ar?: string | null;
  name_en?: string | null;
  academy_id?: number | null;
}

export interface RentalFacility {
  id: number;
  academy_id: number;
  name: string;
  title: string;
  facility_type_id: number | null;
  type: {
    id: number | null;
    name: string | null;
    name_ar?: string | null;
    name_en?: string | null;
  };
  capacity: number | null;
  notes: string | null;
  activities: RentalActivityOption[];
  activity_ids: number[];
  rents_count: number;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface RentalPayment {
  id: number;
  rent_id: number;
  invoice_id?: number | null;
  amount: number;
  payment_method: RentalOption;
  receipt_number?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface RentalContract {
  id: number;
  academy_id: number;
  facility_id: number;
  facility_name: string;
  owner: string;
  statement: string;
  type: RentalOption;
  booking_type?: string | null;
  period: number;
  start_date: string | null;
  end_date: string | null;
  sub_total: number;
  tax: number;
  total: number;
  amount_paid: number;
  remaining_amount: number;
  payment_status: RentalOption;
  payment_method: RentalOption;
  receipt_number?: string | null;
  note?: string | null;
  payments?: RentalPayment[];
  created_at?: string | null;
  updated_at?: string | null;
}

export interface RentalLookups {
  activities: RentalActivityOption[];
  facility_types: RentalFacilityTypeOption[];
  facilities: Array<{
    id: number;
    name: string;
    facility_type_id?: number | null;
    type_name?: string | null;
    type_name_ar?: string | null;
    type_name_en?: string | null;
  }>;
  rent_types: RentalOption[];
  payment_methods: RentalOption[];
  payment_statuses: RentalOption[];
  receipt_settings?: {
    auto_generate_receipts?: boolean;
    receipt_sequence_start_rent?: number;
    next_receipt_number?: string | number | null;
  };
}

export interface RentalPaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface RentalPaginationLinks {
  first?: string | null;
  last?: string | null;
  prev?: string | null;
  next?: string | null;
}

export interface RentalPaginatedResult<T> {
  items: T[];
  meta: RentalPaginationMeta;
  links: RentalPaginationLinks;
}

export interface CreateRentalFacilityPayload {
  title: string;
  facility_type_id: number;
  activity_ids?: number[];
  capacity?: number | null;
  notes?: string | null;
}

export interface UpdateRentalFacilityPayload {
  title?: string;
  facility_type_id?: number;
  activity_ids?: number[];
  capacity?: number | null;
  notes?: string | null;
}

export interface CreateRentPayload {
  statement: string;
  owner: string;
  facility_id: number;
  type: number;
  booking_type?: string;
  period: number;
  start_date: string;
  sub_total: number;
  tax?: number;
  total?: number;
  note?: string | null;
  payment_status?: number;
  payment_method: number;
  receipt_number: string;
  amount_paid: number;
  selected_day?: string;
  selected_time?: string;
  selected_times?: string[];
  day?: string;
  time?: string;
  times?: string[];
}

export interface RentalAvailableSlot {
  value: string;
  label: string;
}

export interface RentalAvailableSlotsResult {
  facility: {
    id: number;
    name: string;
  };
  date: string;
  day_code: string | null;
  working_window: {
    days: string[];
    start_time: string | null;
    end_time: string | null;
    is_working_day: boolean;
  };
  available_slots: RentalAvailableSlot[];
  counts: {
    total_slots: number;
    booked_slots?: number;
    available_slots: number;
  };
}

export interface CreateRentPaymentPayload {
  amount: number;
  payment_method: number;
  receipt_number?: string | null;
  payment_date?: string | null;
  note?: string | null;
}

export interface RentalRow {
  id: number;
  name: string;
  type: string;
  capacity: string;
  activities: string[];
  notes: string;
  source: RentalFacility;
}
