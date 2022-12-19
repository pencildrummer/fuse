import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { useField, useFormikContext } from "formik";

type Props = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
  error?: string;
};

export function CheckboxRaw({ error, ...props }: Props) {
  return (
    <CheckboxPrimitive.Root
      {...props}
      className={classNames(
        "h-[24px] w-[24px]",
        "rounded-md",
        "bg-gray-900 border border-gray-600 text-gray-300",
        "focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600",
        "disabled:select-none disabled:touch-none disabled:opacity-60 disabled:bg-gray-800",
        {
          "border-red-600 ring-1 ring-red-600": error,
        },
        "transition-colors duration-150",
        props.className
      )}
    >
      <CheckboxPrimitive.Indicator
        className={classNames("flex items-center justify-center")}
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export default function Checkbox(props) {
  const { isSubmitting, status } = useFormikContext();
  const [field, meta, helpers] = useField(props);

  return (
    <CheckboxRaw
      {...field}
      {...props}
      disabled={props.disabled || isSubmitting || status == "disabled"}
      error={field.name && meta.error && meta.touched}
      dirty={meta.touched && !meta.error && meta.value != meta.initialValue}
    />
  );
}
