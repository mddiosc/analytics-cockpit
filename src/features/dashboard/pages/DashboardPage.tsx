import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { AdvancedFilters } from "../components/AdvancedFilters";
import { ChannelMixChart } from "../components/ChannelMixChart";
import { KpiCard } from "../components/KpiCard";
import { PerformanceTable } from "../components/PerformanceTable";
import { PresetControls } from "../components/PresetControls";
import { RangeSelector } from "../components/RangeSelector";
import { TrendComparisonChart } from "../components/TrendComparisonChart";
import { TrendOverview } from "../components/TrendOverview";
import { useDashboardData } from "../hooks/useDashboardData";
import {
  builtInPresets,
  loadCustomPresets,
  saveCustomPresets,
} from "../lib/presets";
import {
  deserializeFiltersFromSearch,
  serializeFiltersToSearch,
} from "../lib/urlState";
import type {
  DashboardFilters,
  DashboardViewPreset,
  TimeRange,
} from "../types";
import { useDashboardFilters } from "../store";

interface DashboardFilterActions {
  applyFilters: (filters: DashboardFilters) => void;
  setRange: (range: TimeRange) => void;
  setSearch: (search: string) => void;
  toggleChannel: (channel: DashboardFilters["channels"][number]) => void;
  setMinConversionRate: (value: number | null) => void;
  setRevenueMin: (value: number | null) => void;
  setRevenueMax: (value: number | null) => void;
}

interface DashboardFilterState {
  search: string;
  channels: DashboardFilters["channels"];
  minConversionRate: number | null;
  revenueMin: number | null;
  revenueMax: number | null;
}

export function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [customPresets, setCustomPresets] = useState<DashboardViewPreset[]>([]);
  const [hydratedFromUrl, setHydratedFromUrl] = useState(false);

  const applyFilters = useDashboardFilters(
    (state: DashboardFilterActions) => state.applyFilters,
  );
  const setRange = useDashboardFilters(
    (state: DashboardFilterActions) => state.setRange,
  );
  const search = useDashboardFilters(
    (state: DashboardFilterState) => state.search,
  );
  const channels = useDashboardFilters(
    (state: DashboardFilterState) => state.channels,
  );
  const minConversionRate = useDashboardFilters(
    (state: DashboardFilterState) => state.minConversionRate,
  );
  const revenueMin = useDashboardFilters(
    (state: DashboardFilterState) => state.revenueMin,
  );
  const revenueMax = useDashboardFilters(
    (state: DashboardFilterState) => state.revenueMax,
  );
  const setSearch = useDashboardFilters(
    (state: DashboardFilterActions) => state.setSearch,
  );
  const toggleChannel = useDashboardFilters(
    (state: DashboardFilterActions) => state.toggleChannel,
  );
  const setMinConversionRate = useDashboardFilters(
    (state: DashboardFilterActions) => state.setMinConversionRate,
  );
  const setRevenueMin = useDashboardFilters(
    (state: DashboardFilterActions) => state.setRevenueMin,
  );
  const setRevenueMax = useDashboardFilters(
    (state: DashboardFilterActions) => state.setRevenueMax,
  );

  const {
    data,
    isPending,
    isError,
    refetch,
    range,
    insightData,
    insightPending,
    insightError,
    refetchInsights,
  } = useDashboardData();

  const filters = useMemo(
    () => ({
      range,
      search,
      channels,
      minConversionRate,
      revenueMin,
      revenueMax,
    }),
    [channels, minConversionRate, range, revenueMax, revenueMin, search],
  );

  useEffect(() => {
    if (hydratedFromUrl) {
      return;
    }

    try {
      const restored = deserializeFiltersFromSearch(searchParams.toString());
      applyFilters(restored);
    } catch {
      // Ignore invalid URL params and continue with defaults.
    } finally {
      setHydratedFromUrl(true);
    }
  }, [applyFilters, hydratedFromUrl, searchParams]);

  useEffect(() => {
    if (!hydratedFromUrl) {
      return;
    }

    const next = serializeFiltersToSearch(filters);
    const current = searchParams.toString();
    if (next !== current) {
      setSearchParams(next, { replace: true });
    }
  }, [filters, hydratedFromUrl, searchParams, setSearchParams]);

  useEffect(() => {
    setCustomPresets(loadCustomPresets());
  }, []);

  const allPresets = useMemo(
    () => [...builtInPresets, ...customPresets],
    [customPresets],
  );

  const handleSavePreset = (name: string) => {
    const nextPreset: DashboardViewPreset = {
      id: `custom-${Date.now()}`,
      name,
      kind: "custom",
      filters,
    };

    setCustomPresets((prev) => {
      const next = [...prev, nextPreset];
      saveCustomPresets(next);
      return next;
    });
  };

  const handleApplyPreset = (presetId: string) => {
    const preset = allPresets.find((entry) => entry.id === presetId);
    if (!preset) {
      return;
    }
    applyFilters(preset.filters);
  };

  return (
    <section className="dashboard-page">
      <div className="dashboard-toolbar">
        <RangeSelector value={range} onChange={setRange} />
      </div>

      <AdvancedFilters
        channels={channels}
        onToggleChannel={toggleChannel}
        minConversionRate={minConversionRate}
        onMinConversionRateChange={setMinConversionRate}
        revenueMin={revenueMin}
        revenueMax={revenueMax}
        onRevenueMinChange={setRevenueMin}
        onRevenueMaxChange={setRevenueMax}
      />

      <PresetControls
        customPresets={customPresets}
        onApplyPreset={handleApplyPreset}
        onSavePreset={handleSavePreset}
      />

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
          <section className="insights-grid">
            <ChannelMixChart
              data={insightData?.channelMix ?? []}
              isPending={insightPending}
              isError={insightError}
              onRetry={() => {
                void refetchInsights();
              }}
            />
            <TrendComparisonChart
              data={insightData?.trends ?? []}
              isPending={insightPending}
              isError={insightError}
              onRetry={() => {
                void refetchInsights();
              }}
            />
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
