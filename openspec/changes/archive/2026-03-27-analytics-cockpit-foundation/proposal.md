## Why

The repository has only a starter template and does not yet demonstrate senior-level frontend architecture for analytics-heavy products. We need a production-oriented foundation that proves capability in data UX, performance-aware state management, and delivery discipline.

## What Changes

- Build an initial analytics cockpit shell with domain-driven frontend structure, routing, shared providers, and typed data contracts.
- Introduce an interactive dashboard surface with KPI cards, time-range filtering, trend visualization, and a sortable/searchable performance table.
- Add deterministic mock data access patterns and query orchestration that mimic real network behavior.
- Establish quality gates with unit and component testing foundation, plus project scripts for linting, typing, and tests.
- Bootstrap OpenSpec-driven delivery artifacts so subsequent capabilities can be implemented through spec-first workflow.

## Capabilities

### New Capabilities

- `analytics-dashboard-shell`: Provide the core application shell, dashboard layout, and KPI/trend summary surfaces for analytics workflows.
- `analytics-data-exploration`: Provide filterable, sortable, and searchable tabular exploration for campaign/channel performance data.

### Modified Capabilities

- None.

## Impact

- Affects frontend architecture under `src/` including app providers, routing, shared domain types, and dashboard feature modules.
- Adds dependencies for data orchestration and state management (`@tanstack/react-query`, `@tanstack/react-table`, `zustand`, `zod`) and testing stack (`vitest`, Testing Library, Playwright, MSW).
- Introduces OpenSpec artifacts under `openspec/changes/analytics-cockpit-foundation/` to govern implementation and future extension.
