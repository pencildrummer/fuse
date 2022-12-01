import { Checkbox, Input, Select, Group, Label, Loader } from "../shared";
import { SelectOption } from "../shared/Select/Select";
import { useIntl } from "react-intl";

type CommonFormItemSpec = {
  name: string;
  label?: string;
};

type OptionablesFormItemSpec =
  | {
      type: "select" | "radio";
      options: SelectOption[];
      defaultValue?: string;
      value?: string;
    }
  | {
      type: "text";
      options: never;
      defaultValue?: string;
      value?: string;
    }
  | {
      type: "checkbox";
      style: "checkbox" | "switch";
      options?: never;
      defaultValue?: boolean;
      value?: boolean;
    }
  | {
      type: "number";
      options?: never;
      defaultValue?: number;
      value?: number;
    };

export type FormItemSpec = CommonFormItemSpec & OptionablesFormItemSpec;

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
      <Label htmlFor={fieldProps.name}>
        {formatMessage({ id: fieldProps.label })}
      </Label>
      <Group orientation="horizontal">
        {/* <Loader size="base" /> */}
        <ControlComponent {...fieldProps} />
      </Group>
    </Group>
  );
}
