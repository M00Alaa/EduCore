export interface ApiPaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface ApiPaginationLinks {
    first?: string | null;
    last?: string | null;
    prev?: string | null;
    next?: string | null;
}

export interface PaginatedResult<T> {
    items: T[];
    meta: ApiPaginationMeta;
    links: ApiPaginationLinks;
}

export interface AssetOption {
    key: string;
    label: string;
    label_en?: string;
    label_ar?: string;
}

export interface AssetStatusOption {
    id: number;
    key?: string;
    name: string;
    name_en?: string;
    name_ar?: string;
}

export interface AssetSubCategory {
    id: number;
    academy_id: number;
    main_category_id: number;
    main_category_name?: string | null;
    name_ar: string;
    name_en?: string | null;
    display_name: string;
    description?: string | null;
    status?: AssetStatusOption;
    is_active?: boolean;
    assets_count?: number;
}

export interface AssetMainCategory {
    id: number;
    academy_id: number;
    name_ar: string;
    name_en?: string | null;
    display_name: string;
    description?: string | null;
    status?: AssetStatusOption;
    is_active?: boolean;
    sub_categories_count?: number;
    assets_count?: number;
    sub_categories?: AssetSubCategory[];
}

export interface AssetItem {
    id: number;
    academy_id: number;
    identification_number: string;
    name: string;
    main_category_id: number;
    sub_category_id?: number | null;
    sport_id?: number | null;
    main_category?: AssetMainCategory;
    sub_category?: AssetSubCategory;
    sport?: {
        id: number;
        name: string;
        title?: string;
        title_en?: string;
    } | null;
    brand?: string | null;
    purchase_condition: AssetOption;
    purchase_price: number;
    operation_status: AssetOption;
    notes?: string | null;
    quantity: number;
    status: AssetStatusOption;
    created_at?: string | null;
    updated_at?: string | null;
}

export interface AssetLookups {
    main_categories: AssetMainCategory[];
    sub_categories: AssetSubCategory[];
    purchase_conditions: AssetOption[];
    operation_statuses: AssetOption[];
    statuses: AssetStatusOption[];
}

export interface AssetListParams {
    page?: number;
    per_page?: number;
    search?: string;
    main_category_id?: number | null;
    sub_category_id?: number | null;
    sport_id?: number | null;
    purchase_condition?: string | null;
    operation_status?: string | null;
    status?: number | null;
}

export interface MainCategoryListParams {
    page?: number;
    per_page?: number;
    search?: string;
    status?: number | null;
    with_sub_categories?: boolean;
}

export interface SubCategoryListParams {
    main_category_id?: number | null;
    search?: string;
    status?: number | null;
    include_main_category?: boolean;
}

export interface AssetPayload {
    identification_number: string;
    name: string;
    main_category_id: number;
    sub_category_id?: number | null;
    sport_id?: number | null;
    brand?: string | null;
    purchase_condition: string;
    purchase_price?: number | null;
    operation_status: string;
    notes?: string | null;
    quantity?: number;
    status?: number;
}

export interface SubCategoryPayload {
    id?: number;
    name_ar: string;
    name_en?: string | null;
    description?: string | null;
    status?: number;
}

export interface MainCategoryPayload {
    name_ar: string;
    name_en?: string | null;
    description?: string | null;
    status?: number;
    sub_categories?: SubCategoryPayload[];
}

export interface StandaloneSubCategoryPayload {
    main_category_id: number;
    name_ar: string;
    name_en?: string | null;
    description?: string | null;
    status?: number;
}

export interface ApiPaginatedPayload<T> {
    data: T[];
    links?: ApiPaginationLinks;
    meta?: Partial<ApiPaginationMeta>;
}

export interface ApiEnvelope<T> {
    status: string;
    message?: string;
    data: T;
}

export interface SelectOption<T = string | number> {
    label: string;
    value: T;
}
