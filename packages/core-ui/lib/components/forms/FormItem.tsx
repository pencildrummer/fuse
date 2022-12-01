import { Checkbox, Input, Select, Group, Label, Loader } from "../shared";
import { SelectOption } from "../shared/Select/Select";

type CommonFormItemSpec = {
  name: string;
  label?: string;
  defaultValue?: any;
  valueType?: "boolean" | "string" | "number"; // ? Or only use validation after
};

type OptionablesFormItemSpec =
  | { type: "select" | "radio"; options: SelectOption[] }
  | { type: "input" | "checkbox"; options?: never };

export type FormItemSpec = CommonFormItemSpec & OptionablesFormItemSpec;

type Props = {
  item: FormItemSpec;
  orientation?: "horizontal" | "vertical";
};

export default function FormItem({ item, orientation, ...props }: Props) {
  let fieldProps = {
    name: item.name,
    label: item.label ?? item.name,
    defaultValue: item.defaultValue,
    options: item.options,
    ...props,
  };

  // Get correct control component
  let ControlComponent;
  switch (item.type) {
    case "input":
      ControlComponent = Input;
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
      <Label htmlFor={fieldProps.name}>{fieldProps.label}</Label>
      <Group orientation="horizontal">
        {/* <Loader size="base" /> */}
        <ControlComponent {...fieldProps} />
      </Group>
    </Group>
  );
}
