## Why

The current cockpit foundation delivers KPIs and tabular exploration, but it lacks higher-value analytical workflows that senior product teams use to inspect patterns quickly and act on outliers. We need a second iteration focused on insights depth, perceived performance at scale, and decision-ready filtering.

## What Changes

- Add richer insights visualizations to compare channel performance across time and detect trend shifts.
- Introduce advanced filters (channel multi-select, conversion threshold, revenue range) with URL synchronization for shareable analysis states.
- Add table virtualization for large datasets to maintain smooth interactions while preserving sort and filter behavior.
- Add saved view presets so users can quickly jump between high-value analytics slices.
- Expand automated tests for filter orchestration, URL state restoration, and virtualization behavior boundaries.

## Capabilities

### New Capabilities

- `analytics-insight-visualization`: Provide insight-oriented charting surfaces that support comparative channel and trend analysis.
- `analytics-view-presets`: Provide persistent, user-selectable dashboard view presets for common analysis workflows.

### Modified Capabilities

- `analytics-data-exploration`: Extend exploration requirements with advanced filters, URL-synced state, and virtualized row rendering for large datasets.
- `analytics-dashboard-shell`: Extend shell behavior to coordinate insight filters and chart/table synchronization.

## Impact

- Affects dashboard domain modules in `src/features/dashboard` for filter state, chart rendering, and exploration table infrastructure.
- Adds frontend dependencies for charting and virtualization if needed (e.g., `recharts` or `echarts-for-react`, `@tanstack/react-virtual`).
- Increases testing scope for filter-state lifecycle and large-dataset interactions.
