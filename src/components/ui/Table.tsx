/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/utils/classNames";
import { LuArrowDownUp, LuArrowUpDown } from "react-icons/lu";

export interface Column<T> {
  key: keyof T | string;
  label: React.ReactNode;
  orderable?: boolean;
  render?: (row: T) => React.ReactNode;
  align?: "left" | "center" | "right";
  width?: string | number;
  headerClassName?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  title?: string;
  orderBy?: string;
  orderDirection?: "asc" | "desc";
  isLoading?: boolean;
  selectedRows?: Set<any>;
  onOrderChange?: (orderBy: string, orderDirection: "asc" | "desc") => void;
  onRowClick?: (row: T) => void;
  headerClassName?: string;
  trClassName?: string;
  getRowClassName?: (row: T) => string;
  scrollContainerHeight?: number;
  scrollContainerClassName?: string;
  cellClassName?: string;
  tableClassName?: string;
  theadClassName?: string;
  emptyRowClassName?: string;
}

const TITLE_OVERLAY = "/images/title_effect_overlay.png";

const tableBaseClassName = "bs-table";

const theadClassNameBase =
  "bg-[#f7f1e6]";

const thClassNameBase = cn(
  "h-[50px] border-0 bg-transparent px-1 py-0 text-center text-xs font-medium text-[#2c2416]",
  "whitespace-nowrap last:border-r-0",
);

const trClassNameBase = "bg-transparent transition-colors duration-300";

const tdClassNameBase = cn(
  "h-[50px] border-b border-[#e8dcc4] border-t border-[#e8dcc4]",
  "bg-white p-px text-center text-xs text-[#2c2416]",
  "transition-[background-color] duration-300",
);

const emptyCellClassNameBase = cn(
  "h-[50px]",
  "bg-white p-px py-8 text-center text-xs text-[#2c2416]/80",
);

const trHoverClassName = "hover:[&_td]:bg-[#fbf6ee]";

const trSelectedClassName = "[&_td]:bg-[#f7f1e6]";

const Table = <T,>({
  columns,
  data,
  title,
  orderBy,
  orderDirection,
  selectedRows,
  onOrderChange,
  isLoading,
  onRowClick,
  headerClassName,
  trClassName,
  getRowClassName,
  scrollContainerHeight,
  scrollContainerClassName,
  cellClassName,
  tableClassName,
  theadClassName,
  emptyRowClassName,
}: TableProps<T>) => {
  const handleOrder = (col: Column<T>) => {
    if (!col.orderable) return;
    const isAsc = orderBy === col.key && orderDirection === "asc";
    onOrderChange?.(col.key as string, isAsc ? "desc" : "asc");
  };

  const getAlignClass = (align?: "left" | "center" | "right") => {
    switch (align) {
      case "left":
        return "text-left";
      case "right":
        return "text-right";
      case "center":
      default:
        return "text-center";
    }
  };

  const tableEl = (
    <table
      className={cn(
        "w-full border-collapse table-fixed",
        tableBaseClassName,
        tableClassName,
      )}
    >
      <thead className={cn(theadClassNameBase, theadClassName)}>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key as string}
              className={cn(
                thClassNameBase,
                col.orderable ? "cursor-pointer" : "",
                col.headerClassName,
                headerClassName,
              )}
              style={
                col.width != null
                  ? { width: col.width, minWidth: col.width, maxWidth: col.width }
                  : undefined
              }
              onClick={() => (col.orderable ? handleOrder(col) : undefined)}
            >
              <span
                className={cn(
                  "flex items-center gap-1",
                  col.orderable ? "justify-between" : "justify-center",
                )}
              >
                {col.label}
                {col.orderable &&
                  (orderBy === col.key ? (
                    orderDirection === "asc" ? (
                      <LuArrowUpDown className="h-4 w-4.5 text-[#2c2416]/70 transition-transform duration-200" />
                    ) : (
                      <LuArrowDownUp className="h-4 w-4.5 text-[#2c2416]/70 transition-transform duration-200" />
                    )
                  ) : (
                    <LuArrowDownUp className="h-4 w-4.5 text-[#8a7344]" />
                  ))}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td
              colSpan={columns.length}
              className={cn(tdClassNameBase, cellClassName)}
            >
              로딩중 ...
            </td>
          </tr>
        ) : data === null || data?.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length}
              className={cn(emptyCellClassNameBase, emptyRowClassName)}
            >
              기록이 없습니다
            </td>
          </tr>
        ) : (
          data?.map((row, idx) => (
            <tr
              key={(row as any).id ?? idx}
              style={
                data.length >= 15 ? { contentVisibility: "auto" } : undefined
              }
              className={cn(
                trClassNameBase,
                onRowClick ? "cursor-pointer" : "",
                trHoverClassName,
                selectedRows?.has((row as any).id) ? trSelectedClassName : "",
                trClassName,
                getRowClassName?.(row),
              )}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col) => (
                <td
                  key={col.key as string}
                  className={cn(
                    tdClassNameBase,
                    getAlignClass(col.align),
                    cellClassName,
                  )}
                  style={
                    col.width != null
                      ? {
                        width: col.width,
                        minWidth: col.width,
                        maxWidth: col.width,
                      }
                      : undefined
                  }
                >
                  {col.render ? col.render(row) : (row as any)[col.key]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  const wrapper = (
    <div className={cn("min-w-0", title != null && "overflow-hidden")}>
      {title != null && (
        <div
          className="relative z-10 mb-px flex h-15.5 shrink-0 items-center bg-[#f7f1e6]"
          style={{
            backgroundImage: `url(${TITLE_OVERLAY})`,
            backgroundPosition: "left",
            backgroundRepeat: "no-repeat",
          }}
        >
          <span
            className="block min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold text-gray"
            style={{
              lineHeight: "62px",
              marginLeft: "20px",
              textShadow: "0 0 10px rgb(0 0 0 / 50%)",
            }}
          >
            {title}
          </span>
        </div>
      )}
      {scrollContainerHeight != null ? (
        <div
          className={cn(
            "scrollbar min-h-0 overflow-auto",
            scrollContainerClassName,
          )}
          style={{ maxHeight: scrollContainerHeight }}
        >
          {tableEl}
        </div>
      ) : (
        tableEl
      )}
    </div>
  );

  return wrapper;
};

export default Table;
