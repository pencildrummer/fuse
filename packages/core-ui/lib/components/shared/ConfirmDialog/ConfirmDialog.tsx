import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import classNames from "classnames";
import Widget from "../Widget/Widget";
import Button from "../Button/Button";
import Group from "../Group/Group";

type ConfirmDialogProps = ConfirmDialogRootProps &
  ConfirmDialogTriggerProps &
  ConfirmDialogContentProps & {
    content: React.ReactNode;
  };

function ConfirmDialog({
  children,
  content,
  open,
  onOpenChange,
  ...props
}: ConfirmDialogProps) {
  return (
    <ConfirmDialogRoot open={open} onOpenChange={onOpenChange}>
      <ConfirmDialogTrigger>{children}</ConfirmDialogTrigger>
      <ConfirmDialogContent {...props}>{content}</ConfirmDialogContent>
    </ConfirmDialogRoot>
  );
}

type ConfirmDialogRootProps = React.ComponentPropsWithRef<
  typeof AlertDialogPrimitive.Root
>;
function ConfirmDialogRoot(props: ConfirmDialogRootProps) {
  return <AlertDialogPrimitive.Root {...props} />;
}

type ConfirmDialogTriggerProps = React.ComponentPropsWithRef<
  typeof AlertDialogPrimitive.Trigger
>;
function ConfirmDialogTrigger(props: ConfirmDialogTriggerProps) {
  return <AlertDialogPrimitive.Trigger {...props} />;
}

type ConfirmDialogContentProps = React.ComponentPropsWithRef<
  typeof AlertDialogPrimitive.Content
> & { description?: string; confirmText?: string; onConfirm: () => void };
function ConfirmDialogContent({
  title,
  description,
  confirmText = "Confirm",
  onConfirm,
  className,
  ...props
}: ConfirmDialogContentProps) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
      <AlertDialogPrimitive.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Widget
          className={classNames("w-[50vw] max-h-[85vh]", className)}
          title={title}
        >
          {description && (
            <AlertDialogPrimitive.Description>
              {description}
            </AlertDialogPrimitive.Description>
          )}
          {props.children}

          <Group className="pt-3 !justify-end">
            <AlertDialogPrimitive.Cancel asChild>
              <Button>Cancel</Button>
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action>
              <Button onClick={onConfirm}>{confirmText}</Button>
            </AlertDialogPrimitive.Action>
          </Group>
        </Widget>
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Portal>
  );
}

ConfirmDialog.Root = ConfirmDialogRoot;
ConfirmDialog.Trigger = ConfirmDialogTrigger;
ConfirmDialog.Content = ConfirmDialogContent;
export default ConfirmDialog;
