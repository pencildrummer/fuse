import { Widget } from "@fuse-labs/core-ui";
import * as AspectRatio from '@radix-ui/react-aspect-ratio';

export default function MarlinGCodeViewerWidget() {
  return <Widget title="GCode Viewer" version="0.1">
    <AspectRatio.Root ratio={4/3} className="rounded-sm bg-gray-500">
      
    </AspectRatio.Root>
  </Widget>
}