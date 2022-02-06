import { DownloadIcon, Share2Icon, TrashIcon } from "@radix-ui/react-icons";
import ContextMenu from "plugins/@fuse-labs/core-ui/components/shared/ContextMenu/ContextMenu";

export default function FileManagerWidgetContextMenu(props) {
  return (
    <ContextMenu items={[
      {
        label: 'Save',
        icon: DownloadIcon,
        action: _ => { console.log('Save file') }
      },
      {
        label: 'Delete',
        icon: TrashIcon,
        detail: '⌫'
      },
      {
        label: 'Share',
        icon: Share2Icon,
        items: [
          {
            label: 'Copy'
          },
          {
            label: 'Move'
          }
        ]
      },
      '-',
      {
        label: 'Print'
      }
    ]}>{props.children}</ContextMenu>
  )
}