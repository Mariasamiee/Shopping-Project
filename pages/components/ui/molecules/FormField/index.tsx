import { useField } from "formik";
import { Input, type InputProps } from "@/pages/components/ui/atoms/Input";

export interface FormFieldProps extends Omit<InputProps, "error" | "errorMessage"> {
    name: string
}

export function FormField({ name, label, ...rest }: FormFieldProps) {
    const [field, meta] = useField(name);
    const hasError = meta.touched && !!meta.error;

    return (
        <Input
            {...field}
            {...rest}
            label={label}
            error={hasError}
            errorMessage={hasError ? meta.error : undefined}
        />
    )
}