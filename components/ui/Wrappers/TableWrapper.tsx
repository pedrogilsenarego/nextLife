"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title?: string;
  onDelete?: (selectedRows: TData[]) => void;
  isDeleting?: boolean;
}

export function TableWrapper<TData, TValue>({
  columns,
  data,
  onDelete,
  isDeleting,
  title,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
        <div className="rounded-md border w-full">
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
        <div className="flex-1 text-sm text-muted-foreground ml-3 gap-2">
          {table.getSelectedRowModel().rows.length} row(s) selected.
        </div>
      </div>
    </>
  );
}
