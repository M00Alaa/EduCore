import { ROLES } from 'src/app/app-const';
import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [

  // Master Academy
  {
    id: 8, label: 'MENU.MY_ACADEMIES', icon: 'isax isax-buildings-2', link: '/master-academies',
    roles: [ROLES.MasterAcademy]
  },

  // Academy Admin
  {
    id: 3,
    label: 'MENU.DASHBOARD',
    icon: 'isax isax-chart-1',
    link: '/dashboard',
    roles: [ROLES.AcademyAdmin, ROLES.BranchManager, ROLES.Trainer],
    permission: 'dashboard.view',
  },

  {
    id: 3,
    label: 'MENU.BRANCHES',
    icon: 'isax isax-shop',
    link: '/branches',
    roles: [ROLES.AcademyAdmin],
    permission: 'branches.view',
  },

  {
    id: 3,
    label: 'MENU.INVOICES',
    icon: 'isax isax-receipt',
    link: '/invoices',
    roles: [ROLES.AcademyAdmin],
    permission: 'invoices.view',
  },


  // {
  //   id: 3,
  //   label: 'MENU.QUESTION_BANK',
  //   icon: 'isax isax-message-question',
  //   link: '/question-bank',
  //   roles: [ROLES.AcademyAdmin],
  // },

  // {
  //   id: 3,
  //   label: 'MENU.REPORTS',
  //   icon: 'isax isax-document-text',
  //   link: '/reports',
  //   roles: [ROLES.AcademyAdmin],
  // },




  // Branch Manager

  {
    id: 7,
    label: 'MENU.SUBSCRIPTIONS',
    icon: 'isax isax-card-tick',
    link: '/subscriptions',
    roles: [ROLES.BranchManager],
    permission: ['subscriptions.view', 'subscription-management-parent/view'],
  },
  {
    id: 7,
    label: 'MENU.ACTIVITIES',
    icon: 'isax isax-activity',
    link: '/activities',
    roles: [ROLES.BranchManager],
    permission: [
      'activities.view'
    ],
  },
  {
    id: 7,
    label: 'MENU.PLAYERS_ATTENDANCE',
    icon: 'isax isax-calendar-1',
    link: '/players-attendance',
    roles: [ROLES.BranchManager],
    permission: 'players.attendance.view',
  },
  {
    id: 7,
    label: 'MENU.PLAYERS',
    icon: 'isax isax-profile-2user',
    link: '/players',
    roles: [ROLES.BranchManager],
    permission: [
      'players.view',
      'players.management.view',
      'players.teams.view',
    ],
  },
  {
    id: 7,
    label: 'MENU.TRAINERS',
    icon: 'isax isax-profile-2user',
    link: '/trainers',
    roles: [ROLES.BranchManager],
    permission: 'trainers.view',
  },
  {
    id: 7,
    label: 'MENU.ADMINISTRATORS',
    icon: 'isax isax-profile-2user',
    link: '/administrators',
    roles: [ROLES.BranchManager],
    permission: 'administrators.view',
  },
  {
    id: 7,
    label: 'MENU.SALARIES',
    icon: 'isax isax-money-3',
    link: '/financial/salaries',
    exact: true,
    roles: [ROLES.BranchManager],
    permission: [
      'team_salaries.view',
      'team_salaries.create',
      'team_salaries.update',
      'team_salaries.delete',
    ],
    unlessPermission: 'expenses.view',
  },
  {
    id: 7,
    label: 'MENU.FINANCIAL',
    icon: 'isax isax-shop',
    roles: [ROLES.BranchManager],
    permission: [
      'online-store.view',
      'rentals.view',
      'expenses.view',
      'reports.financial.view',
      'financial.view',
      'reports.revenues.view',
      'reports.expenses.view',
      'reports.balances.view',
    ],
    subItems: [
      {
        id: 7,
        label: 'MENU.ONLINE_STORE',
        exact: true,
        link: '/financial/online-store',
        permission: 'online-store.view',
      },
      {
        id: 7,
        label: 'MENU.RENTALS',
        exact: true,
        link: '/financial/rentals',
        permission: 'rentals.view',
      },
      {
        id: 7,
        label: 'MENU.EXPENSES',
        link: '/financial/expenses',
        permission: 'expenses.view',
      },
      {
        id: 7,
        label: 'MENU.FINANCIAL_REPORTS',
        permission: [
          'reports.financial.view',
          'reports.revenues.view',
          'reports.expenses.view',
          'reports.balances.view',
        ],
        isTitle: true,
      },
      {
        id: 7,
        label: 'MENU.REVENUES',
        link: '/reports/revenues',
        permission: ['reports.financial.view', 'reports.revenues.view'],
      },
      {
        id: 7,
        label: 'MENU.EXPENSES',
        link: '/reports/expenses',
        permission: ['reports.financial.view', 'reports.expenses.view'],
      },
      {
        id: 7,
        label: 'MENU.BALANCES',
        link: '/reports/balances',
        permission: ['reports.financial.view', 'reports.balances.view'],
      },
    ],
  },
  {
    id: 7,
    label: 'MENU.COMMUNICATION',
    icon: 'isax isax-messages-2',
    link: '/communication',
    roles: [ROLES.AcademyAdmin, ROLES.BranchManager],
    permission: 'communication.view',
  },
  {
    id: 7,
    label: 'MENU.EQUIPMENT',
    icon: 'isax isax-home-1',
    link: '/equipment',
    roles: [ROLES.BranchManager],
    permission: 'equipment.view',
  },
  {
    id: 3,
    label: 'MENU.PERMISSIONS_USERS',
    icon: 'isax isax-user',
    link: '/permissions',
    roles: [ROLES.BranchManager],
    permission: 'permissions.view',
  },
  // {
  //   id: 7,
  //   label: 'MENU.REPORTS',
  //   icon: 'isax isax-document-text',
  //   link: '/reports',
  //   roles: [ROLES.AcademyAdmin, ROLES.BranchManager],
  // },
  {
    id: 7,
    label: 'MENU.REPORTS',
    icon: 'isax isax-document-text',
    roles: [ROLES.BranchManager],
    permission: [
      'reports.view',
      'reports.general.view',
      'reports.subscriptions.view',
      'reports.facilities.view',
      'reports.players.view',
      'reports.activities.view',
      'deductions.view',
      'team_salaries.view',
      'reports.attendance.view',
    ],
    subItems: [
      {
        id: 7,
        label: 'MENU.REPORT_GENERAL',
        link: '/reports/general',
        permission: ['reports.view', 'reports.general.view'],
      },
      {
        id: 7,
        label: 'MENU.REPORT_SUBSCRIPTIONS',
        link: '/reports/subscriptions',
        permission: ['reports.view', 'reports.subscriptions.view'],
      },
      {
        id: 7,
        label: 'MENU.REPORT_FACILITIES',
        link: '/reports/facilities',
        permission: ['reports.view', 'reports.facilities.view'],
      },
      {
        id: 7,
        label: 'MENU.REPORT_PLAYERS',
        link: '/reports/players',
        permission: ['reports.view', 'reports.players.view'],
      },
      {
        id: 7,
        label: 'MENU.REPORT_ACTIVITIES',
        link: '/reports/activities',
        permission: ['reports.view', 'reports.activities.view'],
      },
      {
        id: 7,
        label: 'MENU.REPORT_DEDUCTIONS',
        link: '/reports/deductions',
        permission: 'deductions.view',
      },
      {
        id: 7,
        label: 'MENU.REPORT_SALARIES',
        link: '/reports/salaries',
        permission: 'team_salaries.view',
      },
      {
        id: 7,
        label: 'MENU.REPORT_ATTENDANCE',
        link: '/reports/attendance',
        permission: ['reports.view', 'reports.attendance.view'],
      },
      {
        id: 7,
        label: 'MENU.REPORT_INTERESTED_CUSTOMERS',
        link: '/reports/interested-customers',
        permission: 'reports.view',
      },
    ],
  },
  {
    id: 3,
    label: 'MENU.SETTINGS',
    icon: 'isax isax-setting-2',
    link: '/settings',
    roles: [ROLES.AcademyAdmin],
    permission: 'settings.view',
  },
  {
    id: 7,
    label: 'MENU.SETTINGS',
    icon: 'isax isax-setting-2',
    link: '/branch-settings',
    roles: [ROLES.BranchManager],
    permission: 'branch-settings.view',
  },
  // {
  //   id: 7,
  //   label: 'MENU.REPORTS',
  //   icon: 'isax isax-document-text',
  //   link: '/reports',
  //   roles: [ROLES.BranchManager],
  // },
  // {
  //   id: 7,
  //   label: 'MENU.QUESTION_BANK',
  //   icon: 'isax isax-message-question',
  //   link: '/question-bank',
  //   roles: [ROLES.BranchManager],
  // },

  // Trainer
  {
    id: 7,
    label: 'MENU.APPOINTMENTS',
    icon: 'isax isax-calendar-1',
    link: '/trainer/appointments',
    roles: [ROLES.Trainer],
    // permission: 'appointments.view',
  },
  {
    id: 7,
    label: 'اللاعبين',
    icon: 'isax isax-profile-2user',
    roles: [ROLES.Trainer],
    // permission: 'players.view',
    subItems: [
      {
        id: 7,
        label: 'بيانات اللاعبين',
        exact: true,
        link: '/trainer/players',
        // permission: 'players.view',
      },
      {
        id: 7,
        label: 'خطط التدريب',
        exact: true,
        link: '/trainer/training-plans',
        // permission: 'training-plans.view',
      }
    ],
  },
  // {
  //   id: 7,
  //   label: 'التقارير',
  //   icon: 'isax isax-document-text',
  //   link: '/trainer/reports',
  //   roles: [ROLES.Trainer],
  //   // permission: 'reports.view',
  // },
  {
    id: 7,
    label: 'البيانات الشخصية',
    icon: 'isax isax-user',
    link: '/trainer/profile',
    roles: [ROLES.Trainer],
    // permission: 'profile.view',
  }
]
