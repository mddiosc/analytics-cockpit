import type { Channel } from "../types";

interface AdvancedFiltersProps {
  channels: Channel[];
  onToggleChannel: (channel: Channel) => void;
  minConversionRate: number | null;
  onMinConversionRateChange: (value: number | null) => void;
  revenueMin: number | null;
  revenueMax: number | null;
  onRevenueMinChange: (value: number | null) => void;
  onRevenueMaxChange: (value: number | null) => void;
}

const allChannels: Channel[] = [
  "Paid Search",
  "Email",
  "Organic",
  "Social",
  "Referral",
];

function parseInput(value: string): number | null {
  if (value.trim() === "") {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function AdvancedFilters({
  channels,
  onToggleChannel,
  minConversionRate,
  onMinConversionRateChange,
  revenueMin,
  revenueMax,
  onRevenueMinChange,
  onRevenueMaxChange,
}: Readonly<AdvancedFiltersProps>) {
  return (
    <section className="advanced-filters" aria-label="Advanced filters">
      <div className="advanced-filters__channels">
        <p>Channels</p>
        <div className="advanced-filters__chips">
          {allChannels.map((channel) => {
            const active = channels.includes(channel);
            return (
              <button
                key={channel}
                type="button"
                className={active ? "chip chip--active" : "chip"}
                onClick={() => onToggleChannel(channel)}
                aria-pressed={active}
              >
                {channel}
              </button>
            );
          })}
        </div>
      </div>

      <label>
        Min conversion %
        <input
          type="number"
          inputMode="decimal"
          value={minConversionRate ?? ""}
          onChange={(event) =>
            onMinConversionRateChange(parseInput(event.target.value))
          }
          placeholder="e.g. 3.2"
        />
      </label>

      <label>
        Min revenue
        <input
          type="number"
          inputMode="numeric"
          value={revenueMin ?? ""}
          onChange={(event) =>
            onRevenueMinChange(parseInput(event.target.value))
          }
          placeholder="e.g. 10000"
        />
      </label>

      <label>
        Max revenue
        <input
          type="number"
          inputMode="numeric"
          value={revenueMax ?? ""}
          onChange={(event) =>
            onRevenueMaxChange(parseInput(event.target.value))
          }
          placeholder="e.g. 90000"
        />
      </label>
    </section>
  );
}
