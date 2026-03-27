import { describe, expect, it } from "vitest";

import { getDashboardMockData } from "./mockData";

describe("getDashboardMockData", () => {
  it("returns KPI, trend, and row datasets for each range", () => {
    const data = getDashboardMockData("30d");

    expect(data.kpis).toHaveLength(4);
    expect(data.trends.length).toBeGreaterThan(0);
    expect(data.rows.length).toBeGreaterThan(0);
  });

  it("scales totals between 7d and 90d ranges", () => {
    const week = getDashboardMockData("7d");
    const quarter = getDashboardMockData("90d");

    const weekRevenue =
      week.kpis.find((metric) => metric.id === "revenue")?.value ?? 0;
    const quarterRevenue =
      quarter.kpis.find((metric) => metric.id === "revenue")?.value ?? 0;

    expect(quarterRevenue).toBeGreaterThan(weekRevenue);
  });

  it("provides large dataset suitable for virtualization", () => {
    const data = getDashboardMockData("30d");
    expect(data.rows.length).toBeGreaterThan(200);
  });
});
