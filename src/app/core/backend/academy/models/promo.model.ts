export interface PromoPayload {
    name: string;
    name_en?: string | null;
    discount_type: 'amount' | 'percentage';
    amount?: number;
    percentage?: number;
    allow_stack?: boolean;
    status?: number;
    discount_code?: string | null;
    scope?: 'subscriptions' | 'products' | 'general';
    max_usage?: number;
    expiry_date?: string | null;
    generate_code?: boolean;
}
