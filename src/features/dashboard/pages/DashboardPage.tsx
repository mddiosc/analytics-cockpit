import { KpiCard } from "../components/KpiCard";
import { PerformanceTable } from "../components/PerformanceTable";
import { RangeSelector } from "../components/RangeSelector";
import { TrendOverview } from "../components/TrendOverview";
import { useDashboardData } from "../hooks/useDashboardData";
import { useDashboardFilters } from "../store";

export function DashboardPage() {
  const setRange = useDashboardFilters((state) => state.setRange);
  const search = useDashboardFilters((state) => state.search);
  const setSearch = useDashboardFilters((state) => state.setSearch);
  const { data, isPending, isError, refetch, range } = useDashboardData();

  return (
    <section className="dashboard-page">
      <div className="dashboard-toolbar">
        <RangeSelector value={range} onChange={setRange} />
      </div>

      {isPending ? (
        <section className="status-panel" aria-live="polite">
          Loading dashboard metrics...
        </section>
      ) : null}

      {isError ? (
        <section
          className="status-panel status-panel--error"
          aria-live="assertive"
        >
          <p>Unable to load dashboard data right now.</p>
          <button type="button" onClick={() => refetch()}>
            Retry
          </button>
        </section>
      ) : null}

      {data ? (
        <>
          <section className="kpi-grid" aria-label="KPI summary">
            {data.kpis.map((metric) => (
              <KpiCard key={metric.id} metric={metric} />
            ))}
          </section>
          <TrendOverview data={data.trends} />
          <PerformanceTable
            rows={data.rows}
            search={search}
            onSearchChange={setSearch}
          />
        </>
      ) : null}
    </section>
  );
}
