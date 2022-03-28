import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import classNames from 'classnames'
import Widget from '../Widget/Widget'
import Button from '../Button/Button'

function Dialog({
  children,
  content,
  ...props
}) {
  return (
    <DialogRoot {...props}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className={props.className}>
        {content}
      </DialogContent>
    </DialogRoot>
  )
}

function DialogRoot(props) { return <DialogPrimitive.Root {...props} />}
function DialogTrigger(props) { return <DialogPrimitive.Trigger {...props} />}

function DialogContent({
  title,
  description,
  className,
  showClose = false,
  ...props
}) {
  return <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className='fixed inset-0 bg-black/70 z-40'/>
    <DialogPrimitive.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50'>

      <Widget className={classNames(
        'w-[90vw] max-h-[85vh]',
        'ring-1 ring-white/20',
        className
      )} title={(
        <>
          {title && (
            <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
          )}
          {showClose && (
            <DialogPrimitive.Close asChild>
              <Button squared rounded className='ml-auto'>
                <Cross2Icon />
              </Button>
            </DialogPrimitive.Close>
          )}
        </>
      )}>
        {description && <DialogPrimitive.Description >{description}</DialogPrimitive.Description>}
        {props.children}
      </Widget>
      
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
}

Dialog.Root = DialogRoot
Dialog.Trigger = DialogTrigger
Dialog.Content = DialogContent
export default Dialog