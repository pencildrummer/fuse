import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { useIntl } from "react-intl";
import { Checkbox, Group, Input, Label, Select, Tooltip } from "../shared";
import { SelectOption } from "../shared/Select/Select";

type FormItemControlSpec = {
  name: string;
  label?: string;
  detail?: string;
  defaultValue?: string;
  value?: string;
  fields?: never;
  hint?: string;
};

type FormItemGroupSpec = {
  type: "group";
  name?: never;
  label?: string;
  detail?: never;
  fields: FormItemSpec[];
  options?: never;
  defaultValue?: never;
  value?: never;
  description?: string;
  notes?: string;
};

export type FormItemSpec =
  | ({
      type: "select" | "radio";
      options: SelectOption[];
    } & FormItemControlSpec)
  | ({
      type: "text";
      options?: never;
    } & FormItemControlSpec)
  | ({
      type: "checkbox";
      style: "checkbox" | "switch";
      options?: never;
    } & FormItemControlSpec)
  | ({
      type: "number";
      options?: never;
    } & FormItemControlSpec)
  | FormItemGroupSpec;

// -

type Props = {
  item: FormItemSpec;
  orientation?: "horizontal" | "vertical";
};

export default function FormItem({ item, orientation, ...props }: Props) {
  const { formatMessage } = useIntl();

  // Prepare field props
  let fieldProps = {
    name: item.name,
    label: item.label ?? item.name,
    detailContent: item.detail,
    defaultValue: item.defaultValue,
    options: item.options,
    type: null,
    ...props,
  };

  // Get correct control component
  let ControlComponent;
  switch (item.type) {
    case "text":
    case "number":
      ControlComponent = Input;
      fieldProps = { ...fieldProps, type: item.type };
      break;
    case "select":
      ControlComponent = Select;
      break;
    case "checkbox":
      ControlComponent = Checkbox;
      break;
    default:
      throw new Error(`Not yet implemented control of type "${item.type}`);
  }

  return (
    <Group orientation={orientation}>
      <div className="flex-1 flex flex-row space-x-1 items-center truncate">
        <Label htmlFor={fieldProps.name}>
          {formatMessage({
            id: fieldProps.label,
            defaultMessage: fieldProps.label,
          })}
        </Label>
        {item.hint && (
          <Tooltip size="hint" content={item.hint}>
            <QuestionMarkCircledIcon className="w-3.5 h-3.5 opacity-50 flex-none" />
          </Tooltip>
        )}
      </div>
      {/* <Group orientation="horizontal"> */}
      {/* <Loader size="base" /> */}
      <ControlComponent {...fieldProps} className="max-w-[50%]" />
      {/* </Group> */}
    </Group>
  );
}
