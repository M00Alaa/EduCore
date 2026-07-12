export interface Subscription {
    id: number;
    subscription_id?: number;
    detail_id?: number | null;
    player_id?: number;
    player_name: string;
    mobile: string;
    parent_name?: string | null;
    parent_mobile?: string | null;
    guardian_name?: string | null;
    guardian_total_paid?: number;
    guardian_total_remaining?: number;
    package_name: string;
    amount_paid: number;
    remaining_amount: number;
    start_date: string;
    end_date: string;
    is_frozen?: boolean;
    freeze_end_date?: string | null;
    freeze_reason?: string | null;
    status: {
        id: number;
        key?: string | null;
        label: string;
        class: string;
        name_ar?: string | null;
        name_en?: string | null;
    };
    coach?: string;
    academy_id?: number;
    receipt_number?: string | null;
    can_set_schedule?: boolean;
    needs_sessions?: boolean;
    renewal_active_warning?: RenewalActiveWarning | null;
    subscription_refundable_amount?: number;
    refund_product_warning?: SubscriptionRefundProductWarning | null;
}

export interface SubscriptionRefundProduct {
    order_id: number;
    product_id?: number | null;
    name: string;
    quantity: number;
    amount: number;
    size?: string | null;
    color?: string | null;
}

export interface SubscriptionRefundProductWarning {
    has_products: boolean;
    message?: string | null;
    subscription_refundable_amount: number;
    products_total: number;
    invoice_total?: number | null;
    products: SubscriptionRefundProduct[];
}

export interface CreateSubscriptionActivityPayload {
    sport_id: number;
    package_id: number;
    start_date: string;
    coach_id?: number | null;
}

export interface CreateSubscriptionPlayerPayload {
    id?: number;
    name: string;
    mobile?: string | null;
    is_guardian_mobile?: boolean;
    birth_date?: string | null;
    gender?: 'male' | 'female' | 1 | 2 | null;
    activities: CreateSubscriptionActivityPayload[];
}

export interface CreateSubscriptionPayload {
    academy_id?: number;
    subscription_type?: 'personal' | 'children';
    guardian: {
        id?: number;
        name: string;
        mobile: string;
    };
    players: CreateSubscriptionPlayerPayload[];
    payment?: {
        method?: 'network' | 'cash' | 'bank_transfer' | 'stc_pay' | 'other';
        pay_type?: 'full' | 'part';
        paid_amount?: number;
        reference_number?: string;
        additional_discount?: number;
        promo_ids?: number[];
    };
    products?: Array<{
        product_id: number;
        quantity: number;
        size?: string | null;
        color?: string | null;
    }>;
}

export interface SubscriptionPricingPreviewPayload {
    academy_id?: number;
    subscription_type?: 'personal' | 'children';
    players?: Array<{
        activities: Array<{
            sport_id?: number;
            package_id?: number;
        }>;
    }>;
    products?: Array<{
        product_id: number;
        quantity: number;
    }>;
    payment?: {
        additional_discount?: number;
        promo_ids?: number[];
    };
}

export interface SubscriptionPricingPreviewDiscountRow {
    id: number;
    label: string;
    value_label: string;
    discount_type: string;
    amount: number;
}

export interface SubscriptionPricingPreview {
    academy_id: number;
    packages_total: number;
    products_total: number;
    sub_total: number;
    subscription_discount: number;
    product_discount: number;
    promo_discount_total: number;
    additional_discount: number;
    total_discount: number;
    net_before_tax: number;
    vat_percent: number;
    vat_amount: number;
    grand_total: number;
    display_grand_total: number;
    discount_rows: SubscriptionPricingPreviewDiscountRow[];
}

export interface GuardianFamilyPlayerSubscription {
    subscription_id: number;
    view_subscription_id?: number;
    subscription_detail_id?: number | null;
    player_id?: number | null;
    player_deleted?: boolean;
    player_name?: string;
    package_name: string;
    subscription_status: string;
    subscription_status_code: number;
    details_target?: {
        type?: 'subscription' | string;
        subscription_id?: number | null;
        subscription_detail_id?: number | null;
        player_id?: number | null;
    } | null;
}

export interface GuardianFamilyLookupPlayer {
    id: number;
    name: string;
    mobile?: string;
    birth_date?: string | null;
    gender?: number | null;
    subscriptions?: GuardianFamilyPlayerSubscription[];
    has_previous_subscription?: boolean;
    has_no_previous_subscription?: boolean;
    is_first_subscription?: boolean;
}

