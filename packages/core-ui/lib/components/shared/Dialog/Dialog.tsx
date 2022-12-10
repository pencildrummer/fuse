import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import classNames from "classnames";
import Widget from "../Widget/Widget";
import Button from "../Button/Button";

type Props = DialogPrimitive.DialogProps &
  React.PropsWithChildren<{ content: React.ReactNode; className: string }> &
  DialogContentProps;

function Dialog({ content, ...props }: Props) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Trigger asChild>{props.children}</Dialog.Trigger>
      <DialogContent title={props.title} className={props.className}>
        {content}
      </DialogContent>
    </Dialog.Root>
  );
}

type DialogContentProps = React.ComponentPropsWithoutRef<"div"> &
  React.PropsWithChildren<{
    title?: string;
    description?: string;
    showClose?: boolean;
  }>;

function DialogContent({
  title,
  description,
  showClose = false,
  ...props
}: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/70 z-40" />
      <DialogPrimitive.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <Widget
          className={classNames(
            "w-[90vw] max-h-[85vh]",
            "ring-1 ring-white/20",
            props.className
          )}
          title={
            <>
              {title && <DialogPrimitive.Title>{title}</DialogPrimitive.Title>}
              {showClose && (
                <DialogPrimitive.Close asChild>
                  <Button squared rounded className="ml-auto">
                    <Cross2Icon />
                  </Button>
                </DialogPrimitive.Close>
              )}
            </>
          }
        >
          {description && (
            <DialogPrimitive.Description>
              {description}
            </DialogPrimitive.Description>
          )}
          {props.children}
        </Widget>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

Dialog.Root = DialogPrimitive.Root;
Dialog.Trigger = DialogPrimitive.Trigger;
Dialog.Content = DialogContent;
export default Dialog;
