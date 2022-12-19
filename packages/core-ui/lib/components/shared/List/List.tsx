import classNames from "classnames";
import React, {
  ComponentPropsWithoutRef,
  PropsWithChildren,
  useContext,
} from "react";

type ListContextType = {
  size?: ListProps["size"];
  divide?: boolean;
};
const ListContext = React.createContext<ListContextType | null>(null);

type ListProps = {
  size?: "normal" | "compact";
  divide?: boolean;
} & React.ComponentPropsWithoutRef<"ul">;

function List({ size = "normal", divide = true, ...props }: ListProps) {
  return (
    <ul
      className={classNames(
        "flex flex-col",
        {
          "divide-y divide-gray-700": divide,
        },
        props.className
      )}
    >
      <ListContext.Provider
        value={{
          size,
          divide,
        }}
      >
        {props.children}
      </ListContext.Provider>
    </ul>
  );
}

function Item({ className, ...props }: ComponentPropsWithoutRef<"li">) {
  const { size } = useContext(ListContext);

  return (
    <li
      className={classNames(
        "flex flex-row items-center",
        {
          "space-x-3 py-2": size == "normal",
          "space-x-1 py-1": size == "compact",
        },
        className
      )}
      {...props}
    />
  );
}

List.Item = Item;
export default List;