export interface GuardianFamilyLookupResponse {
    status: string;
    data: {
        exists: boolean;
        subscription_type?: 'personal' | 'children' | null;
        guardian: {
            id: number;
            name: string;
            mobile: string;
        } | null;
        players: GuardianFamilyLookupPlayer[];
        guardian_total_remaining?: number;
        pay_first_subscription_id?: number | null;
    };
    message?: string;
}

export interface PlayerMobileCheckResponse {
    status: string;
    data: {
        exists: boolean;
        mobile: string;
        player: {
            id: number;
            name: string;
        } | null;
    };
    message?: string;
}

export interface BadgeMeta {
    id: number;
    label: string;
    class: string;
}

export interface UiPaymentRow {
    id: number;
    subscription_detail_id?: number | null;
    subscription_value: number;
    paid_amount: number;
    remaining_amount: number;
    payment_method: string;
    payment_status: BadgeMeta;
    invoice_number?: string | null;
    receipt_number: string;
    invoice_id: number;
    payment_date: string;
    actor_name?: string;
}

export interface UiSubscriptionCard {
    id: number;
    detail_id: number;
    player_id?: number;
    academy_sport_id?: number;
    raw_end_date?: string | null;
    is_suspended?: boolean;
    is_frozen?: boolean;
    freeze_end_date?: string | null;
    freeze_reason?: string | null;
    from_date?: string | null;
    to_date?: string | null;
    suspend_comment?: string | null;
    trainer_id?: number | null;
    sport_name: string;
    activity_name?: string;
    status: BadgeMeta;
    payment_status: BadgeMeta;
    start_date: string;
    end_date: string;
    trainer_name: string;
    discount_name: string;
    notifications_enabled: boolean;
    package_type: string;
    package_type_id?: number;
    package_duration_days?: number | null;
    total_sessions: number;
    attended_sessions: number;
    remaining_sessions: number;
    promo_name: string;
    amount_before_discount: number;
    amount_before_promo: number;
    discount_value: number;
    nutrition_amount: number;
    total_price: number;
    package_price_incl_tax_without_discount?: number;
    paid_amount: number;
    remaining_amount: number;
    subscription_refundable_amount?: number;
    refund_product_warning?: SubscriptionRefundProductWarning | null;
    can_be_renewed: boolean;
    can_set_schedule?: boolean;
    needs_sessions?: boolean;
    renewal_active_warning?: RenewalActiveWarning | null;
    payments: UiPaymentRow[];
    manual_attendances?: Array<{
        id: number;
        attend_date: string;
        timing: string;
        notes: string;
    }>;
    player_name?: string;
    package_name?: string;
    player_gender_label?: string;
    player_birth_date?: string;
    player_mobile?: string;
    guardian_mobile?: string;
}

export interface RenewalActiveWarningDetail {
    detail_id: number;
    package_name: string;
    remaining_sessions: number | null;
    end_date: string | null;
    remaining_days: number | null;
    has_remaining_sessions: boolean;
    has_valid_duration: boolean;
    is_active: boolean;
}

export interface RenewalActiveWarning {
    required: boolean;
    remaining_sessions: number | null;
    end_date: string | null;
    remaining_days: number | null;
    details: RenewalActiveWarningDetail[];
}

export interface UiSport {
    id: number;
    name: string;
    nameAr: string;
}

export interface UiPackage {
    id: number;
    sportId: number;
    name: string;
    nameAr: string;
    price: number;
    displayPrice: number;
    sessions: number;
    durationLabel: string;
}

export interface UiPromo {
    id: number;
    label: string;
    discountType: 'amount' | 'percentage';
    value: number;
    scope: 'subscriptions' | 'products' | 'general';
}

export interface UiProduct {
    id: number;
    name: string;
    nameAr: string;
    price: number;
    basePrice?: number;
    displayPrice?: number;
    image: string;
    sizes: string[];
    availableSizes: string[];
    colors: string[];
    variants?: Array<{ size: string; color: string; quantity: number }>;
}

export interface ExistingGuardianFamily {
    subscription_type?: 'personal' | 'children' | null;
    guardian: {
        id?: number;
        name: string;
        mobile: string;
    };
    players: GuardianFamilyLookupPlayer[];
    subscriptions?: GuardianFamilyPlayerSubscription[];
    guardian_total_remaining?: number;
}
