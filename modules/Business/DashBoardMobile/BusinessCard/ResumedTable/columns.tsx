import { Business } from "@/types/businessTypes";
import { ByCategory, Expense } from "@/types/expensesTypes";
import { ColumnDef } from "@tanstack/react-table";

export const columns = (businesses: Business[]): ColumnDef<ByCategory>[] => {
  return [
    {
      accessorKey: "name",
      header: () => <div className="text-left ">Expenses</div>,
      cell: ({ row }) => (
        <div className="text-left font-medium ">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "value",
      header: () => <div className="text-right ml-6"></div>,
      cell: ({ row }) => (
        <div className="text-right font-medium">{row.getValue("value")}</div>
      ),
    },
  ];
};
