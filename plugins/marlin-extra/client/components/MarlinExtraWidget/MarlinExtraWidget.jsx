import { SwitchRaw, Button, Widget, Cross2Icon } from "@fuse-labs/core-ui";

export default function MarlinExtraWidget() {
  return (
    <Widget title="Extra" version="0.1">
      <Button>
        <span className="mr-1">Stop motors</span>
        <Cross2Icon />
      </Button>

      <div className="flex flex-row space-x-2">
        <span>Fan status</span>
        <SwitchRaw />
      </div>
    </Widget>
  );
}
