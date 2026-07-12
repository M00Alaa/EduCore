# Course Management Dashboard

A clean and modern Angular application for managing courses in an educational platform, built with NG-ZORRO and following the Vult Frontend project structure.

## Project Description

This application allows users to:

- View courses in a table layout
- Search courses by course name
- Filter courses by status (Active, Draft, Archived)
- Add a new course with validation
- Edit an existing course
- Delete a course with confirmation
- View course details

## Technologies Used

- **Angular 19** - Latest stable Angular version
- **NG-ZORRO** (Ant Design for Angular) v19 - UI component library
- **Bootstrap 5** - Styling with custom utilities
- **Boxicons** - Icons
- **TypeScript** - Type-safe JavaScript
- **RxJS** - Reactive programming
- **JSON Server** - Mock API for development

## Features Implemented

### Core Features

- [x] Courses List Page with NG-ZORRO table
- [x] Search by course name
- [x] Filter by status
- [x] Add Course with Reactive Forms
- [x] Edit Course with Reactive Forms
- [x] Delete Course with confirmation modal
- [x] Course Details Page
- [x] Loading, empty, and error states
- [x] Responsive design for mobile and desktop
- [x] Pagination support

### Bonus Features

- [x] Confirmation modal for delete operations
- [x] Toast notifications (NzMessageService)
- [x] Clean and scalable folder structure
- [x] Reusable error template component

## Project Structure

```
src/
├── app/
│   ├── pages/
│   │   └── courses/
│   │       ├── courses.model.ts           # Course interface and types
│   │       ├── courses.service.ts         # CRUD operations service
│   │       ├── courses.component.ts       # Courses list page
│   │       ├── courses.component.html     # List template
│   │       ├── courses.component.scss     # List styles
│   │       ├── courses.module.ts          # Module with routing
│   │       ├── add-edit-form/             # Add/Edit course page
│   │       │   ├── add-edit-form.component.ts
│   │       │   ├── add-edit-form.component.html
│   │       │   └── add-edit-form.component.scss
│   │       └── course-details/            # Course details page
│   │           ├── course-details.component.ts
│   │           ├── course-details.component.html
│   │           └── course-details.component.scss
│   ├── shared/
│   │   └── modules/
│   │       └── nz-form-full/             # Shared form module
│   ├── core/
│   │   └── guards/
│   │       └── auth.guard.ts              # Auth guard
│   ├── layouts/
│   │   └── vertical/                      # Main layout
│   └── app-routes.ts                      # Application routing
├── db.json                                # Mock API data
└── main.ts
```

## How to Run the Project

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v19)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd EduCore
```

2. Install dependencies:

```bash
npm install
```

3. Start the mock API server:

```bash
npm run mock-api
```

4. In a new terminal, start the Angular application:

```bash
npm start
```

Or run both together:

```bash
npm run serve:all
```

The application will be available at `http://localhost:4200` and the mock API at `http://localhost:3000`.

## Mock API / Local Storage Explanation

This project uses **JSON Server** as a mock API for development. The `db.json` file contains sample course data that simulates a REST API.

### API Endpoints

- `GET /courses` - Get all courses
- `GET /courses/:id` - Get a single course
- `POST /courses` - Create a new course
- `PUT /courses/:id` - Update a course
- `DELETE /courses/:id` - Delete a course

## Validation Rules

The course form includes the following validation rules:

| Field           | Validation                            |
| --------------- | ------------------------------------- |
| Course Name     | Required, Minimum 3 characters        |
| Instructor Name | Required                              |
| Category        | Required                              |
| Duration        | Required, Number, Greater than 0      |
| Price           | Required, Number, Minimum 0           |
| Status          | Required (Active, Draft, or Archived) |
| Description     | Optional, Maximum 500 characters      |

## Assumptions

- The application uses NG-ZORRO for UI components
- The mock API runs on port 3000
- Course IDs are auto-generated using timestamp
- The application is designed to be responsive on both desktop and mobile devices
- Uses the existing project structure and styling system

## Bonus Features

- **Confirmation Modal**: Uses NG-ZORRO Modal for delete confirmation
- **Toast Notifications**: Uses NzMessageService for success/error messages
- **Loading States**: Shows spinner during API operations
- **Error Handling**: Displays error messages with retry option
- **Empty States**: User-friendly messages when no data is available
- **Pagination**: Built-in NG-ZORRO table pagination

## Build

To build the project for production:

```bash
npm run build:prod
```

## Test

To run unit tests:

```bash
npm test
```

## License

This project is created for educational purposes as part of a technical assessment.
