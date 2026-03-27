import { dashboardDataSchema, dashboardInsightDataSchema } from "./schema";
import { getDashboardInsightMockData, getDashboardMockData } from "./mockData";
import type { DashboardData, DashboardInsightData, TimeRange } from "./types";

export async function fetchDashboardData(
  range: TimeRange,
): Promise<DashboardData> {
  await new Promise((resolve) => setTimeout(resolve, 220));

  const data = getDashboardMockData(range);
  return dashboardDataSchema.parse(data);
}

export async function fetchDashboardInsightData(
  range: TimeRange,
): Promise<DashboardInsightData> {
  await new Promise((resolve) => setTimeout(resolve, 220));

  const data = getDashboardInsightMockData(range);
  return dashboardInsightDataSchema.parse(data);
}
