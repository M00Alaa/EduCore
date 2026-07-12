export interface OnlineStoreStatusOption {
  id: number;
  key: string;
  name: string;
}

export interface OnlineStoreCategory {
  id: number;
  academy_id: number;
  title: string;
  name: string;
  description: string | null;
  status: OnlineStoreStatusOption;
  products_count: number;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface OnlineStoreSportOption {
  id: number;
  name: string;
  name_ar?: string;
  name_en?: string;
  color?: string | null;
}

export interface OnlineStoreProduct {
  id: number;
  academy_id: number;
  title: string;
  name: string;
  sport_id: number;
  sport_name: string;
  sport?: {
    id: number;
    name: string;
    name_ar?: string;
    name_en?: string;
    color?: string | null;
  };
  category_id: number;
  category_name: string;
  category?: {
    id: number;
    name: string;
  };
  price: number;
  unit_price: number;
  quantity: number;
  quantity_used: number;
  quantity_remaining: number;
  description?: string | null;
  logo_base_url?: string | null;
  logo_path?: string | null;
  image_url?: string | null;
  sizes?: string[];
  colors?: string[];
  variants?: Array<{
    size?: string;
    color?: string;
    quantity: number;
  }>;
  status: OnlineStoreStatusOption;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface OnlineStoreOrderDetail {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;
  sport_name: string;
  price: number;
  quantity: number;
  size?: string | null;
  color?: string | null;
  total: number;
}

export interface OnlineStoreOrder {
  id: number;
  code: string;
  academy_id: number;
  user_id: number;
  client_name: string;
  mobile_number: string;
  items_count: number;
  price: number;
  price_before_discount?: number;
  price_after_discount?: number;
  discount_total?: number;
  additional_discount?: number;
  applied_promos?: OnlineStorePromoOption[];
  tax_value: number;
  total_price: number;
  order_value: number;
  amount_paid: number;
  remaining_amount: number;
  notification_preference: boolean;
  status: string;
  order_status: OnlineStoreStatusOption;
  payment_status: OnlineStoreStatusOption;
  details?: OnlineStoreOrderDetail[];
  created_at?: string | null;
  updated_at?: string | null;
}

export interface OnlineStorePromoOption {
  id: number;
  name: string;
  discount_type: 'amount' | 'percentage' | 'promo' | string;
  amount: number;
  percentage: number;
  allow_stack: boolean;
  discount_code?: string | null;
}

export interface OnlineStoreCustomerOption {
  id: number;
  name: string;
  mobile: string;
  user_type: number;
}

export interface OnlineStoreLookups {
  sports: OnlineStoreSportOption[];
  categories: Array<{
    id: number;
    name: string;
    status: number;
  }>;
  products: Array<{
    id: number;
    name: string;
    sport_id: number;
    category_id: number;
    price: number;
    quantity_remaining: number;
    image_url?: string | null;
    sizes?: string[];
    colors?: string[];
    variants?: Array<{
      size?: string;
      color?: string;
      quantity: number;
    }>;
  }>;
  customers: OnlineStoreCustomerOption[];
  promos: OnlineStorePromoOption[];
  payment_methods: Array<{
    id: number;
    key: string;
    name: string;
  }>;
  order_statuses: Array<{
    id: number;
    name: string;
  }>;
  payment_statuses: Array<{
    id: number;
    name: string;
  }>;
}

export interface OnlineStorePaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface OnlineStorePaginationLinks {
  first?: string | null;
  last?: string | null;
  prev?: string | null;
  next?: string | null;
}

export interface OnlineStorePaginatedResult<T> {
  items: T[];
  meta: OnlineStorePaginationMeta;
  links: OnlineStorePaginationLinks;
}

export interface CreateOnlineStoreCategoryPayload {
  title: string;
  description?: string | null;
  status?: number | string;
}

export interface UpdateOnlineStoreCategoryPayload {
  title?: string;
  description?: string | null;
  status?: number | string;
}

export interface CreateOnlineStoreProductPayload {
  title: string;
  sport_id: number;
  category_id: number;
  quantity: number;
  quantity_used?: number;
  price: number;
  description?: string | null;
  sizes?: string[];
  colors?: string[];
  variants?: Array<{
    size?: string;
    color?: string;
    quantity: number;
  }>;
  status?: number | string;
  logo_base_url?: string | null;
  logo_path?: string | null;
}

export interface UpdateOnlineStoreProductPayload {
  title?: string;
  sport_id?: number;
  category_id?: number;
  quantity?: number;
  quantity_used?: number;
  price?: number;
  description?: string | null;
  sizes?: string[];
  colors?: string[];
  variants?: Array<{
    size?: string;
    color?: string;
    quantity: number;
  }>;
  status?: number | string;
  logo_base_url?: string | null;
  logo_path?: string | null;
}

export interface CreateOnlineStoreOrderPayload {
  user_id?: number | null;
  client_name?: string | null;
  subscription_id?: number | null;
  amount_paid?: number;
  notification_preference?: boolean;
  promo_ids?: number[];
  discount_code?: string | null;
  additional_discount?: number;
  items: Array<{
    product_id: number;
    quantity: number;
    size?: string;
    color?: string;
  }>;
}

export interface RefundOnlineStoreOrderPayload {
  amount: number;
  payment_method: number;
  note?: string | null;
}

export interface AddOrderOption {
  id: number;
  name: string;
}

export interface AddOrderProduct {
  id: number;
  name: string;
  sport_id: number;
  category_id: number;
  price: number;
  quantity_remaining: number;
  image: string;
  sizes: string[];
  availableSizes: string[];
  colors: string[];
  variants?: Array<{
    size: string;
    color: string;
    quantity: number;
  }>;
}

export interface AddOrderCartItem {
  id: number;
  product: AddOrderProduct;
  size: string;
  color: string;
  quantity: number;
}

export interface CategoryItem {
  id: number;
  name: string;
  description: string;
  source: OnlineStoreCategory;
}

export interface ProductItem {
  id: number;
  name: string;
  sport: string;
  category: string;
  unitPrice: number;
  quantity: number;
  size: string;
  color: string;
  sizes: string[];
  colors: string[];
  source: OnlineStoreProduct;
}

export interface ProductVariant {
  id: number;
  size: string;
  color: string;
  quantity: number;
}

export interface AddStockItem {
  product_id: number;
  quantity: number;
  size?: string;
  color?: string;
}

export interface AddStockPayload {
  items: AddStockItem[];
}

export interface StockRow extends ProductItem {
  addQuantity: number;
  rowKey: string;
  hasVariant: boolean;
  variantSize: string | null;
  variantColor: string | null;
}

export interface OrderItem {
  id: number;
  code: string;
  clientName: string;
  total_price: number;
  mobileNumber: string;
  itemsCount: number;
  // price_after_discount: number;
  status?: string;
}
