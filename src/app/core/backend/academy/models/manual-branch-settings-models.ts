/* tslint:disable */
/* eslint-disable */

export interface BranchSettingsItem {
    manual_attendance?: boolean;
    auto_attendance?: boolean;
    additional_sessions_type?: 'limited' | 'unlimited';
    max_additional_sessions?: number | null;
    generate_receipts?: boolean;
    report_phone_number?: string | null;
    seal_image?: string | null;
    signature_image?: string | null;
}

export interface BranchSettingsResponse {
    status?: string;
    message?: string;
    data?: BranchSettingsItem;
}

export interface BranchSettingsUpdateData {
    success?: boolean;
    message?: string;
    settings?: BranchSettingsItem;
}

export interface BranchSettingsUpdateResponse {
    status?: string;
    message?: string;
    data?: BranchSettingsUpdateData;
}
