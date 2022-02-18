import { TrashIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { Button, Widget, Separator, Group } from "../../../core-ui";
import { useFileManagerContext } from "../FileManagerProvider";
import FileInfo from "./FileInfo";
import FilePreview from "./FilePreview";

export default function FileViewer({
  className
}) {
  
  const { file } = useFileManagerContext()

  if (!file) return null

  return <Widget full className={classNames(
    'h-full',
    className
  )}>

    <Group className="bg-black/60 px-1 h-9 !space-x-1">
      <div className="flex-1">
        <Button size="sm" type="ghost">
          Print
        </Button>
      </div>
      <Separator orientation="vertical"/>
      <Button squared type="ghost"><TrashIcon /></Button>
    </Group>

    <div className="p-3">
      <FilePreview file={file}/>

      <FileInfo file={file} />
    </div>

  </Widget>
}