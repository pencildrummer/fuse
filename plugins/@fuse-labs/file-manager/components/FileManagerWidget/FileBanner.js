import classNames from "classnames";
import { Button, Separator } from "../../../core-ui";

export default function FileBanner({
  file,
  className,
  ...props
}) {
  return (
    <div className={classNames(
      'p-1 rounded-lg bg-gray-700',
      'flex flex-col space-y-1',
      className
      )}>
      <div className="flex flex-row space-x-3 px-1">
        <div className="text-sm font-semibold">
          {file.name}.{file.ext}
        </div>
      </div>
      <Separator />
      <div className="flex flex-row">
        <Button size="sm">Print</Button>
        <Button size="sm">Action 2</Button>
        <Button size="sm">Action 3</Button>
      </div>
    </div>
  )
}