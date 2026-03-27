## ADDED Requirements

### Requirement: Campaign performance exploration table

The dashboard SHALL include a tabular campaign exploration section populated from typed analytics records.

#### Scenario: Initial table render

- **WHEN** campaign performance data is available
- **THEN** the table renders each record with campaign, channel, sessions, conversion rate, revenue, and change columns

### Requirement: Sortable metric columns

The exploration table SHALL allow users to sort metric columns in ascending and descending order.

#### Scenario: Column sorting toggle

- **WHEN** a user activates sorting on a sortable column header
- **THEN** the table rows reorder according to the selected sort direction

### Requirement: Text search filtering

The exploration section SHALL provide a search input that filters table rows by campaign name.

#### Scenario: Search filtering

- **WHEN** a user enters a campaign keyword in search
- **THEN** only rows whose campaign names match the query remain visible

### Requirement: Empty result communication

The exploration section SHALL display an explicit empty-state message when filters yield zero rows.

#### Scenario: No matching campaigns

- **WHEN** active search and filters produce no records
- **THEN** the table body is replaced by a no-results message with guidance to clear filters
