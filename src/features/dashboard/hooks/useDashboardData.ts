import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchDashboardData } from "../api";
import { useDashboardFilters } from "../store";

export function useDashboardData() {
  const range = useDashboardFilters((state) => state.range);

  const query = useQuery({
    queryKey: ["dashboard", range],
    queryFn: () => fetchDashboardData(range),
  });

  const totals = useMemo(() => {
    if (!query.data) {
      return { campaigns: 0 };
    }

    return { campaigns: query.data.rows.length };
  }, [query.data]);

  return {
    ...query,
    range,
    totals,
  };
}
