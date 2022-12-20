import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import classNames from "classnames";
import Widget from "../Widget/Widget";
import Button from "../Button/Button";
import Group from "../Group/Group";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ComponentProps } from "react";

type AlertDialogProps = AlertDialogPrimitive.AlertDialogProps &
  AlertDialogContentProps & {
    content: React.ReactNode;
  };

function AlertDialog({
  children,
  content,
  open,
  onOpenChange,
  ...props
}: AlertDialogProps) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Trigger>{children}</AlertDialog.Trigger>
      <AlertDialog.Content {...props}>{content}</AlertDialog.Content>
    </AlertDialog.Root>
  );
}

type AlertDialogContentProps = React.ComponentPropsWithRef<
  typeof AlertDialogPrimitive.Content
> & {
  description?: string;
  confirmMode?: ComponentProps<typeof Button>["mode"];
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  showCancel?: boolean;
};
function AlertDialogContent({
  title,
  description,
  confirmMode,
  confirmText = "Ok",
  cancelText = "Cancel",
  onConfirm,
  className,
  showCancel,
  ...props
}: AlertDialogContentProps) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className="fixed inset-0 bg-black/70 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out" />
      <AlertDialogPrimitive.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 data-[state=open]:animate-show data-[state=closed]:animate-hide transform-gpu">
        <Widget
          className={classNames(
            "w-[90vw] sm:max-w-lg max-h-[85vh]",
            "ring-1 ring-white/20",
            className
          )}
          title={
            <>
              {title && (
                <AlertDialogPrimitive.Title>{title}</AlertDialogPrimitive.Title>
              )}
              {showCancel && (
                <AlertDialogPrimitive.Cancel asChild>
                  <Button squared rounded className="ml-auto">
                    <Cross2Icon />
                  </Button>
                </AlertDialogPrimitive.Cancel>
              )}
            </>
          }
        >
          {description && (
            <AlertDialogPrimitive.Description>
              {description}
            </AlertDialogPrimitive.Description>
          )}
          {props.children}

          <Group className="pt-3 !justify-end">
            <AlertDialogPrimitive.Cancel asChild>
              <Button>{cancelText}</Button>
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action>
              <Button onClick={onConfirm} mode={confirmMode}>
                {confirmText}
              </Button>
            </AlertDialogPrimitive.Action>
          </Group>
        </Widget>
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Portal>
  );
}

AlertDialog.Root = AlertDialogPrimitive.Root;
AlertDialog.Trigger = AlertDialogPrimitive.Trigger;
AlertDialog.Content = AlertDialogContent;
export default AlertDialog;
