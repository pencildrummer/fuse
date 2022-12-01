import * as SelectPrimitive from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import classNames from "classnames";
import { useField } from "formik";
import React, { useEffect, useRef, useMemo, useState } from "react";

interface SelectItemProps extends SelectPrimitive.SelectItemProps {}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  (props, ref) => {
    return (
      <SelectPrimitive.Item
        ref={ref}
        {...props}
        className={classNames(
          "flex flex-row space-x-2 items-center justify-between",
          "text-sm font-medium",
          "py-0.5 px-1.5",
          "w-full",
          "rounded-sm",
          "transition-colors duration-75",
          "focus:outline-none border-0",
          "cursor-default",
          "text-gray-800 dark:text-gray-300",
          "focus:text-gray-50 focus:bg-blue-600",
          "group"
        )}
      >
        <SelectPrimitive.ItemText className="flex-1">
          {props.children}
        </SelectPrimitive.ItemText>
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="text-gray-800 bg-gray-50 rounded-full" />
        </SelectPrimitive.ItemIndicator>
      </SelectPrimitive.Item>
    );
  }
);

export type SelectOption = {
  label: string;
  value: string;
};

type SelectRawProps = React.PropsWithChildren<{
  options: SelectOption[] | string[];
  placeholder?: React.ReactNode;
  // trigger: React.ReactNode;
  error?: string;
  // className;
  defaultValue?;
  onChange?;
  onBlur?;
  onOpenChange?;
  disabled?: boolean;
}>;

export function SelectRaw({
  placeholder,
  // trigger: TriggerComponent,
  error,
  options,
  defaultValue,
  onChange,
  onBlur,
  onOpenChange,
  ...props
}: SelectRawProps) {
  return (
    <div>
      <SelectPrimitive.Root>
        <SelectPrimitive.Trigger
          className={classNames(
            "w-full min-w-[180px]",
            "flex flex-row items-center justify-between space-x-2",
            "text-xs",
            "px-1.5 h-[26px]",
            "leading-none",
            "rounded-md",
            "select-none touch-none",
            "font-mono font-medium",
            "bg-gray-900 border border-gray-600 text-gray-300",
            "focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600",
            "disabled:select-none disabled:touch-none disabled:opacity-60 disabled:bg-gray-800",
            {
              "border-red-600 ring-1 ring-red-600": error,
            }
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon>
            <ChevronDownIcon />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={classNames(
              "w-full",
              "flex flex-col items-start",
              "bg-gray-300 dark:bg-gray-800",
              "shadow-md",
              "p-1",
              "rounded-md"
            )}
          >
            <SelectPrimitive.ScrollUpButton className="SelectScrollButton">
              <ChevronUpIcon />
            </SelectPrimitive.ScrollUpButton>
            <SelectPrimitive.Viewport className="w-full">
              {options?.map((option: string | SelectOption, i: number) => (
                <SelectItem
                  key={`option-${i}`}
                  value={(option as SelectOption).value || (option as string)}
                >
                  {(option as SelectOption).label ??
                    (option as SelectOption).value ??
                    (option as string)}
                </SelectItem>
              ))}
            </SelectPrimitive.Viewport>
            <SelectPrimitive.ScrollDownButton className="SelectScrollButton">
              <ChevronDownIcon />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  );
}

export default function Select(props) {
  const [field, meta, helpers] = useField(props.name);
  const { initialValue } = meta;
  const { setValue, setTouched } = helpers;

  return (
    <SelectRaw
      error={meta.touched && meta.error}
      defaultValue={initialValue}
      onChange={setValue}
      onOpenChange={(open) => open && setTouched(true)}
      onBlur={(_) => field.onBlur(field.name)}
      {...props}
    />
  );
}
