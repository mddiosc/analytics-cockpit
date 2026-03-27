import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { TrendPoint } from "../types";

interface TrendComparisonChartProps {
  data: TrendPoint[];
  isPending: boolean;
  isError: boolean;
  onRetry: () => void;
}

export function TrendComparisonChart({
  data,
  isPending,
  isError,
  onRetry,
}: Readonly<TrendComparisonChartProps>) {
  return (
    <section className="chart-panel" aria-label="Trend comparison insights">
      <h2>Revenue vs sessions trend</h2>
      {isPending ? (
        <p className="chart-status">Loading trend comparison...</p>
      ) : null}
      {isError ? (
        <div className="chart-status chart-status--error">
          <p>Failed to load trend comparison.</p>
          <button type="button" onClick={onRetry}>
            Retry
          </button>
        </div>
      ) : null}
      {!isPending && !isError ? (
        <div className="chart-canvas">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dbe4f0" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#007f8d"
                strokeWidth={3}
                dot={false}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="sessions"
                stroke="#ff7a18"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : null}
    </section>
  );
}
