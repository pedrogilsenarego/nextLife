"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import { Button } from "../button";
import { H3 } from "../h3";
import { DataTablePagination } from "../table-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title?: string;
  pagination?: boolean;
  onDelete?: (selectedRows: TData[]) => void;
  isDeleting?: boolean;
}

export function TableWrapper<TData, TValue>({
  columns,
  data,
  onDelete,
  pagination,
  isDeleting,

  title,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleDeleteRows = () => {
    if (onDelete) {
      const selectedRows = table
        .getSelectedRowModel()
        .rows.map((item) => item.original);
      onDelete(selectedRows);
    }
  };
  useEffect(() => {
    if (!isDeleting) {
      table.resetRowSelection();
    }
  }, [isDeleting]);

  return (
    <>
      <div className="flex gap-2 flex-col">
        <div className="flex gap-2">
          {title && <H3>{title}</H3>}
          {table.getSelectedRowModel().rows.length > 0 && onDelete && (
            <Button
              size={"sm"}
              isLoading={isDeleting}
              onClick={handleDeleteRows}
            >
              Delete
            </Button>
          )}
        </div>
        <div>
          <div className="rounded-md border w-full shadow-md">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="mt-2">
            {pagination && <DataTablePagination table={table} />}
          </div>
        </div>
      </div>
    </>
  );
}
