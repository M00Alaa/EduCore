# EduCore — Course Management Dashboard

A clean and modern Angular 19 application for managing courses in an educational platform, built with NG-ZORRO and Bootstrap 5.

## Project Description

This application allows users to:

- View courses in a table layout with pagination
- Search courses by name
- Filter courses by status (Active, Draft, Archived)
- Add, edit, and delete courses with full validation
- View course details with premium two-column layout
- Authenticate via mock login
- Explore the platform roadmap via hidden easter egg pages

## Technologies Used

- **Angular 19** — Standalone + module hybrid
- **NG-ZORRO** (Ant Design for Angular) v19
- **Bootstrap 5** — Styling with custom utilities
- **Boxicons** + **ISAX Icons** — Icon sets
- **@ngx-translate/core** — i18n (English / Arabic)
- **SweetAlert2** — Confirmation dialogs
- **localStorage** — Data persistence (no backend required)

## Features Implemented

### Core Features

- [x] Login page with mock authentication
- [x] Courses list with NG-ZORRO table, search, filter, pagination
- [x] Add / Edit course with Reactive Forms and validation
- [x] Delete course with SweetAlert2 confirmation
- [x] Course details page with premium SaaS layout
- [x] Loading, empty, and error states throughout
- [x] Auth guard protecting all pages except login
- [x] Arabic and English translations
- [x] Responsive design for mobile and desktop

### Bonus Features

- [x] localStorage backend (zero external dependencies)
- [x] Confirmation dialogs with SweetAlert2
- [x] Toast notifications for CRUD operations
- [x] Reusable error template component
- [x] Custom title strategy for dynamic page titles
- [x] Easter egg pages with developer humor

## Quick Start

### Prerequisites

- Node.js v18+
- npm v9+
- Angular CLI v19 (`npm install -g @angular/cli`)

### Setup

```bash
# 1. Clone the repository
git clone <repository-url>
cd EduCore

# 2. Install dependencies
npm install --f

# 3. Start the development server
npm start
```

The application will be available at `http://localhost:4200`.

### Login

Use any of these credentials:

| Username             | Password       |
| -------------------- | -------------- |
| `moalaa@educore.com` | `12345678`     |
| (any username)       | (any password) |

> The login accepts any credentials. The username is used as the display name.

## Build for Production

```bash
npm run build
```

The output will be in the `dist/browser/` directory.

## Project Structure

```
src/
├── app/
│   ├── account/
│   │   └── auth/
│   │       ├── login/                    # Login page
│   │       └── auth-wrapper/             # Auth layout wrapper
│   ├── core/
│   │   ├── backend/
│   │   │   └── courses/                  # localStorage CRUD
│   │   │       ├── models/courses.model.ts
│   │   │       └── services/courses.service.ts
│   │   ├── guards/auth.guard.ts          # Route protection
│   │   └── services/
│   │       ├── auth.service.ts           # Mock auth with localStorage
│   │       └── language.service.ts       # i18n switching
│   ├── pages/
│   │   ├── courses/                      # Courses feature module
│   │   │   ├── courses.component.ts      # List page
│   │   │   ├── add-edit-form/            # Add / Edit page
│   │   │   ├── course-details/           # Details page
│   │   │   └── courses.module.ts
│   │   ├── coming-soon/                  # Easter egg pages
│   │   ├── dashboard/                    # Dashboard module
│   │   └── routes.ts                    # Feature routes
│   ├── layouts/vertical/                 # Main app layout
│   └── shared/                           # Shared components / modules
├── assets/
│   ├── i18n/                             # en.json / ar.json
│   ├── images/                           # SVGs, logos
│   └── scss/                             # Bootstrap theme
├── vercel.json                           # Vercel deployment config
└── main.ts
```

## Data Persistence

All course data is stored in **localStorage** under the key `eduCourses`. No database or mock API server is needed. The application seeds 12 sample courses on first load.

## Validation Rules

| Field           | Validation                         |
| --------------- | ---------------------------------- |
| Course Name     | Required, min 3 characters         |
| Instructor Name | Required                           |
| Category        | Required                           |
| Duration        | Required, number, > 0              |
| Price           | Required, number, >= 0             |
| Status          | Required (Active, Draft, Archived) |
| Description     | Optional, max 500 characters       |

## Deployment

The project includes a `vercel.json` for Vercel deployment:

```bash
outputDirectory: dist/browser
rewrites: all routes → index.html (SPA support)
```
