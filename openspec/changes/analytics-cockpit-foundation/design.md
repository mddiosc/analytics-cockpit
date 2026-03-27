## Context

`analytics-cockpit` starts from a plain Vite React TypeScript scaffold with no domain boundaries, no data model, and no testing setup for product behavior. The target is a frontend-only analytics product that still reflects senior engineering practices: explicit feature boundaries, deterministic data flow, consistent typing, and verifiable quality gates. The application must remain deployable as static assets while being ready to swap mock data for real APIs later.

## Goals / Non-Goals

**Goals:**

- Define a scalable frontend architecture organized by feature domains and shared primitives.
- Implement a dashboard shell that surfaces KPI metrics, trend summary, and campaign/channel exploration table.
- Centralize data acquisition through typed query functions and schema validation.
- Add automated baseline coverage for rendering, filtering behavior, and utility logic.
- Establish OpenSpec as the workflow for subsequent iterations.

**Non-Goals:**

- Building a backend service, authentication, or role-based access control.
- Implementing real-time streaming, websocket ingestion, or export pipelines in this first change.
- Completing full design system tokenization or comprehensive visual regression automation.

## Decisions

- **Feature-first folder strategy**: Use `src/features/<domain>` for domain logic (dashboard, filters, table) and `src/shared/*` for reusable primitives. This limits coupling and keeps future capabilities composable.
  - Alternatives considered: type-based folders (`components`, `hooks`, `utils`) were rejected due to weaker cohesion for fast-growing product areas.
- **React Router for route surface**: Keep explicit route declarations with a root layout and `dashboard` route.
  - Alternatives considered: custom page state switching was rejected to avoid hidden navigation state and poorer URL semantics.
- **TanStack Query for server-state simulation**: Model async data loading, caching, and stale behavior even with mock data.
  - Alternatives considered: direct `useEffect` fetch logic was rejected because it scales poorly for retries/cache invalidation and obscures data lifecycle concerns.
- **TanStack Table for exploration grid**: Use composable column definitions, sorting, filtering, and row modeling in typed form.
  - Alternatives considered: hand-rolled table state was rejected to avoid rebuilding proven table primitives and to improve long-term maintainability.
- **Zod-validated contracts**: Validate mock payloads at boundaries to preserve trust in downstream UI logic.
  - Alternatives considered: pure TypeScript interfaces were rejected because they do not enforce runtime validation.
- **Mock data via deterministic fixtures and adapters**: Keep frontend-only deployment while preserving realistic async patterns and error handling hooks.
  - Alternatives considered: raw static imports in components were rejected because they bypass data boundary discipline.

## Risks / Trade-offs

- **[Higher initial complexity]** Introducing query/table/schema libraries early increases setup overhead → **Mitigation:** keep first scope narrow and document boundaries with typed helpers.
- **[Mock realism gap]** Simulated data may hide API integration challenges → **Mitigation:** enforce schema validation and normalize access through query adapters that can swap transport later.
- **[UI polish vs. architecture pace]** Prioritizing architecture could delay visual richness → **Mitigation:** ship a complete but intentionally scoped UI slice with clear follow-up milestones.
- **[Test maintenance cost]** Broader testing stack can introduce friction during rapid iterations → **Mitigation:** focus tests on critical behavior and avoid snapshot-heavy tests.
