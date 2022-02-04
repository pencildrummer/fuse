import { Cross2Icon } from "@radix-ui/react-icons";
import { Button, Widget, Switch } from "../../../core-ui";

export default function MarlinMiscWidget() {
  return <Widget title="Extra" version="0.1">

    <Button>
      <span className="mr-1">Stop motors</span>
      <Cross2Icon />
    </Button>

    <div className="flex flex-row space-x-2">
      <span>Fan status</span>
      <Switch />
    </div>
  </Widget>
}