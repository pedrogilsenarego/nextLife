import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Button } from "../button";
import { Calendar } from "../calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

type Props = {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
};

const DatePickerForm = ({ control, name, label, description }: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date < new Date("1900-01-01")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DatePickerForm;
