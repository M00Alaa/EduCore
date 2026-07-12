export interface MenuItem {
    id?: number;
    label?: string;
    icon?: string;
    link?: string;
    subItems?: MenuItem[];
    isTitle?: boolean;
    badge?: any;
    roles?: number[];
    permission?: string | string[];
    unlessPermission?: string | string[];
    parentId?: number;
    isLayout?: boolean;
    exact?: boolean;
}
