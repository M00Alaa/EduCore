export interface MersalApiEnvelope<T> {
  status: string;
  message?: string;
  data: T;
}

export interface MersalProductsListResponse {
  items?: MersalProduct[];
  total?: number;
  limit?: number;
  page?: number;
  total_pages?: number;
  offset?: number;
  [key: string]: unknown;
}

export interface MersalProduct {
  id?: string;
  name?: string;
  description?: string | null;
  sale_price?: number;
  regular_price?: number;
  currency?: string;
  status?: string;
  url?: string;
  sku?: string;
  quantity?: number;
  weight?: number;
  image_url?: string;
  images?: unknown[];
  categories?: unknown[];
  tags?: unknown[];
  attributes?: Record<string, unknown>;
  is_available?: boolean;
  is_active?: boolean;
  whatsapp_visible?: boolean;
  [key: string]: unknown;
}

export interface MersalProductPayload {
  name?: string;
  description?: string | null;
  sale_price?: number;
  regular_price?: number;
  currency?: string;
  status?: string;
  url?: string;
  sku?: string;
  quantity?: number;
  weight?: number;
  image_url?: string;
  images?: unknown[];
  categories?: unknown[];
  tags?: unknown[];
  attributes?: Record<string, unknown>;
  is_available?: boolean;
  is_active?: boolean;
  whatsapp_visible?: boolean;
}

export interface MersalFaq {
  id?: string;
  name?: string;
  description?: string | null;
  source_config?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface MersalFaqPayload {
  name?: string;
  description?: string | null;
  source_config?: Record<string, unknown>;
}

export interface MersalFaqQuestion {
  id?: string;
  question?: string;
  answer?: string;
  category?: string;
  metadata?: Record<string, unknown>;
  is_draft?: boolean;
  [key: string]: unknown;
}

export interface MersalFaqQuestionPayload {
  question?: string;
  answer?: string;
  category?: string;
  metadata?: Record<string, unknown>;
  is_draft?: boolean;
}

export interface MersalAccountProfile {
  id?: string;
  name?: string;
  email?: string;
  status?: string;
  active?: boolean;
  total_contacts?: number;
  [key: string]: unknown;
}

export interface MersalContact {
  id?: string;
  phone?: string;
  name?: string;
  email?: string;
  channel_type?: string;
  custom_fields?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface MersalContactPayload {
  phone: string;
  name?: string;
  email?: string;
  channel_type?: 'whatsapp' | 'webchat' | 'instagram' | 'messenger';
  custom_fields?: Record<string, unknown>;
}

export interface MersalSendTextPayload {
  text: string;
  channel?: 'whatsapp' | 'webchat' | 'omnichannel';
}
