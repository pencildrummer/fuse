import { Widget, Slider, Button, ReloadIcon } from "@fuse-labs/core-ui";

export default function FeedRateWidget() {
  return (
    <Widget title="Movement" version="0.1">
      <div className="flex flex-col items-stretch space-y-1">
        <div className="flex flex-row items-center justify-between text-sm">
          <span className="font-medium">Feedrate</span>
          <span className="font-mono text-xs">100%</span>
        </div>
        <div className="flex flex-row space-x-2">
          <Slider defaultValue={[50]} max={100} step={0.1} className="flex-1" />
          <Button squared>
            <ReloadIcon />
          </Button>
        </div>
      </div>
    </Widget>
  );
}
