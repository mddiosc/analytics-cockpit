import type { KpiMetric } from "../types";

interface KpiCardProps {
  metric: KpiMetric;
}

function formatValue(metric: KpiMetric): string {
  if (metric.unit === "currency") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(metric.value);
  }

  if (metric.unit === "percent") {
    return `${metric.value.toFixed(2)}%`;
  }

  return new Intl.NumberFormat("en-US").format(metric.value);
}

export function KpiCard({ metric }: Readonly<KpiCardProps>) {
  const trendClass =
    metric.trendDelta >= 0
      ? "metric-trend metric-trend--up"
      : "metric-trend metric-trend--down";
  const trendPrefix = metric.trendDelta >= 0 ? "+" : "";

  return (
    <article className="kpi-card" aria-label={metric.label}>
      <p className="kpi-label">{metric.label}</p>
      <p className="kpi-value">{formatValue(metric)}</p>
      <p className={trendClass}>
        {trendPrefix}
        {metric.trendDelta.toFixed(1)}%
      </p>
    </article>
  );
}
