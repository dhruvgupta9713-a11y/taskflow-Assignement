# Engineering Notes — TaskFlow

## Architecture Decisions

### Why Next.js 14 App Router?
- **Server Components**: The App Router leverages React Server Components by default, allowing us to fetch data and render on the server for the public board page (better SEO, faster initial load).
- **File-based routing**: Route groups like `(auth)` and `(dashboard)` let us apply different layouts without affecting URL structure.
- **API Routes**: Built-in API route handlers (`route.ts`) eliminate the need for a separate backend server during development.
- **Middleware**: Native middleware support for auth protection without third-party packages.

### Why Zustand + React Query Together?
These serve complementary roles:
- **React Query** manages **server state** — data that lives on the server and needs fetching, caching, and synchronization (workspaces, boards, tasks, activity).
- **Zustand** manages **client state** — data that originates from the client or needs to persist across sessions (auth session, active workspace, optimistic board state).

This separation avoids the common pitfall of using a single state manager for both concerns, which leads to stale data and complex synchronization logic.

### State Management Approach

| State Type | Manager | Persistence |
|---|---|---|
| Auth (user, token) | Zustand (`authStore`) | localStorage via `persist` middleware |
| Active workspace | Zustand (`workspaceStore`) | localStorage via `persist` middleware |
| Board + columns + tasks | Zustand (`boardStore`) | None — re-fetched on board change |
| Server data (fetch/cache) | React Query | In-memory query cache |
| UI state (modal, drag) | React `useState` | None |

### Data Fetching Strategy

- **React Query `staleTime`**: Set to 30s for boards, 5min for workspaces. Prevents unnecessary refetches while keeping data reasonably fresh.
- **Activity polling**: `refetchInterval: 5000` on the activity query simulates real-time updates.
- **Optimistic updates**: Task drag-and-drop uses optimistic updates via `onMutate` to provide instant visual feedback before the server confirms.
- **Error recovery**: On mutation failure, we `invalidateQueries` to refetch the correct state from the server.

## Component Organization

```
components/
├── auth/         → Login-related components
├── workspace/    → Workspace switcher
├── board/        → Core kanban components (BoardView, Column, TaskCard, TaskModal, AddTaskForm)
├── activity/     → Activity feed sidebar
├── ui/           → shadcn/ui primitive components (Button, Input, Dialog, etc.)
└── providers.tsx → Root providers (QueryClient, Toaster)
```

**Rationale**: Components are grouped by feature domain, not by type (e.g., not `/buttons`, `/modals`). This makes it easy to find all components related to a feature. The `ui/` directory is reserved for low-level, reusable primitives from shadcn/ui.

## Public Pages

### Open Graph Tags
- Generated via Next.js `generateMetadata()` in the server component.
- Dynamic per-board: `og:title` = board name, `og:description` = board description, `og:url` = full public URL.
- Useful for link previews when sharing on Slack, Twitter, etc.

### JSON-LD Structured Data
- `WebPage` schema type injected as a `<script type="application/ld+json">` tag.
- Helps search engines understand the page structure.

### No-Auth Handling
- The `/public/board/[boardId]` route does NOT require authentication.
- The API route `/api/public/board/[id]` has no token validation.
- Middleware only protects `/dashboard/*` routes, leaving `/public/*` accessible.
- Only boards with `isPublic: true` are accessible; private boards return 403.

## Trade-offs

### Mock API vs Real Backend
- **Choice**: Mock API via Next.js API routes with in-memory data store.
- **Pro**: Zero external dependencies, fast iteration, works offline.
- **Con**: Data resets on server restart, no concurrent user support, no real authentication.
- **Migration path**: Replace API route handlers with real database queries (e.g., Prisma + PostgreSQL). The API client and hooks remain unchanged.

### Polling vs WebSockets
- **Choice**: HTTP polling every 5 seconds for activity feed.
- **Pro**: Simple implementation, works with any hosting, no WebSocket infrastructure needed.
- **Con**: 5-second delay, unnecessary network requests when no new data.
- **Migration path**: Replace `refetchInterval` with a WebSocket/SSE connection that pushes updates.

### Client-side Auth (Zustand) + Server-side Auth (Middleware)
- **Choice**: Dual auth check — cookie-based for middleware, token in Zustand for API calls.
- **Pro**: Middleware protects routes at the edge (before page loads), Zustand provides token for client-side API calls.
- **Con**: Slight duplication of auth logic.

## Assumptions

1. Single-user mock environment — no real multi-user support.
2. Mock credentials are hardcoded: `admin@test.com` / `password`.
3. Task order is maintained via a numeric `order` field with fractional values for insertion between existing tasks.
4. All workspace/board data is shared across all users (no per-user filtering).
5. The app runs in dark mode by default (class `dark` on `<html>`).
6. No real file uploads, image attachments, or rich text editing.
7. shadcn/ui components are manually added (not via CLI) for maximum control.
