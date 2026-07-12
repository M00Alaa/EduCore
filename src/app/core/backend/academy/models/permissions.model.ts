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

export interface PermissionOption {
    key: string;
    name: string;
    name_ar?: string;
    name_en?: string;
}

export interface PermissionNode extends PermissionOption {
    assignment_category: number;
    type: number;
    children?: PermissionNode[];
}

export interface PermissionGroup {
    key: string;
    name: string;
    name_ar: string;
    name_en?: string | null;
    summary?: string | null;
    summary_ar?: string | null;
    summary_en?: string | null;
    academy_id: number;
    is_active: boolean;
    users_count: number;
    direct_permissions_count: number;
    direct_permission_keys: string[];
    effective_permission_keys: string[];
    created_at?: string | null;
    updated_at?: string | null;
}

export interface PermissionGroupLookups {
    categories: PermissionOption[];
    parent_roles: PermissionOption[];
    permissions_tree: PermissionNode[];
}

export interface PermissionUser {
    id: number;
    code: string;
    name: string;
    email: string;
    mobile: string;
    activity: boolean;
    status: {
        id: number;
        key: 'active' | 'inactive' | string;
        name: string;
        name_ar?: string;
        name_en?: string;
    };
    role?: {
        key: string;
        name: string;
        name_ar?: string;
        name_en?: string;
    } | null;
    profile?: {
        first_name?: string | null;
        middle_name?: string | null;
        last_name?: string | null;
        gender?: {
            id: number;
            key: 'male' | 'female' | string;
            name: string;
        } | null;
        address?: string | null;
        city?: {
            id: number;
            name: string;
        } | null;
        district?: {
            id: number;
            city_id: number;
            name: string;
        } | null;
        academy_id?: number;
        latitude?: number | null;
        longitude?: number | null;
    };
    created_at?: string | null;
    updated_at?: string | null;
}

export interface PermissionUserLookups {
    role_options: PermissionOption[];
    city_options: Array<{ id: number; name: string }>;
    district_options: Array<{ id: number; city_id: number; name: string }>;
    gender_options: Array<{ id: number; key: string; name: string }>;
    status_options: Array<{ id: number; key: string; name: string }>;
}

export interface PermissionGroupPayload {
    key?: string;
    name_ar: string;
    name_en?: string | null;
    summary_ar?: string | null;
    summary_en?: string | null;
    is_active?: boolean;
    parent_role_key?: string | null;
    permission_keys?: string[];
}

export interface PermissionUserPayload {
    name: string;
    first_name?: string | null;
    middle_name?: string | null;
    last_name?: string | null;
    email: string;
    mobile: string;
    password?: string;
    role_key: string;
    gender?: 'male' | 'female' | string | null;
    status?: 'active' | 'inactive' | string | number | boolean;
    address?: string | null;
    city_id?: number | null;
    district_id?: number | null;
    latitude?: number | null;
    longitude?: number | null;
    locale?: string | null;
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

export interface PermissionRowView {
    name: string;
    view?: PermissionNode;
    add?: PermissionNode;
    edit?: PermissionNode;
    delete?: PermissionNode;
    others: PermissionNode[];
}

export interface PermissionSectionView {
    key: string;
    name: string;
    rows: PermissionRowView[];
}

export interface PermissionUserView {
    id: number;
    code: string;
    name: string;
    mobile: string;
    email: string;
    role: string;
    roleKey?: string;
    activity: boolean;
    gender?: string;
    address?: string;
    city?: string;
    neighborhood?: string;
    latitude?: number | null;
    longitude?: number | null;
    source: PermissionUser;
}

export interface PermissionGroupView {
    key: string;
    name: string;
    nameAr: string;
    nameEn?: string | null;
    description: string;
    usersCount: number;
    directPermissionKeys: string[];
}

export interface GroupUserView {
    code: string;
    name: string;
    mobile: string;
    email: string;
}

export interface GroupPermissionRow {
    id: number;
    key: string;
    name: string;
    categoryId: string;
    view: boolean;
    add: boolean;
    edit: boolean;
    delete: boolean;
    viewKey?: string;
    addKey?: string;
    editKey?: string;
    deleteKey?: string;
    viewKeys?: string[];
    addKeys?: string[];
    editKeys?: string[];
    deleteKeys?: string[];
}
