import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FormControl, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  type?: "email" | "password" | "text";
  placeholder?: string;
  label: string;
}
const FormField = <T extends FieldValues>({
  name,
  control,
  placeholder,
  label,
  type = "text",
}: FormFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-lg text-[#D6E0FF]">{label}</FormLabel>
        <FormControl>
          <Input className="rounded-full h-12" type={type} placeholder={placeholder} {...field} />
        </FormControl>
      </FormItem>
    )}
  />
);

export default FormField;
