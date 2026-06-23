# TaskFlow — Multi-Workspace Task Board

A full-stack frontend SaaS application for managing tasks across multiple workspaces with an intuitive Kanban board interface.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14** (App Router) | Framework, routing, API routes |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **shadcn/ui** | UI component library |
| **Zustand** | Client state management |
| **TanStack Query v5** | Server state, caching, polling |
| **@hello-pangea/dnd** | Drag and drop |
| **Sonner** | Toast notifications |
| **Lucide React** | Icons |

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone and navigate to the project
cd osto_project

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Credentials
- **Email**: `admin@test.com`
- **Password**: `password`

## Project Structure

```
src/
├── app/
│   ├── (auth)/login/         # Login page
│   ├── (dashboard)/          # Protected dashboard routes
│   │   ├── dashboard/        # Dashboard overview
│   │   └── dashboard/workspace/[workspaceId]/board/[boardId]/  # Board view
│   ├── public/board/[boardId]/ # Public shareable board (no auth)
│   ├── api/                  # Mock API routes
│   └── layout.tsx            # Root layout
├── components/
│   ├── auth/                 # Login form
│   ├── workspace/            # Workspace switcher
│   ├── board/                # BoardView, Column, TaskCard, TaskModal, AddTaskForm
│   ├── activity/             # Activity feed
│   └── ui/                   # shadcn/ui components
├── hooks/                    # React Query hooks
├── lib/
│   ├── api/                  # API client
│   ├── mock/                 # Mock data
│   └── utils.ts              # Utility functions
├── store/                    # Zustand stores
├── types/                    # TypeScript interfaces
└── middleware.ts             # Auth protection
```

## Features

- **Authentication** — Login/logout with JWT token persistence
- **Multi-workspace** — Switch between workspaces, each with its own boards
- **Kanban Board** — Drag-and-drop tasks between columns and reorder within columns
- **Task CRUD** — Create, edit, delete tasks with modal interface
- **Activity Feed** — Real-time-simulated activity with 5s polling
- **Public Boards** — Shareable read-only board view with OG tags and JSON-LD
- **Responsive Sidebar** — Collapsible navigation with board links
- **Loading States** — Skeleton loaders throughout
- **Error Handling** — Error states with retry buttons
- **Toast Notifications** — Feedback on all task operations

## Testing Public Board URL

Public boards are accessible without authentication:

1. Start the dev server: `npm run dev`
2. Navigate to: [http://localhost:3000/public/board/board-1](http://localhost:3000/public/board/board-1)
3. Available public boards:
   - `board-1` — Sprint 24 — Core Platform
   - `board-3` — Q4 Campaign Launch
   - `board-5` — Design System v3

Private boards (`board-2`, `board-4`, `board-6`) will show a 403 error.

## API Routes

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/login` | No | Login with credentials |
| POST | `/api/logout` | No | Clear auth cookie |
| GET | `/api/workspaces` | Yes | List all workspaces |
| GET | `/api/boards?workspaceId=` | Yes | List boards for workspace |
| GET | `/api/board/:id` | Yes | Get board with columns & tasks |
| POST | `/api/task` | Yes | Create new task |
| PATCH | `/api/task/:id` | Yes | Update task fields |
| DELETE | `/api/task/:id` | Yes | Delete task |
| GET | `/api/activity?boardId=` | Yes | Get recent activity |
| GET | `/api/public/board/:id` | No | Get public board data |

## Seed Data

- **2 Users**: Alex Morgan, Jordan Lee
- **3 Workspaces**: Engineering, Marketing, Design
- **6 Boards**: 2 per workspace
- **24 Columns**: 3-4 per board
- **49 Tasks**: Varied priorities and assignments
- **8 Activity entries**: Pre-seeded recent activity
