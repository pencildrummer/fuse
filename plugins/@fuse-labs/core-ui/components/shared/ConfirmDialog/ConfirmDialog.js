import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import classNames from 'classnames'
import Widget from '../../Widget/Widget'
import Button from '../Button/Button'
import Group from '../Group/Group'

function ConfirmDialog({
  children,
  content,
  ...props
}) {
  return (
    <ConfirmDialogRoot>
      <ConfirmDialogTrigger>
        {children}
      </ConfirmDialogTrigger>
      <ConfirmDialogContent {...props}>
        {content}
      </ConfirmDialogContent>
    </ConfirmDialogRoot>
  )
}

function ConfirmDialogRoot(props) { return <AlertDialogPrimitive.Root {...props} />}
function ConfirmDialogTrigger(props) { return <AlertDialogPrimitive.Trigger {...props} />}

function ConfirmDialogContent({
  title,
  description,
  confirmText = 'Confirm',
  onConfirm,
  className,
  ...props
}) {
  return <AlertDialogPrimitive.Portal>
    <AlertDialogPrimitive.Overlay className='fixed inset-0 bg-gray-900/50 backdrop-blur-sm'/>
    <AlertDialogPrimitive.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>

      <Widget className={classNames(
        'w-[50vw] max-h-[85vh]',
        className
      )} title={title}>
        {description && <AlertDialogPrimitive.Description >{description}</AlertDialogPrimitive.Description>}
        {props.children}

        <Group className='pt-3 !justify-end'>
          <AlertDialogPrimitive.Cancel asChild>
            <Button>
              Cancel
            </Button>
          </AlertDialogPrimitive.Cancel>
          <AlertDialogPrimitive.Action>
            <Button onClick={onConfirm}>
              {confirmText}
            </Button>
          </AlertDialogPrimitive.Action>
        </Group>

      </Widget>
      
    </AlertDialogPrimitive.Content>
  </AlertDialogPrimitive.Portal>
}

ConfirmDialog.Root = ConfirmDialogRoot
ConfirmDialog.Trigger = ConfirmDialogTrigger
ConfirmDialog.Content = ConfirmDialogContent
export default ConfirmDialog