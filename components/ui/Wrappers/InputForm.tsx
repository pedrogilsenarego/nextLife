import { Input, InputProps } from "../Input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";

type Props = {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
} & InputProps;

const InputForm = ({
  control,
  name,
  label,
  placeholder,
  type,
  description,
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input placeholder={placeholder} {...field} type={type} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default InputForm;
