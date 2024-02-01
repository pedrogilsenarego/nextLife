import { Business } from "@/types/businessTypes";
import { Expense } from "@/types/expensesTypes";
import { formattedDate } from "@/utils/dateFormat";
import { ColumnDef } from "@tanstack/react-table";

export type CustomColumnDef<T> = ColumnDef<T> & {
  accessorKey: keyof T;
};

export const columns = (businesses: Business[]): CustomColumnDef<Expense>[] => {
  return [
    {
      accessorKey: "businessId",
      header: () => <div className="text-right">Business Name</div>,
      cell: ({ row }) => {
        const businessId = row.getValue("businessId") as string;
        const associatedBusiness = businesses.find(
          (business) => business.id === businessId
        );

        return (
          <div className="text-right font-medium">
            {associatedBusiness?.businessName || "N/A"}
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => (
        <div className="text-right font-medium">{row.getValue("amount")}</div>
      ),
    },
    {
      accessorKey: "category",
      header: () => <div className="text-right">Category</div>,
      cell: ({ row }) => (
        <div className="text-right font-medium">{row.getValue("category")}</div>
      ),
    },
    {
      accessorKey: "note",
      header: () => <div className="text-right">Note</div>,
      cell: ({ row }) => (
        <div className="text-right font-medium">{row.getValue("note")}</div>
      ),
    },
    {
      accessorKey: "created_at",
      header: () => <div className="text-right">Date</div>,
      cell: ({ row }) => (
        <div className="text-right font-medium">
          {formattedDate(row.getValue("created_at"))}
        </div>
      ),
    },
  ];
};
