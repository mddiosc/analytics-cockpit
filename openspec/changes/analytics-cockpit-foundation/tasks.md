## 1. Foundation and Tooling

- [ ] 1.1 Establish feature-first source structure for app shell, dashboard domain, shared UI, and data contracts.
- [ ] 1.2 Configure routing, query client provider, and global styling baseline for the cockpit application.
- [ ] 1.3 Add and wire deterministic mock data adapters with runtime schema validation.

## 2. Dashboard Shell Implementation

- [ ] 2.1 Implement dashboard route with responsive shell layout, page heading, and section containers.
- [ ] 2.2 Build KPI summary cards with formatted values and trend state indicators.
- [ ] 2.3 Implement time range selector interactions that recompute dashboard summary and trend content.
- [ ] 2.4 Add loading and error UI states with retry behavior for dashboard data queries.

## 3. Data Exploration Surface

- [ ] 3.1 Implement typed campaign performance table with required analytics columns.
- [ ] 3.2 Add sortable columns using TanStack Table state and accessible toggle controls.
- [ ] 3.3 Implement campaign search filtering and no-results empty state messaging.

## 4. Quality and Verification

- [ ] 4.1 Configure Vitest + Testing Library setup and baseline assertions for dashboard shell rendering.
- [ ] 4.2 Add behavioral tests for time range updates, table sorting, and search filtering.
- [ ] 4.3 Run lint, typecheck, and test commands; fix failures and document verification results.
