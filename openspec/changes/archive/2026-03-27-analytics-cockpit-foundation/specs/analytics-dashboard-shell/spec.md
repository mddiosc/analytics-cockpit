## ADDED Requirements

### Requirement: Dashboard route and shell initialization

The application SHALL expose a dashboard route as the primary product surface and render it inside a shared application shell with header, content container, and responsive layout behavior.

#### Scenario: Dashboard route rendering

- **WHEN** a user opens the root application URL
- **THEN** the application renders the dashboard shell with title and summary sections without runtime errors

### Requirement: KPI summary visibility

The dashboard SHALL display a KPI summary strip with at least four business metrics and each metric SHALL include a label, current value, and trend direction indicator.

#### Scenario: KPI summary hydration

- **WHEN** dashboard data is successfully loaded
- **THEN** all KPI cards render with label, formatted value, and trend state

### Requirement: Time range filter interaction

The dashboard SHALL provide a time range selector that updates summary and trend sections according to the selected range.

#### Scenario: Time range updates dashboard content

- **WHEN** a user selects a different time range option
- **THEN** the dashboard recomputes and displays KPI and trend values for that range

### Requirement: Loading and error states

The dashboard SHALL present explicit loading and recoverable error states for asynchronous data retrieval.

#### Scenario: Loading state

- **WHEN** dashboard queries are in flight
- **THEN** the user sees a loading indicator in the dashboard content area

#### Scenario: Error state

- **WHEN** dashboard data retrieval fails
- **THEN** the user sees an error panel with retry affordance
