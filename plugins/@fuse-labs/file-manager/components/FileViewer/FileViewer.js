import classNames from "classnames";
import { Widget } from "../../../core-ui";
import { useFileManagerContext } from "../FileManagerProvider";
import FileInfo from "./FileInfo";
import FilePreview from "./FilePreview";

export default function FileViewer({
  className
}) {
  
  const { file } = useFileManagerContext()

  if (!file) return null

  return <Widget className={classNames(
    'h-full',
    className
  )}>

    <FilePreview file={file}/>

    <FileInfo file={file} />

  </Widget>
}