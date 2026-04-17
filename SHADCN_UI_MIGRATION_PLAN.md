# Actortrackr React -- shadcn/ui Migration & Backend Upgrade Plan

> **Goal**: Migrate the entire frontend to shadcn/ui with a dark/light theme toggle, add search+sort+pagination to all data tables, and extend the Express+SQLite backend with full CRUD and table relationships.

> **Current state**: React 18 + React Router v6 + Tailwind CSS v4 + custom UI primitives (Button, Input, Card, Page). All 25 documented UI/UX bugs are fixed. Server is Express 5 + SQLite with only GET/POST endpoints on 3 tables (actors, reports, ttps) with no relationships.

---

## 1. Design Palette

### 1.1 Color System (CSS Variables)

shadcn/ui uses CSS custom properties for theming. Here is the palette:

```css
/* Light theme (default) */
--background: 0 0% 100%;          /* #ffffff */
--foreground: 240 10% 3.9%;        /* #0f172a */
--card: 0 0% 100%;                 /* #ffffff */
--card-foreground: 240 10% 3.9%;   /* #0f172a */
--popover: 0 0% 100%;              /* #ffffff */
--popover-foreground: 240 10% 3.9%;
--primary: 262 83% 58%;            /* #8b5cf6 (violet-600) */
--primary-foreground: 0 0% 98%;    /* #fafafa */
--secondary: 240 4.8% 95.9%;       /* #f1f5f9 */
--secondary-foreground: 240 5.9% 10%;
--muted: 240 4.8% 95.9%;           /* #f1f5f9 */
--muted-foreground: 240 3.8% 46.1%; /* #64748b */
--accent: 240 4.8% 95.9%;          /* #f1f5f9 */
--accent-foreground: 240 5.9% 10%;
--destructive: 0 84.2% 60.2%;      /* #ef4444 */
--destructive-foreground: 0 0% 98%;
--border: 240 5.9% 90%;            /* #e2e8f0 */
--input: 240 5.9% 90%;             /* #e2e8f0 */
--ring: 262 83% 58%;               /* #8b5cf6 */
--success: 142 76% 36%;            /* #16a34a */
--warning: 38 92% 50%;             /* #f59e0b */

/* Dark theme */
--background: 240 10% 3.9%;        /* #0f172a */
--foreground: 0 0% 98%;            /* #fafafa */
--card: 240 10% 3.9%;              /* #0f172a */
--card-foreground: 0 0% 98%;
--popover: 240 10% 3.9%;
--popover-foreground: 0 0% 98%;
--primary: 262 83% 58%;            /* #8b5cf6 (same across themes) */
--primary-foreground: 0 0% 98%;
--secondary: 240 3.7% 15.9%;       /* #1e293b */
--secondary-foreground: 0 0% 98%;
--muted: 240 3.7% 15.9%;
--muted-foreground: 240 5% 64.9%;  /* #94a3b8 */
--accent: 240 3.7% 15.9%;
--accent-foreground: 0 0% 98%;
--destructive: 0 62.8% 30.6%;      /* #991b1b */
--destructive-foreground: 0 0% 98%;
--border: 240 3.7% 15.9%;          /* #1e293b */
--input: 240 3.7% 15.9%;
--ring: 262 83% 58%;
--success: 142 70% 45%;            /* #22c55e */
--warning: 38 92% 50%;             /* #f59e0b (same across themes) */
```

### 1.2 Typography Scale

```
xs:   0.75rem (12px)  -- muted labels, tags
sm:   0.875rem (14px) -- body text, input text
base: 1rem (16px)     -- body text
lg:   1.125rem (18px) -- subsection headings
xl:   1.25rem (20px)  -- card titles
2xl:  1.5rem (24px)   -- page headings
3xl:  1.875rem (30px) -- hero headings
```

Font family: `Inter, system-ui, -apple-system, sans-serif` (via Google Fonts or local).

### 1.3 Spacing Scale

Use Tailwind's default 4px scale. Key tokens:

```
gap-2 (8px)   -- inline elements, icon buttons
gap-4 (16px)  -- form fields, card content
gap-6 (24px)  -- section spacing
gap-8 (32px)  -- page layout sections
p-4 (16px)    -- card padding
p-6 (24px)    -- modal/dialog padding
p-8 (32px)    -- page container padding
```

### 1.4 Border Radius

```
sm:  0.25rem (4px)   -- tags, badges
md:  0.375rem (6px)  -- inputs, small elements
rounded: 0.5rem (8px) -- buttons, cards
lg:  0.75rem (12px)  -- dialogs, overlays
```

### 1.5 Shadows

