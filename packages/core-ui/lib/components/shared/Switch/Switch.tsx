import * as SwitchPrimitive from "@radix-ui/react-switch";
import classNames from "classnames";
import { useField } from "formik";
import { ComponentPropsWithRef, useEffect, useState } from "react";
import { FormControlProps } from "../Input/Input.jsx";

export default function Switch(props) {
  const [field, meta, helpers] = useField(props.name);

  const { value, initialValue, error, touched } = meta;
  const { setValue, setTouched } = helpers;

  function handleChange(value) {
    setValue(value);
    setTouched(true);
  }

  return (
    <SwitchRaw
      {...field}
      {...props}
      checked={Boolean(value)}
      onCheckedChange={handleChange}
      error={field.name && error && touched}
      dirty={touched && !error && value != initialValue}
    />
  );
}
type SwitchRawProps = FormControlProps &
  ComponentPropsWithRef<typeof SwitchPrimitive.Root>;

export function SwitchRaw({ error, dirty, ...props }: SwitchRawProps) {
  return (
    <SwitchPrimitive.Root
      className={classNames(
        "w-8 h-4 rounded-full bg-current",
        "transition-colors duration-150",
        "ring-2",
        {
          "ring-current": !dirty && !error,
          "ring-offset-2 ring-offset-current ring-red-500": error,
          "ring-offset-2 ring-offset-current ring-yellow-500": dirty && !error,
        },
        "radix-state-unchecked:text-gray-50 dark:radix-state-unchecked:text-gray-700",
        "radix-state-checked:text-blue-600",
        "disabled:opacity-30"
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={classNames(
          "block w-4 h-4 rounded-full shadow-sm bg-gray-50 dark:bg-gray-300",
          "radix-state-checked:ring-1 radix-state-checked:ring-blue-700",
          "transition-transform duration-150",
          "radix-state-checked:translate-x-4"
        )}
      />
    </SwitchPrimitive.Root>
  );
}
