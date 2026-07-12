/* tslint:disable */
/* eslint-disable */
export interface TeamPosition {
  id?: number;
  sport?: {
    id?: number;
    title?: string;
    title_en?: string;
    localized_title?: string;
  };
  title?: string;
  title_en?: string;
  localized_title?: string;
  description?: string;
  status?: {
    id?: number;
    name?: string;
    name_ar?: string;
  };
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface TeamPositionListResponse {
  success?: boolean;
  data?: TeamPosition[];
  current_page?: number;
  last_page?: number;
  per_page?: number;
  total?: number;
  from?: number;
  to?: number;
}

export interface TeamPositionSingleResponse {
  status?: string;
  data?: TeamPosition;
  message?: string;
}

export interface TeamPositionCreateRequest {
  sport_id: number;
  title: string;
  title_en?: string;
  description?: string;
}

export interface TeamPositionUpdateRequest {
  title?: string;
  title_en?: string;
  description?: string;
  status?: number;
}