```
sm:  0 1px 2px 0 rgb(0 0 0 / 0.05)
md:  0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
lg:  0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
xl:  0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
```

---

## 2. Task List

### Phase 1: Foundation & shadcn/ui Setup ✅ COMPLETE

#### Task 1.1: Install shadcn/ui and configure project ✅ COMPLETE

- Run `npx shadcn@latest init` in the project root
- Choose:
  - Style: "new-york" (the default modern style)
  - Base color: "violet" (matches our `--primary: #8b5cf6`)
  - CSS variables: yes
- Install the following shadcn/ui components:
  - `button` -- replaces `src/components/ui/Button.tsx`
  - `input` -- replaces `src/components/ui/Input.tsx`
  - `card` -- replaces `src/components/ui/Card.tsx`
  - `label` -- for form label associations
  - `dialog` -- for modals (create/edit forms)
  - `table` -- for data tables with consistent styling
  - `dropdown-menu` -- for action menus (edit, delete, view)
  - `select` -- for dropdown selects
  - `textarea` -- for multi-line text inputs
  - `badge` -- for status indicators and tags
  - `separator` -- for visual dividers
  - `avatar` -- for user profile images
  - `sheet` -- for mobile sidebar/drawer navigation
  - `pagination` -- for table pagination controls
  - `search-input` or custom search with `input` + `search` icon
  - `skeleton` -- for loading states
  - `alert` / `alert-dialog` -- for error/success messages
  - `toast` -- for notification toasts
  - `tooltip` -- for icon tooltips
- Update `src/index.css` to include the CSS variable theme definitions for both light and dark modes

#### Task 1.2: Create Theme Provider and dark/light toggle ✅ COMPLETE

- Create `src/context/ThemeContext.tsx`:
  - Uses `useReducer` to track `light | dark` state
  - Persists preference to `localStorage` as `actortrackr-theme`
  - Provides `ThemeProvider` wrapper with `useTheme()` hook
  - Applies `data-theme` attribute on `<html>` element
- Create `src/components/ui/theme-toggle.tsx`:
  - A button with sun/moon icons that toggles the theme
  - Uses `DropdownMenu` or a simple `Button` with icon swap
- Wrap the entire app in `src/main.tsx` with `<ThemeProvider>`
- Update `src/components/Layout/index.tsx` to include the toggle in the top bar

#### Task 1.3: Configure Tailwind CSS v4 with shadcn/ui theme ✅ COMPLETE

- Update `src/index.css` to import Tailwind and define CSS variables:
  ```css
  @import "tailwindcss";

  @custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));

  @theme {
    --color-background: hsl(var(--background));
    --color-foreground: hsl(var(--foreground));
    --color-card: hsl(var(--card));
    --color-card-foreground: hsl(var(--card-foreground));
    --color-popover: hsl(var(--popover));
    --color-popover-foreground: hsl(var(--popover-foreground));
    --color-primary: hsl(var(--primary));
    --color-primary-foreground: hsl(var(--primary-foreground));
    --color-secondary: hsl(var(--secondary));
    --color-secondary-foreground: hsl(var(--secondary-foreground));
    --color-muted: hsl(var(--muted));
    --color-muted-foreground: hsl(var(--muted-foreground));
    --color-accent: hsl(var(--accent));
    --color-accent-foreground: hsl(var(--accent-foreground));
    --color-destructive: hsl(var(--destructive));
    --color-destructive-foreground: hsl(var(--destructive-foreground));
    --color-border: hsl(var(--border));
    --color-input: hsl(var(--input));
    --color-ring: hsl(var(--ring));
    --color-success: hsl(var(--success));
    --color-warning: hsl(var(--warning));
  }
  ```

---

### Phase 2: Migrate UI Primitives

#### Task 2.1: Replace Button component

- Delete `src/components/ui/Button.tsx`
- shadcn/ui `button` component is auto-installed with variants:
  - `default` (violet background, white text)
  - `destructive` (red background, for delete actions)
  - `outline` (border only, for secondary actions)
  - `secondary` (secondary color background)
  - `ghost` (no background, for icon buttons)
  - `link` (text-only, for links)
  - `size`: `default`, `sm`, `lg`, `icon`
- Update all imports across pages from custom `Button` to `@/components/ui/button`

#### Task 2.2: Replace Input component

- Delete `src/components/ui/Input.tsx`
- shadcn/ui `input` component has consistent styling with focus ring
- shadcn/ui `label` component for proper label associations
- Create a composite `FormField` wrapper component at `src/components/ui/form-field.tsx`:
  - Combines `Label` + `Input`/`Textarea` + error message
  - Accepts `label`, `error`, `id`, `type`, `placeholder`, `...inputProps`
  - Applies `border-destructive` when error is present
  - Shows error text in `text-destructive` below the input

