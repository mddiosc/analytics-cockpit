# analytics-view-presets Specification

## Purpose
TBD - created by archiving change analytics-insights-v1. Update Purpose after archive.
## Requirements
### Requirement: Preset selection for analytics views

The dashboard SHALL provide a preset selector with predefined view options that apply grouped filter settings.

#### Scenario: Apply preset

- **WHEN** a user selects a preset
- **THEN** the dashboard applies the preset filter values and refreshes charts and table accordingly

### Requirement: Preset persistence across sessions

Custom presets SHALL be persisted locally and restored on subsequent visits.

#### Scenario: Restore custom preset

- **WHEN** a user reloads the application after saving a custom preset
- **THEN** the preset remains available in the selector

### Requirement: Preset validation on restore

The dashboard SHALL validate stored presets and discard invalid entries safely.

#### Scenario: Invalid preset payload

- **WHEN** stored preset data does not match the expected schema
- **THEN** invalid presets are ignored and the dashboard falls back to default filters

