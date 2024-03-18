import SlotCounter from "react-slot-counter";

import "./index.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

type Props = {
  cards: any;
};

const Balance = ({ cards }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [slotValue, setSlotValue] = useState<number>(0);
  const handleOpenInfo = () => {
    setOpen(true);
  };

  const totalIncomes = cards.reduce(
    (total: number, card: any) => total + card.income,
    0
  );

  const totalExpenses = cards.reduce(
    (total: number, card: any) => total + card.expense,
    0
  );

  const totalIVA = cards.reduce(
    (total: number, card: any) => total + card.iva,
    0
  );

  const totalIRS = cards.reduce(
    (total: number, card: any) => total + card.irs,
    0
  );
  const totalIRC = cards.reduce(
    (total: number, card: any) => total + card.irc,
    0
  );

  useEffect(() => {
    const slotVue = Math.floor(totalIncomes - totalExpenses);
    setSlotValue(slotVue);
  }, [totalExpenses, totalIncomes]);

  return (
    <>
      <div className="flex items-center gap-2" onClick={handleOpenInfo}>
        <div>
          <p style={{ color: "darkGrey" }} className="text-sm">
            Your balance
          </p>
          <div className="flex items-center">
            {slotValue}

            <SlotCounter
              separatorClassName="slot2"
              charClassName="slot2"
              value={slotValue}
            />

            <p
              style={{
                fontSize: "18px",
                lineHeight: "18px",
                fontWeight: "bold",
                marginTop: "2px",
              }}
            >
              €
            </p>
          </div>
        </div>
        <QuestionMarkCircledIcon
          style={{ height: "30px", width: "20px", color: "grey" }}
        />
      </div>

      <Dialog open={open} setOpen={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex ">Balance</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <div>
              <div className="border-b py-1">
                <p>Income: {Number(totalIncomes || 0).toFixed(1)}</p>
                <p>Expenses: {Number(totalExpenses || 0).toFixed(1)}</p>
              </div>
              <p className="text-lg text-primary font-bold mt-1">
                Total:{" "}
                {(
                  Number(totalIncomes || 0) - Number(totalExpenses || 0)
                ).toFixed(1)}
              </p>
            </div>
          </DialogDescription>
          <DialogHeader>
            <DialogTitle className="flex ">Anual metrics:</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <div>
              <p>Iva: {Number(totalIVA || 0).toFixed(1)}</p>
              <p>
                Irs: {Number(totalIRS || 0).toFixed(1)} / Irc:{" "}
                {Number(totalIRC || 0).toFixed(1)}
              </p>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Balance;
