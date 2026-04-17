import { useState, useMemo, type CSSProperties } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronsUpDownIcon,
  SearchIcon,
  MoreHorizontalIcon,
} from "lucide-react";

export interface Column<T> {
  key: string;
  header: string;
  accessorKey?: string;
  isSortable?: boolean;
  width?: string;
  style?: CSSProperties;
  headerClassName?: string;
  className?: string;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchKey?: string;
  searchPlaceholder?: string;
  pageSizeOptions?: number[];
  initialPageSize?: number;
  actions?: (row: T) => React.ReactNode;
  actionsWidth?: string;
  emptyMessage?: string;
  className?: string;
}

type SortDirection = "asc" | "desc" | null;

interface SortState {
  key: string | null;
  direction: SortDirection;
}

function DataTable<T extends Record<string, any>>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Search...",
  pageSizeOptions = [5, 10, 20, 50],
  initialPageSize = 10,
  actions,
  actionsWidth = "w-24",
  emptyMessage = "No results.",
  className,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sort, setSort] = useState<SortState>({ key: null, direction: null });

  const filteredData = useMemo(() => {
    let result = [...data];

    if (searchQuery.trim() && searchKey) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (row) =>
          String(row[searchKey] ?? "").toLowerCase().includes(query)
      );
    }

    if (sort.key && sort.direction) {
      result.sort((a, b) => {
        const aVal = a[sort.key!];
        const bVal = b[sort.key!];
        if (aVal == null) return 1;
        if (bVal == null) return -1;
        if (typeof aVal === "number" && typeof bVal === "number") {
          return sort.direction === "asc" ? aVal - bVal : bVal - aVal;
        }
        const comparison = String(aVal).localeCompare(String(bVal));
        return sort.direction === "asc" ? comparison : -comparison;
      });
    }

    return result;
  }, [data, searchQuery, searchKey, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedData = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, safePage, pageSize]);

  const handleSort = (key: string) => {
    setSort((prev) => {
      if (prev.key !== key) {
        return { key, direction: "asc" };
      }
      if (prev.direction === "asc") return { key, direction: "desc" };
      return { key: null, direction: null };
    });
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const getSortIcon = (key: string) => {
    if (sort.key !== key) {
      return <ChevronsUpDownIcon className="ml-1 size-3 text-muted-foreground" />;
    }
    if (sort.direction === "asc") {
      return <ChevronUpIcon className="ml-1 size-3" />;
    }
    if (sort.direction === "desc") {
      return <ChevronDownIcon className="ml-1 size-3" />;
    }
    return null;
  };

  const renderCell = (column: Column<T>, row: T) => {
    const value = column.accessorKey
      ? row[column.accessorKey]
      : row[column.key];
    if (column.render) {
      return column.render(value, row);
    }
    return value ?? "—";
  };

  const pageNumbers = useMemo(() => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (safePage > 3) pages.push("...");
      for (
        let i = Math.max(2, safePage - 1);
        i <= Math.min(totalPages - 1, safePage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (safePage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }, [totalPages, safePage]);

  if (data.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Search */}
      {searchKey && (
        <div className="relative mb-4">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-9"
          />
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className={col.headerClassName}
                  style={{ ...col.style, width: col.width }}
                >
                  {col.isSortable ? (
                    <button
                      onClick={() => handleSort(col.key)}
                      className="flex items-center gap-1 hover:underline"
                    >
                      {col.header}
                      {getSortIcon(col.key)}
                    </button>
                  ) : (
                    col.header
                  )}
                </TableHead>
              ))}
              {actions && <TableHead className={actionsWidth}>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="text-center text-muted-foreground py-8"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <TableRow key={row.id ?? rowIndex}>
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      className={col.className}
                      style={col.style}
                    >
                      {renderCell(col, row)}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell>{actions(row)}</TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
        {/* Page size selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows per page:</span>
          <div className="flex gap-1">
            {pageSizeOptions.map((size) => (
              <Button
                key={size}
                variant={pageSize === size ? "default" : "ghost"}
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => handlePageSizeChange(size)}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        {/* Page info */}
        <p className="text-sm text-muted-foreground">
          {filteredData.length === 0
            ? "No results"
            : `Showing ${(safePage - 1) * pageSize + 1}–${Math.min(safePage * pageSize, filteredData.length)} of ${filteredData.length}`}
        </p>

        {/* Page numbers */}
        <Pagination>
          <PaginationContent>
            {safePage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  text="Prev"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                />
              </PaginationItem>
            )}
            {pageNumbers.map((page, i) =>
              page === "..." ? (
                <PaginationItem key={`ellipsis-${i}`}>
                  <PaginationLink size="icon" className="pointer-events-none">
                    <MoreHorizontalIcon />
                  </PaginationLink>
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === safePage}
                    onClick={() => setCurrentPage(page as number)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            {safePage < totalPages && (
              <PaginationItem>
                <PaginationNext
                  text="Next"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default DataTable;
