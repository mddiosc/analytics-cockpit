## MODIFIED Requirements

### Requirement: Time range filter interaction

The dashboard SHALL provide a time range selector that updates summary and trend sections according to the selected range and SHALL coordinate updates with advanced filter state.

#### Scenario: Time range updates dashboard content

- **WHEN** a user selects a different time range option
- **THEN** the dashboard recomputes and displays KPI and trend values for that range

#### Scenario: Time range and advanced filters remain consistent

- **WHEN** a user changes time range while advanced filters are active
- **THEN** chart and table surfaces refresh using the same unified filter state

## ADDED Requirements

### Requirement: Unified filter orchestration

The dashboard shell SHALL orchestrate time range and advanced filters as a single state model consumed by KPI, chart, and exploration sections.

#### Scenario: Shared filter state propagation

- **WHEN** any filter value changes
- **THEN** all dependent dashboard sections re-evaluate from the same state snapshot
