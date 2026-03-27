import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
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
  const noOp = () => {};
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
      globalFilter: search,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: noOp,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const rowCount = table.getRowModel().rows.length;

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
        <div className="table-scroll">
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
              {table.getRowModel().rows.map((row) => (
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
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