#### Task 2.3: Replace Card component

- Delete `src/components/ui/Card.tsx`
- shadcn/ui `card` component provides: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- Each has consistent padding, spacing, and border styling
- Update all page components to use the new Card structure

#### Task 2.4: Replace Page wrapper

- Delete or repurpose `src/components/ui/Page.tsx`
- Create a consistent `PageContent` component at `src/components/ui/page-content.tsx`:
  - Wraps page content with consistent padding (`p-8`)
  - Accepts a `title` prop and optional `subtitle`
  - Accepts an optional `action` slot (for "Create" buttons in page headers)
  - Uses `flex justify-between items-center` for the header row

---

### Phase 3: Migrate Layout

#### Task 3.1: Redesign Layout with shadcn/ui components

- Replace Headless UI `Disclosure`/`Menu`/`Transition` with shadcn/ui equivalents:
  - `Sheet` for mobile navigation drawer
  - `DropdownMenu` for user menu (profile, settings, sign out)
  - `Button` with `variant="ghost"` for nav items
- Replace hardcoded navigation with dynamic route-based active state
- Keep the current route-based active detection logic (`useLocation` + `startsWith`)
- Add the theme toggle button in the top bar
- Replace the placeholder logo with a text-based logo: "Actortrackr" in `text-primary`
- Replace hardcoded user data with a configurable profile (can stay placeholder for now)
- Use `Separator` for visual dividers in the top bar

#### Task 3.2: Add Sidebar (optional, for future)

- Current Layout uses a top nav bar. Consider a sidebar layout for better scalability:
  - Left sidebar with logo + navigation links
  - Top bar with search + user menu + theme toggle
- This is marked as optional since the current top-nav works fine for 4 items

---

### Phase 4: Migrate Page Components

#### Task 4.1: Homepage

- Replace raw HTML with shadcn/ui `Card` components
- Use `Button` with appropriate variants for CTAs
- Add `Skeleton` loading states if data fetching is added later
- Use consistent `PageContent` wrapper

#### Task 4.2: Actors pages

- **Actors list** (`Actors/index.tsx`, `Actors/list.tsx`):
  - Replace table with shadcn/ui `Table` component
  - Add search input above the table
  - Add column sort indicators (click header to sort ascending/descending)
  - Add pagination controls at the bottom
  - Replace inline action buttons with `DropdownMenu` (view, edit, delete)
  - Add empty state: "No actors found" with a "Create Actor" button
  - Replace raw error display with `Alert` component
- **Actor create** (`Actors/create.tsx`):
  - Replace raw HTML inputs with `FormField` wrapper
  - Replace raw submit button with `Button` variant
  - Add form validation with error states on `FormField`
  - Fix redirect: navigate to `/actors` after success (not `/`)

#### Task 4.3: TTPs pages

- **TTPs list** (`Ttps/index.tsx`):
  - Replace table with shadcn/ui `Table`
  - Add search, sort, pagination
  - Replace `href="#"` links with proper `Link` components
  - Add `DropdownMenu` for actions
  - Add empty state
- **TTPs create** (`Ttps/create.tsx`):
  - Replace description input with `Textarea` (shadcn/ui)
  - Use `FormField` wrapper for all inputs
  - Use `Button` for submit
- **TTPs view** (`Ttps/view.tsx`):
  - Replace hardcoded "Report: undefined" with safe fallback
  - Use `Card` for detail display
  - Use `Separator` for dividers

#### Task 4.4: Reports pages

- **Reports list** (`Reports/list.tsx`):
  - Replace table with shadcn/ui `Table`
  - Add search, sort, pagination
  - Fix navigation links to use `Link` components
  - Add `DropdownMenu` for actions
  - Add empty state
  - Add error handling with `Alert`
- **Reports create** (`Reports/create.tsx`):
  - Use `FormField` wrapper
  - Use `Button` for submit
- **Reports view** (`Reports/view.tsx`):
  - Use `Card` for detail sections
  - Fix "Report: undefined" title
  - Use `Separator` for dividers

---

### Phase 5: Table Enhancements (Search + Sort + Pagination)

#### Task 5.1: Create reusable `DataTable` component

Create `src/components/ui/data-table.tsx`:

