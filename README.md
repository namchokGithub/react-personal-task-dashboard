# Personal Task Dashboard

A beginner-friendly base project for a personal task management dashboard built with Vite, React, TypeScript, Tailwind CSS, React Router, and localStorage.

This project is intentionally a foundation, not a fully completed task app yet. It focuses on clean structure, reusable components, typed task data, basic routing, mock data, and localStorage persistence so future features can be added safely.

## Features

- Dashboard summary cards
- Kanban-ready task board
- Tasks grouped by status
- Mock task data
- localStorage task persistence
- Basic task CRUD
- Change task status
- Search tasks by title
- Filter tasks by status and priority
- Sort tasks by due date
- Basic app routing
- Sidebar navigation with active route state
- Settings placeholder page
- Reusable UI components
- Responsive-friendly layout

## Project Status

- Phase 1: Basic React + Tailwind - completed
- Phase 2: State + CRUD - completed
- Phase 3: Stronger TypeScript - completed
- Phase 4: Filter / Search / Sort - completed
- Phase 5 and later - prepared for future improvements

## Current Pages

- `/dashboard` - task summary cards for total, completed, pending, and upcoming due tasks
- `/tasks` - simple Kanban-style board with Todo, In Progress, and Done columns
- `/settings` - placeholder for future app settings
- `/` - redirects to `/dashboard`

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- React Router
- localStorage
- pnpm

## Project Structure

```text
src/
├── components/
│   ├── layout/
│   ├── task/
│   └── ui/
├── data/
├── hooks/
├── pages/
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

## Important Files

- `src/types/task.ts` - task types and future-friendly filter/sort types
- `src/data/mockTasks.ts` - starter mock task data
- `src/hooks/useTasks.ts` - task state and localStorage persistence
- `src/utils/storage.ts` - safe localStorage helpers
- `src/utils/taskUtils.ts` - simple dashboard summary helpers
- `src/components/task/` - Kanban board, columns, and task cards
- `src/components/layout/` - app shell, sidebar, and header
- `src/components/ui/` - reusable base UI components

## Future Features

The structure is prepared for adding:

- Dark mode
- Firebase or mock API integration
- Drag-and-drop Kanban

## Roadmap

### Phase 1: Basic React + Tailwind

Build the UI first without complex logic.

- Main layout
- Sidebar / Navbar
- Task Card
- Dashboard Card
- Render mock data with `.map()`

### Phase 2: State + CRUD

Add task data management.

- Add Task
- Edit Task
- Delete Task
- Change Status
- Use `useState` or `useReducer`

### Phase 3: Stronger TypeScript

Add complete and reusable types.

- Task interface
- Form state type
- Filter type
- Sort type
- Component props type

### Phase 4: Filter / Search / Sort

Practice frontend data logic.

- Search by title
- Filter by status
- Filter by priority
- Sort by due date

### Phase 5: localStorage

Keep task data after refreshing the browser.

- Load initial data from localStorage
- Save tasks whenever data changes

### Phase 6: Routing

Add multiple pages with `react-router-dom`.

- `/dashboard`
- `/tasks`
- `/settings`

### Phase 7: Polish UI

Improve the interface and interaction details with Tailwind CSS.

- Dark mode
- Responsive mobile layout
- Hover / transition states
- Empty state
- Priority-based badge colors
- Light modal animation

## Notes

This base project does not include authentication, backend integration, full CRUD, drag-and-drop, Zustand, Firebase, or complex forms yet.

---

_Namchok Singhachai_
_© 2026 Personal Task Dashboard. Released under the MIT License._
