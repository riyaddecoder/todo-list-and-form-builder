# Todo List And Form Builder

A React + TypeScript + Vite application with two main areas:

- `Todo List` for API-backed todo visualization, filtering, and pagination
- `Dynamic Form Builder` for building a form visually and previewing submissions

## Setup

### Requirements

- Node.js 20+ recommended
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The app will be available at the local Vite URL shown in the terminal, usually `http://localhost:5173`.

### Production build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Routes

- `/todos` -> Todo List
- `/form-builder` -> Dynamic Form Builder
- `/form-preview` -> Preview and submit form

## Implementation Approach

### Overall structure

The codebase is organized by feature so each area can grow without turning into large mixed files:

- `src/app` contains routing and the shared dashboard layout
- `src/features/todos` contains todo API logic, store, and UI pieces
- `src/features/forms` contains form-builder state, canvas components, and preview helpers
- `src/pages` contains the route-level page components
- `src/styles` contains the global CSS module

Only CSS Modules are used for styling. Reusable pieces are split into small focused components instead of large page files.

### Todo List

The todo feature uses the JSONPlaceholder APIs:

- `https://jsonplaceholder.typicode.com/todos`
- `https://jsonplaceholder.typicode.com/users`

Implementation details:

- Todos and users are fetched in parallel in `src/features/todos/api/todos.ts`
- User names are mapped from `userId` to build a UI-friendly todo model
- The page supports search by title, filter by user, and filter by completion status
- Pagination is implemented with a fixed page size
- Todo UI state is stored with Zustand and persisted with `zustand/middleware/persist`

Because the filter, search, and current page are persisted, navigating away from `/todos` and coming back keeps the same view state.

### Dynamic Form Builder

The form builder uses a persisted Zustand store in `src/features/forms/store/useFormBuilderStore.ts`.

Implementation details:

- The builder is a three-panel layout:
  - left panel: draggable field palette
  - center panel: form canvas
  - right panel: settings for the selected field
- Users can add fields from the left panel
- Fields can be selected from the canvas to edit:
  - label
  - placeholder
- Form schema is saved in browser storage through Zustand persistence

The builder state includes:

- form fields
- selected field id
- field metadata such as label, placeholder, type, and options

### Form Preview

The preview page reads the saved schema from the builder store and renders a live form.

Implementation details:

- If no fields exist yet, the preview shows an empty-state message
- Generated inputs reflect the field settings saved in the builder
- Submitting the form prints the collected values to the browser console
- Field keys are derived safely from the label with a helper so submission payloads remain stable

## State Management

Zustand is used for local application state because it keeps the feature state simple and easy to split:

- todo filters and pagination state are persisted
- form builder schema and selected field state are persisted

This approach avoids prop drilling and keeps route transitions smooth.

## Notes

- Data persistence currently survives route changes and browser refresh because it uses local storage through Zustand persistence
- The Todo List fetches live data from JSONPlaceholder at runtime
- The form submission is intentionally limited to console output for now, as requested
