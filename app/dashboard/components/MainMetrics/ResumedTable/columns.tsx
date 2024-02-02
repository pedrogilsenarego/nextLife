import { Checkbox } from "@/components/UI/checkbox";
import { Business } from "@/types/businessTypes";
import { ByCategory, Expense } from "@/types/expensesTypes";
import { formattedDate } from "@/utils/dateFormat";
import { ColumnDef } from "@tanstack/react-table";

export const columns = (businesses: Business[]): ColumnDef<ByCategory>[] => {
  return [
    {
      accessorKey: "name",
      header: () => <div className="text-left ">Category</div>,
      cell: ({ row }) => (
        <div className="text-left font-medium ">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "value",
      header: () => <div className="text-right ml-6">Amount</div>,
      cell: ({ row }) => (
        <div className="text-right font-medium">{row.getValue("value")}</div>
      ),
    },
  ];
};
