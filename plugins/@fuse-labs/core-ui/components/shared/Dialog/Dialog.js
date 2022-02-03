import * as DialogPrimitive from '@radix-ui/react-dialog'
import classNames from 'classnames'

function Dialog(props) { return <DialogPrimitive.Root {...props} />}
function DialogTrigger(props) { return <DialogPrimitive.Trigger {...props} />}

function DialogContent({
  title,
  description,
  className,
  showClose = false,
  ...props
}) {
  return <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className='fixed inset-0 bg-black bg-opacity-60'/>
    <DialogPrimitive.Content className={classNames(
      'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
      'w-[90vw] max-h-[85vh]',
      'bg-gray-800',
      'rounded-md',
      'p-3',
      className,
    )}>
      {title && <DialogPrimitive.Title>{title}</DialogPrimitive.Title>}
      {description && <DialogPrimitive.Description >{description}</DialogPrimitive.Description>}
      {props.children}
      {showClose && <DialogPrimitive.Close /> }
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
}

Dialog.Trigger = DialogTrigger
Dialog.Content = DialogContent
export default Dialog