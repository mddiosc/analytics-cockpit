import { dashboardDataSchema } from "./schema";
import { getDashboardMockData } from "./mockData";
import type { DashboardData, TimeRange } from "./types";

export async function fetchDashboardData(
  range: TimeRange,
): Promise<DashboardData> {
  await new Promise((resolve) => setTimeout(resolve, 220));

  const data = getDashboardMockData(range);
  return dashboardDataSchema.parse(data);
}