```tsx
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string              // key to search on (e.g., "name")
  searchPlaceholder?: string      // e.g., "Search actors..."
  pageSizeOptions?: number[]      // [5, 10, 20, 50]
  initialPageSize?: number        // default: 10
  renderEmpty?: React.ReactNode   // custom empty state
  actions?: (row: TData) => React.ReactNode  // action buttons per row
  onSort?: (key: string, direction: 'asc' | 'desc') => void
}
```

Features:
- **Search**: Single-key text search (filters rows where `searchKey` value includes the query)
- **Sort**: Click column headers to sort. Arrow indicators show current sort direction
- **Pagination**: Page size selector (5/10/20/50) + page numbers + next/prev buttons
- **Empty state**: Shows custom empty state or default "No results." message
- **Responsive**: Wrapped in `div.overflow-x-auto` for horizontal scroll on small screens
- **Actions column**: Last column renders action buttons per row (edit, view, delete)

#### Task 5.2: Create column helpers

Create `src/components/ui/table-columns.tsx` with reusable column factories:

- `createTextColumn<T>(key: string, header: string)` -- text column with sort
- `createActionColumn<T>(actions: (row: T) => ReactNode)` -- actions dropdown
- `createBadgeColumn<T>(key: string, header: string, colorFn: (value: any) => string)` -- badge column

#### Task 5.3: Apply to all data tables

- Replace all manual table implementations with `DataTable`
- Apply consistently across Actors, TTPs, and Reports pages
- Each page passes its own data fetching logic and API calls

---

### Phase 6: Error Handling & UX Polish

#### Task 6.1: Add Toast notifications

- Install shadcn/ui `toast` (uses `sonner` under the hood)
- Add `Toaster` component in `src/main.tsx`
- Show success toasts on create/update/delete operations
- Show error toasts on API failures

#### Task 6.2: Add loading states

- Add `Skeleton` components to all data pages while loading
- Show skeleton table rows during initial data fetch
- Disable submit buttons during API calls with `Button` loading state

#### Task 6.3: Add confirmation dialogs

- Use shadcn/ui `AlertDialog` for delete confirmations
- "Are you sure you want to delete this actor?" with Cancel/Confirm buttons

#### Task 6.4: Fix all remaining accessibility issues

- All icon buttons have `aria-label`
- All inputs have associated `<label>` elements
- Proper focus management in dialogs
- Keyboard navigation support

---

### Phase 7: Backend Upgrades

#### Task 7.1: Add PUT/PATCH/DELETE endpoints

- **Actors**:
  - `PUT /api/actors/:id` -- update actor name and description
  - `DELETE /api/actors/:id` -- delete an actor
- **Reports**:
  - `PUT /api/reports/:id` -- update report name and author
  - `DELETE /api/reports/:id` -- delete a report
- **TTPs**:
  - `PUT /api/ttps/:id` -- update TTP name and description
  - `DELETE /api/ttps/:id` -- delete a TTP

#### Task 7.2: Add GET by ID endpoints

- `GET /api/actors/:id` -- return single actor
- `GET /api/reports/:id` -- return single report
- `GET /api/ttps/:id` -- return single TTP

#### Task 7.3: Add table relationships

Create new tables:

**actor_reports** (many-to-many: actors linked to reports)
| Column | Type | Notes |
|---|---|---|
| `id` | INTEGER PRIMARY KEY AUTOINCREMENT | |
| `actor_id` | INTEGER NOT NULL | FK -> actors.id |
| `report_id` | INTEGER NOT NULL | FK -> reports.id |
| `created_at` | DATETIME DEFAULT CURRENT_TIMESTAMP | |

**report_ttps** (many-to-many: reports linked to TTPs)
| Column | Type | Notes |
|---|---|---|
| `id` | INTEGER PRIMARY KEY AUTOINCREMENT | |
| `report_id` | INTEGER NOT NULL | FK -> reports.id |
| `ttp_id` | INTEGER NOT NULL | FK -> ttps.id |
| `created_at` | DATETIME DEFAULT CURRENT_TIMESTAMP | |

Add corresponding API endpoints:
- `GET /api/actors/:id/reports` -- get reports for an actor
- `GET /api/reports/:id/actors` -- get actors for a report
- `GET /api/reports/:id/ttps` -- get TTPs for a report
- `GET /api/ttps/:id/reports` -- get reports for a TTP
- `POST /api/reports/:id/actors` -- add actor to report
- `POST /api/reports/:id/ttps` -- add TTP to report
- `DELETE /api/reports/:id/actors/:actorId` -- remove actor from report
- `DELETE /api/reports/:id/ttps/:ttpId` -- remove TTP from report

#### Task 7.4: Add error handling middleware

