import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useMemo, useRef, useState } from "react";
import type { ColumnDef, SortingState } from "@tanstack/react-table";

import type { CampaignPerformanceRow } from "../types";

interface PerformanceTableProps {
  rows: CampaignPerformanceRow[];
  search: string;
  onSearchChange: (value: string) => void;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function PerformanceTable({
  rows,
  search,
  onSearchChange,
}: Readonly<PerformanceTableProps>) {
  const tableRef = useRef<HTMLDivElement>(null);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<CampaignPerformanceRow>[]>(
    () => [
      {
        accessorKey: "campaign",
        header: "Campaign",
      },
      {
        accessorKey: "channel",
        header: "Channel",
      },
      {
        accessorKey: "sessions",
        header: "Sessions",
        cell: ({ getValue }) =>
          new Intl.NumberFormat("en-US").format(getValue<number>()),
      },
      {
        accessorKey: "conversionRate",
        header: "Conversion",
        cell: ({ getValue }) => `${getValue<number>().toFixed(2)}%`,
      },
      {
        accessorKey: "revenue",
        header: "Revenue",
        cell: ({ getValue }) => formatCurrency(getValue<number>()),
      },
      {
        accessorKey: "change",
        header: "Trend",
        cell: ({ getValue }) => {
          const value = getValue<number>();
          const prefix = value > 0 ? "+" : "";
          return `${prefix}${value.toFixed(1)}%`;
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data: rows,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const rowCount = table.getRowModel().rows.length;
  const rowsForVirtualizer = table.getRowModel().rows;

  const virtualizer = useVirtualizer({
    count: rowsForVirtualizer.length,
    estimateSize: () => 46,
    getScrollElement: () => tableRef.current,
    overscan: 10,
  });

  const virtualRows = virtualizer.getVirtualItems();
  const hasVirtualRows = virtualRows.length > 0;
  const renderedRows = hasVirtualRows
    ? virtualRows.map((virtualRow) => rowsForVirtualizer[virtualRow.index])
    : rowsForVirtualizer;
  const topPadding = virtualRows.length > 0 ? (virtualRows[0]?.start ?? 0) : 0;
  const bottomPadding =
    virtualRows.length > 0
      ? virtualizer.getTotalSize() -
        (virtualRows[virtualRows.length - 1]?.end ?? 0)
      : 0;

  return (
    <section
      className="table-panel"
      aria-label="Campaign performance exploration"
    >
      <div className="table-toolbar">
        <h2>Campaign performance explorer</h2>
        <label>
          Search campaign
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Type a campaign name"
          />
        </label>
      </div>

      {rowCount === 0 ? (
        <p className="empty-state">
          No campaigns match your current filters. Clear search to reset.
        </p>
      ) : (
        <div className="table-scroll" ref={tableRef}>
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const sorted = header.column.getIsSorted();
                    const getMarker = (sortState: boolean | "asc" | "desc") => {
                      if (sortState === "asc") return " ▲";
                      if (sortState === "desc") return " ▼";
                      return "";
                    };
                    const marker = getMarker(sorted);
                    return (
                      <th key={header.id}>
                        {header.isPlaceholder ? null : (
                          <button
                            type="button"
                            onClick={header.column.getToggleSortingHandler()}
                            className="sort-button"
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            {marker}
                          </button>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {hasVirtualRows && topPadding > 0 ? (
                <tr>
                  <td style={{ height: `${topPadding}px` }} colSpan={6} />
                </tr>
              ) : null}

              {renderedRows.map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}

              {hasVirtualRows && bottomPadding > 0 ? (
                <tr>
                  <td style={{ height: `${bottomPadding}px` }} colSpan={6} />
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
