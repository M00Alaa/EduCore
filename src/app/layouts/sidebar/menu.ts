import { ROLES } from 'src/app/app-const';
import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  // Dashboard
  {
    id: 1,
    label: 'MENU.DASHBOARD',
    icon: 'isax isax-chart-1',
    link: '/dashboard',
  },

  // Courses
  {
    id: 2,
    label: 'MENU.COURSES',
    icon: 'isax isax-book',
    link: '/courses',
  },

  // Instructors
  {
    id: 3,
    label: 'MENU.INSTRUCTORS',
    icon: 'isax isax-profile-2user',
    link: '/instructors',
  },

  // Students
  {
    id: 4,
    label: 'MENU.STUDENTS',
    icon: 'isax isax-profile-2user',
    link: '/students',
  },

  // Reports
  {
    id: 5,
    label: 'MENU.REPORTS',
    icon: 'isax isax-document-text',
    link: '/reports',
  },

  // Settings
  {
    id: 6,
    label: 'MENU.SETTINGS',
    icon: 'isax isax-setting-2',
    link: '/settings',
  },
]