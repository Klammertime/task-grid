# Task Grid — React Data Grid with Custom Cell Renderers

This is a modular data grid system built with React and TypeScript. The goal was to create a pluggable architecture capable of handling dynamic columns, custom editors, and rich user interaction — including a multi-user assignment feature with avatars.

---

## Tech Stack

- **React** (Vite) for the frontend
- **TypeScript** for static typing and safety
- **Yarn Workspaces** for monorepo package management
- **Express** (mock API server)
- **CSS Modules** for styling
- **Custom UI components** (Avatar, Select, etc.)

---

## Features

### Grid Core

- Row selection via checkboxes
- Column configuration via `ColumnDef` array
- Dynamic `renderCell` and `renderEditor` logic via a `fieldRegistry`
- Inline editing and update propagation

### User Field Type

- Multi-select user editor with avatars
- Inline rendering of selected users with `UserAvatarGroup`
- Fallback to individual avatars for edge cases
- User data loaded from mock `/api/users`

### Registry + Pluggable Architecture

- `fieldRegistry` maps `fieldType` to render behavior
- Easily extendable to support new field types (date, tags, etc.)
- No hard-coded UI in the grid — everything is injected

---

## Getting Started

### 1. Install Dependencies
yarn install

### 2. Start the Dev Environment

# Terminal 1: Run the backend
yarn workspace server dev

# Terminal 2: Run the frontend
yarn workspace web dev

Then open http://localhost:5173

---

## Monorepo Structure
apps/
  web/             # Frontend app (Vite)
  server/          # Express API for /api/users
packages/
  grid-core/       # Grid types, logic, registry
  ui/              # Shared components (Avatar, Select)


## Key Components
- **Grid.tsx** — dynamic, editable table renderer
- **fieldRegistry.tsx** — maps fieldType to cell + editor renderers
- **UserEditor.tsx** — interactive user select dropdown
- **UserCell.tsx** — compact avatar group display
- **UserAvatar.tsx** — reusable circular avatar
- **UserAvatarGroup.tsx** — maxVisible + overflow badge
- **UserSelect.tsx** — simplified avatar selector (alt)

## Known Gaps & Opportunities
- Visual polish is in-progress (hover states, padding, contrast)
- Grid always shows in "edit mode" — could toggle cell state
- Accessibility (focus, keyboard nav) not fully implemented
- User overflow rendering is functional, but not pixel-perfect

## Design Notes
The project was designed like a component platform, not just a visual clone. Everything is plug-and-play and scalable for future features (filters, sorting, validation, etc.).

My goal was to demonstrate architecture + functional depth under time constraints.