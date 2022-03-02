import { DownloadIcon, Share2Icon, TrashIcon } from "@radix-ui/react-icons";
import ContextMenu from "@fuse-labs/core-ui/components/shared/ContextMenu/ContextMenu";

export default function FileManagerWidgetContextMenu({
  onSave,
  onDelete,
  onPrint,
  ...props
}) {
  return (
    <ContextMenu modal={false} items={[
      {
        label: 'Save',
        icon: DownloadIcon,
        action: onSave ? _ => { console.log('Save file') } : false
      },
      {
        label: 'Delete',
        icon: TrashIcon,
        detail: '⌫',
        action: onDelete ? _ => onDelete() : false
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
        label: 'Print',
        action: onPrint ? _ => onPrint() : false
      }
    ]}>
      {props.children}
    </ContextMenu>
  )
}