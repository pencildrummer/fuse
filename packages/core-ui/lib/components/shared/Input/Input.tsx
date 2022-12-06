import { Label } from "@radix-ui/react-label";
import classNames from "classnames";
import { useField } from "formik";
import React, { ComponentPropsWithoutRef } from "react";
import styles from "./Input.module.scss";

export type FormControlProps<T = {}> = {
  error?: any;
  dirty?: boolean;
} & T;

type Props = FormControlProps<{
  detailContent?: any;
}> &
  ComponentPropsWithoutRef<"input"> &
  Required<{ name: string }>;

export default function Input(props) {
  const [field, meta, helpers] = useField(props);

  return (
    <InputRaw
      {...field}
      {...props}
      error={field.name && meta.error && meta.touched}
      dirty={meta.touched && !meta.error && meta.value != meta.initialValue}
    />
  );
}

// Raw input to be use outside Formik forms
export function InputRaw({ error, dirty, detailContent, ...props }: Props) {
  // Return barebone input if hidden type, no need for div or other wrappers
  // Add hidden attribute, to allow Tailwindcss to work also
  if (props.type == "hidden") {
    return <input {...props} hidden />;
  }

  function validatePasteValue(e: React.ClipboardEvent<HTMLInputElement>) {
    // Validate pasted data when using input as numeric input
    if (props.type == "number") {
      // Get data from clipboard
      let data = e.clipboardData.getData("text");
      // Try parse it as int (TODO: Validate for float?), if NaN prevent
      if (isNaN(parseInt(data))) {
        console.warn(`Pasted text is not a number. Text: "${data}"`);
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }
  }

  function validateKeyDownValue(e: React.KeyboardEvent<HTMLInputElement>) {
    // Validate key pressed when using input as numeric input
    if (props.type == "number") {
      // TODO: Validate minus sign, and check at which position will be inserted and validate
      // Return early if backspace or combination of ctrl or meta key (command on Mac)
      if (e.key == "Backspace" || e.ctrlKey || e.metaKey) return true;
      // If key pressed is not a number prevent
      if (isNaN(parseInt(e.key))) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }
  }

  return (
    <div
      className={classNames(
        "flex flex-row items-center",
        "rounded-md overflow-hidden flex-shrink-0",
        "h-[26px]",
        "font-mono font-medium",
        "bg-gray-900 border border-gray-600 text-gray-300",
        "focus-within:border-blue-600 focus-within:outline-none focus-within:ring-1 focus-within:ring-blue-600",
        {
          "border-red-600 ring-1 ring-red-600": error,
          "border-yellow-500 ring-1 ring-yellow-500": !error && dirty,
        },
        {
          [styles.inputNumberFix]: props.type == "number",
        },
        props.className
      )}
    >
      <input
        {...props}
        className={classNames(
          "text-xs px-1.5",
          "h-full min-w-0 w-full",
          "ring-0 outline-none",
          "bg-gray-900 text-gray-300",
          "disabled:select-none disabled:touch-none disabled:opacity-60 disabled:bg-gray-800",
          "transition-colors duration-150"
        )}
        style={{
          textAlign: "inherit",
        }}
        onPaste={validatePasteValue}
        onKeyDown={validateKeyDownValue}
        onWheel={(e) =>
          // To disabled wheel inc/dec when number typs
          props.type == "number" && (e.target as HTMLInputElement).blur()
        }
      />
      {detailContent && (
        <Label
          htmlFor={props.id}
          className="flex-none select-none cursor-default text-xs bg-white/10 border-l border-gray-600 self-stretch flex items-center px-1"
        >
          {detailContent}
        </Label>
      )}
    </div>
  );
}
