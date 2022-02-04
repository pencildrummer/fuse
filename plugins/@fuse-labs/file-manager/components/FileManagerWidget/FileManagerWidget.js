import { Widget } from "../../../core-ui";
import ScrollArea from "../../../core-ui/components/shared/ScrollArea/ScrollArea";
import DirectoryListing from "./DirectoryListing";

export default function FileManagerWidget({
  ...props
}) {
  return <Widget title="Files">
    <ScrollArea className="h-72">
      <DirectoryListing />
    </ScrollArea>
  </Widget>
}