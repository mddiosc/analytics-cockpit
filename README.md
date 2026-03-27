# Analytics Cockpit

Frontend-only analytics product built with React, TypeScript, and Vite. The repository is designed as a senior-level portfolio project with OpenSpec-driven delivery, typed data contracts, and behavior-focused tests.

## Stack

- React 19 + TypeScript + Vite
- React Router (app shell and routes)
- TanStack Query (data orchestration)
- TanStack Table (sorting/filtering exploration table)
- Zustand (UI filter state)
- Zod (runtime schema validation)
- Vitest + Testing Library (unit and component tests)

## Getting Started

```bash
pnpm install
pnpm dev
```

Open `http://localhost:5173`.

## Quality Commands

```bash
pnpm lint
pnpm typecheck
pnpm test:run
pnpm build
```

## Project Structure

```text
src/
  app/                 # providers, routing, app shell
  features/
    dashboard/         # dashboard domain (api, state, UI, tests)
  test/                # shared test setup
```

## OpenSpec Workflow

This repository uses OpenSpec for spec-first change management.

- Current change: `openspec/changes/analytics-cockpit-foundation`
- Generated artifacts:
  - `proposal.md`
  - `design.md`
  - `specs/analytics-dashboard-shell/spec.md`
  - `specs/analytics-data-exploration/spec.md`
  - `tasks.md`

To continue implementation through the spec workflow, use `/opsx-apply` in OpenCode.
