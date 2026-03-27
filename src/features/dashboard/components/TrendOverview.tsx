import type { TrendPoint } from "../types";

interface TrendOverviewProps {
  data: TrendPoint[];
}

export function TrendOverview({ data }: TrendOverviewProps) {
  const maxRevenue = Math.max(...data.map((point) => point.revenue));

  return (
    <section className="trend-panel" aria-label="Revenue trend overview">
      <h2>Revenue trend snapshot</h2>
      <p className="trend-copy">
        Normalized points show directional momentum for the selected time range.
      </p>
      <div className="trend-bars">
        {data.map((point) => {
          const height = Math.max(
            12,
            Math.round((point.revenue / maxRevenue) * 100),
          );
          return (
            <div key={point.date} className="trend-bar-item">
              <div className="trend-bar" style={{ height: `${height}%` }} />
              <span>{point.date}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
