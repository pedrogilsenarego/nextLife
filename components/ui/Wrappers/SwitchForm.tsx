import { Input, InputProps } from "../Input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../form";
import { Switch } from "../switch";

type Props = {
  control: any;
  name: string;
  label?: string;
  description?: string;
};

const SwitchForm = ({ control, name, label, description }: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between  p-3 ">
          <div className="space-y-0.5">
            <FormLabel>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
export default SwitchForm;
