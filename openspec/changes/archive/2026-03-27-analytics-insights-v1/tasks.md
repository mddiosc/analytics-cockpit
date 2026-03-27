## 1. Insight Data and Dependencies

- [x] 1.1 Add charting and virtualization dependencies required for insights and large table rendering.
- [x] 1.2 Extend dashboard mock data adapters to generate channel distribution and larger exploration datasets.
- [x] 1.3 Introduce schema updates for advanced filter model and preset payload validation.

## 2. Charting and Visual Insights

- [x] 2.1 Implement comparative channel mix visualization section with loading and error states.
- [x] 2.2 Implement dual-metric trend chart bound to active dashboard filters.
- [x] 2.3 Integrate chart sections into dashboard layout without regressing current KPI/table behavior.

## 3. Advanced Filters and URL Synchronization

- [x] 3.1 Extend dashboard filter store with channel, conversion threshold, and revenue range controls.
- [x] 3.2 Implement URL query serialization/hydration for unified filter state.
- [x] 3.3 Update exploration table filtering pipeline to apply all advanced filters consistently.

## 4. Presets and Performance

- [x] 4.1 Implement preset selector with predefined views and custom preset save workflow.
- [x] 4.2 Persist and restore custom presets via local storage with schema-safe parsing.
- [x] 4.3 Implement row virtualization for large exploration datasets while preserving sorting and search UX.

## 5. Quality and Verification

- [x] 5.1 Add tests for chart rendering behavior under filter/range updates.
- [x] 5.2 Add tests for URL state restoration, advanced filtering combinations, and preset persistence.
- [x] 5.3 Run lint, typecheck, and test suite; fix regressions and document outcomes.
