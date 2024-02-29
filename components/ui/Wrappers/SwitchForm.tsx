import { Switch } from "../switch";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../form";
import { useEffect, useState } from "react";

type Props = {
  control: any;
  name: string;
  label?: string;
  description?: string;
  defaultValue?: boolean; // Define defaultValue prop
};

const SwitchForm = ({
  control,
  name,
  label,
  description,
  defaultValue,
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue} // Pass defaultValue to FormField
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between">
          <div className="space-y-0.5">
            <FormLabel>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
          <FormControl>
            {/* Set defaultValue for the Switch component */}
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default SwitchForm;
