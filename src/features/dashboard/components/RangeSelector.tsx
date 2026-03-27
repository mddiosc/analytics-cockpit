import type { TimeRange } from "../types";

interface RangeSelectorProps {
  value: TimeRange;
  onChange: (next: TimeRange) => void;
}

const ranges: Array<{ label: string; value: TimeRange }> = [
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
];

export function RangeSelector({
  value,
  onChange,
}: Readonly<RangeSelectorProps>) {
  return (
    <fieldset className="range-selector">
      <legend>Time range</legend>
      <div className="range-selector__options">
        {ranges.map((range) => {
          const isActive = range.value === value;
          return (
            <button
              key={range.value}
              type="button"
              className={isActive ? "chip chip--active" : "chip"}
              onClick={() => onChange(range.value)}
              aria-pressed={isActive}
            >
              {range.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
