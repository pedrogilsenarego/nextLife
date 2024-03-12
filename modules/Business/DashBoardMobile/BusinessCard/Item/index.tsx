import { deleteExpenses } from "@/clientActions/expensesActions";
import { Card } from "@/components/ui/card";
import { TIMOUT_FOR_REFETCH } from "@/constants/network";
import useExpenses from "@/hooks/useExpenses";
import useMonthExpenses from "@/hooks/useMonthExpenses";
import { Expense } from "@/types/expensesTypes";
import { CrossCircledIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";

type Props = {
  expense: any;
};

const Item = ({ expense }: Props) => {
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const { expensesQuery } = useExpenses();
  const { expensesQuery: monthExpensesQuery } = useMonthExpenses();
  const dateFormatter = (date: Date) => {
    return moment(date).format("DD MMM HH:MM");
  };
  const { mutate: deleteExpensesMutation, isPending } = useMutation({
    mutationFn: deleteExpenses,
    onError: (error: any) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {
      setTimeout(() => {
        expensesQuery.refetch();
        monthExpensesQuery.refetch();
      }, TIMOUT_FOR_REFETCH);
    },
    onSettled: () => {
      setIsDeleteVisible(false);
    },
  });

  const handleDeleteExpenses = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    deleteExpensesMutation([expense]);
  };
  return (
    <div
      style={{ transition: "all ease-in-out 1s" }}
      className="flex w-full"
      onClick={() => setIsDeleteVisible(!isDeleteVisible)}
    >
      <Card
        className="p-2 rounded-none shadow-md flex justify-between w-full"
        style={{ transition: "all ease-in-out 1s" }}
      >
        <div>
          <p className="capitalize">{expense.category}</p>
          <p className="text-xs">{expense.note}</p>
        </div>
        <div>
          <p className="font-bold text-right">{expense.amount}€</p>
          <p className="text-xs">{dateFormatter(expense.created_at)}</p>
        </div>
      </Card>
      {isDeleteVisible && (
        <div
          style={{ backgroundColor: "orangered" }}
          className="flex items-center px-2"
          onClick={(e) => handleDeleteExpenses(e)}
        >
          {isPending ? (
            <ReloadIcon
              style={{ width: "30px", height: "30px" }}
              color="white"
              className="animate-spin"
            />
          ) : (
            <CrossCircledIcon
              color="white"
              style={{ width: "30px", height: "30px" }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Item;
