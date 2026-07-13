export interface MenuItem {
    id?: number;
    label?: string;
    icon?: string;
    link?: string;
    subItems?: MenuItem[];
    isTitle?: boolean;
    badge?: any;
    roles?: number[];
    parentId?: number;
    isLayout?: boolean;
    exact?: boolean;
}
