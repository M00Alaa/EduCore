export interface ExpenseStatusOption {
  id: number;
  key: string;
  name: string;
  name_ar?: string;
  name_en?: string;
}

export interface ExpenseSubCategory {
  id: number;
  academy_id: number;
  main_category_id: number;
  name: string;
  name_ar?: string;
  name_en?: string;
  status: number;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ExpenseMainCategory {
  id: number;
  academy_id: number;
  title: string;
  name: string;
  title_ar?: string;
  title_en?: string;
  sub_categories_count: number;
  sub_categories: ExpenseSubCategory[];
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ExpenseSportOption {
  id: number; // academy_sport_id
  sport_id: number;
  name: string;
  name_ar?: string;
  name_en?: string;
  color?: string | null;
}

export interface ExpenseRecord {
  id: number;
  academy_id: number;
  statement: string;
  title: string;
  description?: string | null;
  amount: number;
  receipt_number?: string | null;
  bill_number?: string | null;
  date_expenses?: string | null;
  date_expenses_iso?: string | null;
  main_category_id?: number | null;
  expenses_category_id?: number | null;
  academy_sport_id?: number | null;
  main_category?: {
    id: number | null;
    name: string | null;
    name_ar?: string | null;
    name_en?: string | null;
  };
  sub_category?: {
    id: number | null;
    name: string | null;
    name_ar?: string | null;
    name_en?: string | null;
  };
  sport?: {
    id: number | null; // academy_sport_id
    sport_id: number | null;
    name: string | null;
    name_ar?: string | null;
    name_en?: string | null;
    color?: string | null;
  };
  treasury?: {
    id: number;
    key: string;
    name: string;
    name_ar?: string;
    name_en?: string;
    safe_type?: number;
  };
  treasury_id?: number;
  attachments?: Array<{
    id: number;
    name?: string | null;
    type?: string | null;
    size?: number | null;
    url?: string | null;
    created_at?: string | null;
  }>;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ExpenseLookups {
  main_categories: Array<{
    id: number;
    name: string;
    name_ar?: string;
    name_en?: string;
    sub_categories: ExpenseSubCategory[];
  }>;
  sub_categories: ExpenseSubCategory[];
  sports: ExpenseSportOption[];
  treasury_types: ExpenseStatusOption[];
  receipt_settings?: {
    auto_generate_receipts?: boolean;
    receipt_sequence_start_expenses?: number;
    next_receipt_number?: string | number | null;
  };
}

export interface ExpensePaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ExpensePaginationLinks {
  first?: string | null;
  last?: string | null;
  prev?: string | null;
  next?: string | null;
}

export interface ExpensePaginatedResult<T> {
  items: T[];
  meta: ExpensePaginationMeta;
  links: ExpensePaginationLinks;
}

export interface CreateExpensePayload {
  title: string;
  description?: string | null;
  amount: number;
  main_category_id: number;
  expenses_category_id: number;
  academy_sport_id?: number | null;
  treasury: number;
  receipt_number?: string | null;
  date_expenses: string;
  attachments?: any[]
}

export interface UpdateExpensePayload {
  title?: string;
  description?: string | null;
  amount?: number;
  main_category_id?: number;
  expenses_category_id?: number;
  academy_sport_id?: number | null;
  treasury?: number;
  receipt_number?: string | null;
  date_expenses?: string;
}

export interface ExpenseCategorySubPayload {
  id?: number | null;
  name: string;
  name_en?: string | null;
  status?: number;
}

export interface CreateExpenseCategoryPayload {
  title: string;
  title_en?: string | null;
  sub_categories: ExpenseCategorySubPayload[];
}

export interface UpdateExpenseCategoryPayload {
  title?: string;
  title_en?: string | null;
  sub_categories?: ExpenseCategorySubPayload[];
}

export interface ExpenseRow {
  id: number;
  billNumber: string;
  statement: string;
  mainCategory: string;
  subCategory: string;
  sport: string;
  treasury: string;
  amount: number;
  date: Date | null;
  source: ExpenseRecord;
}

export interface ExpenseCategoryRow {
  id: number;
  name: string;
  subCategory: string;
  subCategories: ExpenseSubCategory[];
  source: ExpenseMainCategory;
}