- Add Express error handling middleware for uncaught errors
- Add validation for request bodies (name is required, max lengths)
- Return proper HTTP status codes (404 for not found, 400 for bad request)
- Add `not-found` middleware: `app.use('*', (req, res) => res.status(404).json({ error: 'Not found' }))`

#### Task 7.5: Update frontend types and services

- Add TypeScript types for all new endpoints and relationship data
- Update `actorService.ts` with update/delete methods
- Create `reportService.ts` and `ttpsService.ts` following the same pattern
- Add relationship fetching methods (e.g., `getReportActors(reportId)`)

---

## 3. File Structure After Migration

```
src/
  components/
    ui/                          # shadcn/ui components
      button.tsx
      input.tsx
      card.tsx
      label.tsx
      dialog.tsx
      table.tsx
      dropdown-menu.tsx
      select.tsx
      textarea.tsx
      badge.tsx
      separator.tsx
      avatar.tsx
      sheet.tsx
      pagination.tsx
      skeleton.tsx
      alert.tsx
      alert-dialog.tsx
      toast.tsx
      tooltip.tsx
      form-field.tsx             # composite: Label + Input + error
      page-content.tsx           # consistent page wrapper
      data-table.tsx             # reusable table with search/sort/pagination
      table-columns.tsx          # column factory helpers
      theme-toggle.tsx           # dark/light theme toggle
    Layout/
      index.tsx                   # redesigned with shadcn/ui
  context/
    ThemeContext.tsx              # theme provider + useTheme hook
  services/
    apiClient.ts                  # axios instance (unchanged)
    actorService.ts              # extended with update/delete
    reportService.ts             # new
    ttpsService.ts               # new
  types/
    actor.types.ts               # extended
    report.types.ts              # new
    ttps.types.ts                # new
  routes.tsx                     # (unchanged routing structure)
  pages/
    Homepage/
      index.tsx
    Actors/
      index.tsx
      list.tsx
      create.tsx
    Ttps/
      index.tsx
      create.tsx
      view.tsx
    Reports/
      list.tsx
      create.tsx
      report.tsx
      view.tsx
```

---

## 4. Execution Order

Execute phases in this order for maximum efficiency:

| Order | Phase | Description | Status |
|---|---|---|---|
| 1 | Phase 1 | Foundation & shadcn/ui setup | ✅ Complete |
| 2 | Phase 2 | Migrate UI primitives | ✅ Complete |
| 3 | Phase 3 | Migrate Layout | ✅ Complete |
| 4 | Phase 4 | Migrate page components | ✅ Complete |
| 5 | Phase 5 | Table enhancements (search/sort/pagination) | ✅ Complete |
| 6 | Phase 6 | Error handling & UX polish | Pending |
| 7 | Phase 7 | Backend upgrades | Pending |

Phases 1-4 should be done together as they are tightly coupled (primitives feed into pages). Phase 5 builds on the migrated pages. Phase 6 is polish. Phase 7 is backend work that can be done in parallel once the API contract is defined.

---

## 5. Dependencies to Add

```json
{
  "dependencies": {
    "@radix-ui/react-dialog": "^1.1.x",
    "@radix-ui/react-dropdown-menu": "^2.1.x",
    "@radix-ui/react-label": "^2.1.x",
    "@radix-ui/react-select": "^2.1.x",
    "@radix-ui/react-separator": "^1.1.x",
    "@radix-ui/react-slot": "^1.1.x",
    "@radix-ui/react-tabs": "^1.1.x",
    "@radix-ui/react-toast": "^1.2.x",
    "@radix-ui/react-tooltip": "^1.1.x",
    "sonner": "^1.7.x",
    "lucide-react": "^0.460.x"
  }
}
```

> Note: shadcn/ui CLI installs these automatically. `lucide-react` is the default icon library for shadcn/ui (replaces `react-icons`).

---

## 6. Migration Notes

- **react-icons -> lucide-react**: shadcn/ui uses Lucide icons. Replace `react-icons` imports with `lucide-react` equivalents:
  - `HiOutlineBell` -> `Bell`
  - `HiOutlineMenu` -> `Menu`
  - `HiOutlineXMark` -> `X`
  - `HiOutlineUser` -> `User`
- **@headlessui/react**: Can be removed after migration (shadcn/ui uses Radix primitives instead). Keep it for now during the transition.
- **Tailwind CSS v4**: shadcn/ui works with v4. The `@theme` directive in CSS replaces the old `tailwind.config.js` approach.
- **@tailwindcss/vite**: Keep as-is for the Vite plugin integration.
- **clsx + tailwind-merge**: Already installed. shadcn/ui uses the same `cn()` utility pattern.
