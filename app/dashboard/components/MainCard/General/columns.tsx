import { Checkbox } from "@/components/UI/checkbox";
import { Business } from "@/types/businessTypes";
import { Expense } from "@/types/expensesTypes";
import { formattedDate } from "@/utils/dateFormat";
import { ColumnDef } from "@tanstack/react-table";

export const columns = (businesses: Business[]): ColumnDef<Expense>[] => {
  return [
    {
      id: "id",

      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "businessId",
      header: () => <div className="text-right ml-6">Business Name</div>,
      cell: ({ row }) => {
        const businessId = row.getValue("businessId") as string;
        const associatedBusiness = businesses.find(
          (business) => business.id === businessId
        );

        return (
          <div className="text-right font-medium ml-6">
            {associatedBusiness?.businessName || "N/A"}
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right ml-6">Amount</div>,
      cell: ({ row }) => (
        <div className="text-right font-medium">{row.getValue("amount")}</div>
      ),
    },
    {
      accessorKey: "category",
      header: () => <div className="text-right ml-6">Category</div>,
      cell: ({ row }) => (
        <div className="text-right font-medium ml-6">
          {row.getValue("category")}
        </div>
      ),
    },
    {
      accessorKey: "note",
      header: () => <div className="text-right ml-6">Note</div>,
      cell: ({ row }) => (
        <div className="text-right font-medium ml-6">
          {row.getValue("note")}
        </div>
      ),
    },
    {
      accessorKey: "created_at",
      header: () => <div className="text-right ml-6">Date</div>,
      cell: ({ row }) => (
        <div className="text-right font-medium ml-6">
          {formattedDate(row.getValue("created_at"))}
        </div>
      ),
    },
  ];
};
