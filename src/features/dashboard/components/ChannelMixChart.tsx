import {
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import type { ValueType } from "recharts/types/component/DefaultTooltipContent";

import type { ChannelMixItem } from "../types";

interface ChannelMixChartProps {
  data: ChannelMixItem[];
  isPending: boolean;
  isError: boolean;
  onRetry: () => void;
}

const colors = ["#007f8d", "#0f9d58", "#ff7a18", "#6a5acd", "#e64980"];

export function ChannelMixChart({
  data,
  isPending,
  isError,
  onRetry,
}: Readonly<ChannelMixChartProps>) {
  return (
    <section className="chart-panel" aria-label="Channel mix insights">
      <h2>Channel mix contribution</h2>
      {isPending ? (
        <p className="chart-status">Loading chart insights...</p>
      ) : null}
      {isError ? (
        <div className="chart-status chart-status--error">
          <p>Failed to load channel mix.</p>
          <button type="button" onClick={onRetry}>
            Retry
          </button>
        </div>
      ) : null}
      {!isPending && !isError ? (
        <div className="chart-canvas">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="revenue"
                nameKey="channel"
                outerRadius={100}
                innerRadius={50}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.channel}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: ValueType | undefined, name) => {
                  const numeric =
                    typeof value === "number" ? value : Number(value ?? 0);
                  void name;
                  return `$${numeric.toLocaleString("en-US")}`;
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : null}
    </section>
  );
}
