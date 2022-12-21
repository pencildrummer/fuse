import { TrashIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { Button, Widget, Separator, Group } from "@fuse-labs/core-ui";
import { useFileManagerContext } from "../FileManagerProvider/FileManagerProvider.jsx";
import FileInfo from "./FileInfo.jsx";
import FilePreview from "./FilePreview.jsx";

export default function FileViewer({ className }) {
  const { file } = useFileManagerContext();

  if (!file) return null;

  return (
    <Widget full className={classNames("h-full", className)}>
      <Group className="bg-black/60 px-1 h-9 !space-x-1">
        <div className="flex-1">
          <Button size="sm" mode="ghost">
            Print
          </Button>
        </div>
        <Separator orientation="vertical" />
        <Button squared mode="ghost">
          <TrashIcon />
        </Button>
      </Group>

      <div className="p-3 space-y-3">
        <FilePreview file={file} />

        <FileInfo file={file} />
      </div>
    </Widget>
  );
}
