## ADDED Requirements

### Requirement: Comparative channel mix visualization

The dashboard SHALL provide a comparative channel mix chart that displays each channel's contribution for the selected time range.

#### Scenario: Channel mix chart render

- **WHEN** dashboard insight data is available
- **THEN** the chart renders one segment per channel with relative contribution values

### Requirement: Dual-metric trend visualization

The dashboard SHALL provide a trend chart that compares at least two key metrics over time for the active filters.

#### Scenario: Trend comparison update

- **WHEN** a user changes range or advanced filters
- **THEN** the trend chart updates to reflect the filtered timeline for both metrics

### Requirement: Insight chart loading and error communication

Insight visualizations SHALL render explicit loading placeholders and recoverable error states independent of the table view.

#### Scenario: Chart loading placeholder

- **WHEN** insight chart queries are pending
- **THEN** the insight area shows a loading placeholder with preserved layout space

#### Scenario: Chart error state

- **WHEN** insight chart queries fail
- **THEN** the insight area shows an error message with retry action
