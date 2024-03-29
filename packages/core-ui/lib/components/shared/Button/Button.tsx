import classNames from "classnames";
import React, { useMemo } from "react";
import Loader from "../Loader/Loader";
import styles from "./Button.module.scss";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  as?: React.ComponentClass<any>;
  squared?: boolean;
  rounded?: boolean;
  size?: "xs" | "sm";
  mode?: "normal" | "ghost" | "danger";
  type?: null | "submit";
  loading?: boolean;
  hideChildrenOnLoading?: boolean;
}

const Button = React.forwardRef<HTMLElement, Props>(
  (
    {
      as = "button",
      squared,
      rounded,
      size,
      mode = "normal",
      type,
      loading = false,
      hideChildrenOnLoading = false,
      ...props
    },
    ref
  ) => {
    let ButtonComponent = as;
    if (type == "submit") {
      ButtonComponent = "button";
    }

    return (
      <ButtonComponent
        ref={ref}
        className={classNames(
          "inline-flex select-none items-center justify-center text-sm font-medium space-x-2",
          styles.btn,
          {
            "btn-xs": size == "xs",
            "btn-sm": size == "sm",
          },
          {
            "btn-normal": mode == "normal",
            "btn-ghost": mode == "ghost",
            "btn-danger": mode == "danger",
          },
          {
            squared: squared,
            "rounded-md": !rounded,
            "rounded-full": rounded,
          },
          "focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 focus-visible:ring-opacity-75",
          {
            "select-none touch-none disabled": props.disabled,
          },
          "dark:disabled:opacity-40 dark:disabled:bg-gray-800",
          props.className
        )}
        {...props}
      >
        {loading && <Loader />}
        {((loading && !hideChildrenOnLoading) || !loading) && (
          <span>{props.children ?? props.title}</span>
        )}
      </ButtonComponent>
    );
  }
);
Button.displayName = "Button";
export default Button;
