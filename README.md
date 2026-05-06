# Personal Task Dashboard

A beginner-friendly base project for a personal task management dashboard built with Vite, React, TypeScript, Tailwind CSS, React Router, and Firebase Firestore.

This project is intentionally a foundation, not a fully completed task app yet. It focuses on clean structure, reusable components, typed task data, basic routing, Firebase Auth, and Firestore persistence so future features can be added safely.

## Features

- Dashboard summary cards
- Kanban-ready task board
- Tasks grouped by status
- Firestore task persistence
- Realtime task loading with Firestore snapshots
- Anonymous Firebase Auth for Firestore rules
- Basic task CRUD
- Task form validation
- Confirm modal before add, edit, and permanent delete
- Change task status
- Move tasks to backlog instead of deleting from the active board
- Permanent delete from the backlog page
- Search tasks by title
- Filter tasks by status and priority
- Sort tasks by due date
- Basic app routing
- Sidebar navigation with active route state
- Dark mode with persisted theme preference
- Empty states for active tasks, filtered results, board columns, and backlog
- Hover and transition states for shared UI controls, cards, and board columns
- Configurable priority labels and badge colors
- Settings page for appearance and priority preferences
- Reusable UI components
- Responsive desktop and mobile layout

## Project Status

- Phase 1: Basic React + Tailwind - completed
- Phase 2: State + CRUD - completed
- Phase 3: Stronger TypeScript - completed
- Phase 4: Filter / Search / Sort - completed
- Phase 5: Firestore persistence - completed
- Phase 6: Routing - completed
- Phase 7: Polish UI - in progress

## Current Pages

- `/dashboard` - task summary cards for total, completed, pending, and upcoming due tasks
- `/tasks` - simple Kanban-style board with Todo, In Progress, and Done columns
- `/backlog` - archived tasks with restore and permanent delete actions
- `/settings` - appearance controls and configurable priority labels with badge colors
- `/` - redirects to `/dashboard`

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- React Router
- Firebase Auth
- Firebase Firestore
- pnpm

## Project Structure

```text
src/
├── components/
│   ├── layout/
│   ├── task/
│   └── ui/
├── hooks/
├── lib/
├── pages/
├── services/
├── types/
├── utils/
├── App.tsx
├── main.tsx
└── index.css
```

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

## Firebase Setup

Create a Firebase project, register a Web app, enable Firestore Database, and enable Anonymous Authentication in the Firebase console.

Firebase Console setup:

- Authentication -> Sign-in method -> Anonymous -> Enable
- Firestore Database -> Rules -> allow authenticated users for the `tasks` collection

Then create a local `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Fill in the Firebase Web app config values:

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

The app uses the `tasks` Firestore collection as the source of truth. Add, edit, status changes, backlog moves, restore actions, and permanent deletes write directly to Firestore.

Recommended development Firestore rules:

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Important Files

- `src/types/task.ts` - task types and future-friendly filter/sort types
- `src/lib/firebase.ts` - Firebase app, Auth, and Firestore initialization
- `src/services/taskService.ts` - Firestore task read/write helpers
- `src/hooks/useTasks.ts` - task state, Firestore subscription, and CRUD actions
- `src/hooks/useTheme.ts` - persisted light/dark theme state
- `src/utils/taskUtils.ts` - simple dashboard summary helpers
- `src/components/task/` - Kanban board, columns, and task cards
- `src/components/layout/` - app shell, sidebar, and header
- `src/components/ui/` - reusable base UI components, including cards, buttons, badges, empty states, and confirm dialogs

## Future Features

The structure is prepared for adding:

- Drag-and-drop Kanban

## Roadmap

### ~~Phase 1: Basic React + Tailwind~~

~~Build the UI first without complex logic.~~

- ~~Main layout~~
- ~~Sidebar / Navbar~~
- ~~Task Card~~
- ~~Dashboard Card~~
- ~~Render task data with `.map()`~~

### ~~Phase 2: State + CRUD~~

~~Add task data management.~~

- ~~Add Task~~
- ~~Edit Task~~
- ~~Delete Task~~
- ~~Change Status~~
- ~~Use `useState` or `useReducer`~~
- ~~Confirm before saving or permanently deleting~~

### ~~Phase 3: Stronger TypeScript~~

~~Add complete and reusable types.~~

- ~~Task interface~~
- ~~Form state type~~
- ~~Filter type~~
- ~~Sort type~~
- ~~Component props type~~

### ~~Phase 4: Filter / Search / Sort~~

~~Practice frontend data logic.~~

- ~~Search by title~~
- ~~Filter by status~~
- ~~Filter by priority~~
- ~~Sort by due date~~

### ~~Phase 5: Firestore~~

~~Keep task data after refreshing the browser by saving it remotely.~~

- ~~Load initial data from Firestore~~
- ~~Save task changes to Firestore~~
- ~~Listen for realtime task updates~~

### ~~Phase 6: Routing~~

~~Add multiple pages with `react-router-dom`.~~

- ~~`/dashboard`~~
- ~~`/tasks`~~
- ~~`/backlog`~~
- ~~`/settings`~~

### Phase 7: Polish UI

Improve the interface and interaction details with Tailwind CSS.

- ~~Dark mode~~
- ~~Responsive mobile and desktop layout~~
- ~~Hover / transition states~~
- ~~Empty state~~
- ~~Priority-based badge colors~~
- Light modal animation
- Better loading and error states

---

_Namchok Singhachai_
_© 2026 Personal Task Dashboard. Released under the MIT License._
