## Context

The foundation release established baseline routing, mock data orchestration, KPI cards, and a sortable table. The next milestone must make the cockpit useful for real analyst workflows by introducing deeper visual analysis, shareable filtered states, and performance safeguards for bigger datasets. The project remains frontend-only and static-deployable, so all persistence and API behaviors are emulated through deterministic client patterns.

## Goals / Non-Goals

**Goals:**

- Add comparative charts that communicate channel contribution and trend movement over selected periods.
- Expand filter model beyond text search to include channel, conversion rate, and revenue constraints.
- Synchronize filter state with URL query params for reproducibility and link sharing.
- Introduce virtualized table rows for responsiveness with larger mock datasets.
- Add preset management for quickly switching between common analytics contexts.

**Non-Goals:**

- Implementing backend persistence, user authentication, or multi-user preset sharing.
- Introducing real-time streams or websocket-based updates.
- Full BI feature parity (custom calculated fields, arbitrary chart builder, CSV export engine).

## Decisions

- **Charting surface with composable primitives**: Add a dedicated chart layer for channel mix and trend comparison.
  - Alternatives considered: hand-drawn SVG charts were rejected for maintainability and interaction complexity.
- **Single source of filter truth in Zustand**: Store advanced filter state centrally and derive URL parameters from it.
  - Alternatives considered: duplicate state in component + URL was rejected to avoid divergence.
- **Bidirectional URL sync adapter**: Parse query params into filter state on load and update URL on state changes.
  - Alternatives considered: one-way URL updates were rejected because deep links would not restore view state correctly.
- **Row virtualization for exploration table**: Use virtualization only at tbody rendering to keep table semantics and current column logic.
  - Alternatives considered: pagination-only strategy was rejected because it hides continuity and slows exploratory scanning.
- **Preset model as serialized filter snapshots**: Save presets as named filter payloads in local storage with schema validation.
  - Alternatives considered: opaque ad-hoc storage blobs were rejected due to migration fragility.

## Risks / Trade-offs

- **[State synchronization complexity]** URL, store, and table interactions can create subtle loops → **Mitigation:** introduce explicit hydration phase and controlled update guards.
- **[Virtualization edge cases]** Dynamic row heights and sorting transitions may create visual jumps → **Mitigation:** use fixed row heights for v1 and verify sorted/filter transitions in tests.
- **[Preset drift]** Future filter schema updates may invalidate saved presets → **Mitigation:** version preset schema and provide fallback migration behavior.
- **[Chart dependency weight]** Added charting library can increase bundle size → **Mitigation:** lazy-load chart modules and monitor bundle output in CI.
