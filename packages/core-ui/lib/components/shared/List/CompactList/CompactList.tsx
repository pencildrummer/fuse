import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import classNames, { Value } from "classnames";
import List from "../List";
import React, { useContext, useEffect, useMemo, useState } from "react";

function isPrimitive(val) {
  if (val === null) return true;
  return !(typeof val == "object" || typeof val == "function");
}

type CompactListItemProps = React.ComponentPropsWithRef<typeof List.Item>;

function CompactListItem({
  item,
  selected,
  selectable = true,
  className,
  ...props
}: CompactListItemProps) {
  const content = useMemo(() => {
    if (props.children) return props.children;
    if (typeof item == "object") {
      return JSON.stringify(item);
    } else if (typeof item == "function") {
      return item(item);
    } else {
      return item;
    }
  }, [item, props.children]);

  return (
    <List.Item
      {...props}
      className={classNames(
        "px-0.5 transition-colors duration-150",
        "select-none",
        "rounded-md",
        "font-semibold",
        {
          "cursor-pointer": selectable,
          "hover:bg-white hover:bg-opacity-5": !selected,
          "bg-blue-700 text-gray-50": selected,
        },
        className
      )}
    >
      {content}
    </List.Item>
  );
}

function GroupCompactListItem({ items, itemComponent, ...props }) {
  const { selectedItemKey } = React.useContext(ListSelectionContext);

  const [open, setOpen] = useState(false);

  const showGroupSelection = useMemo(() => {
    let groupKey = props["data-group-key"];
    return !open && selectedItemKey?.startsWith(groupKey);
  }, [open, props, selectedItemKey]);

  return (
    <>
      <List.Item
        {...props}
        className={classNames(
          "px-0.5 transition-colors duration-150",
          "select-none",
          "rounded-md",
          "font-semibold",
          {
            "cursor-pointer": props.selectable,
            "hover:bg-white hover:bg-opacity-5": !props.selected,
            "bg-blue-700 text-gray-50": props.selected,
          },
          props.className
        )}
        onClick={(_) => setOpen((o) => !o)}
      >
        {open ? (
          <ChevronDownIcon className="text-gray-200" />
        ) : (
          <ChevronRightIcon className="text-gray-200" />
        )}
        <div className="flex-1">{props.children}</div>
        {showGroupSelection && (
          <div className="w-[15px] h-[15px] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-blue-700 self-center" />
          </div>
        )}
      </List.Item>

      {open && (
        <div className="pl-3">
          <CompactListRoot
            data-group-key={props["data-group-key"]}
            data-internal-key={props["data-internal-key"]}
            items={items}
            itemComponent={itemComponent}
          />
        </div>
      )}
    </>
  );
}

type CompactListRootProps = React.PropsWithChildren<{
  items: any;
  itemComponent?: any;
  itemDisplayTransform?: (text: string) => string;
  groupDisplayTransform?: (text: string, value: any) => string;
  isGroupTransform?: (key: string, value: any) => boolean;
  hideEmptyGroups?: boolean;
}> &
  React.ComponentPropsWithRef<typeof List>;

function CompactListRoot({
  items,
  itemComponent: ItemComponent = CompactListItem,
  itemDisplayTransform,
  groupDisplayTransform,
  isGroupTransform,
  hideEmptyGroups = false,
  ...props
}: CompactListRootProps) {
  const {
    selectedItemKey,
    selectedItemInternalKey,
    handleSelect,
    maxDepth,
    keyTransform,
    itemProps,
  } = React.useContext(ListSelectionContext);

  useEffect(() => {
    // Trigger automatically handleSelect when items prop is updated
    if (selectedItemInternalKey) {
      // Retrieve value from key
      let value = selectedItemInternalKey
        .split(".")
        .reduce((obj, key) => (obj ? obj[key] : undefined), items);
      if (value) handleSelect(selectedItemKey, value, selectedItemInternalKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const contents = (items) => {
    if (!items) return null;

    if (typeof items == "object") {
      // Group by keys listing only keys
      return Object.keys(items).map((key) => {
        let currentDepth = props["data-group-key"]?.split(".").length || 0;

        let value = items[key];

        let isGroup =
          isGroupTransform?.(key, value) ||
          (!isPrimitive(value) && currentDepth < maxDepth);

        let itemKey = keyTransform?.(key, value, isGroup) || key;

        let dataItemKey = [props["data-group-key"], itemKey]
          .filter(Boolean)
          .join(".");

        // Generate internal key, replace key dots into dashes to avoid conflict when splitting key path
        let dataInternalKey = [
          props["data-internal-key"],
          key.replace(".", "-"),
        ]
          .filter(Boolean)
          .join(".");

        if (isGroup) {
          if (hideEmptyGroups && !value?.length) {
            return null;
          } else {
            return (
              <GroupCompactListItem
                key={`group-${itemKey}`}
                data-group-key={dataItemKey}
                data-internal-key={dataInternalKey}
                items={value}
                itemComponent={ItemComponent}
              >
                {groupDisplayTransform
                  ? groupDisplayTransform(key, value)
                  : key}
              </GroupCompactListItem>
            );
          }
        } else {
          return (
            <ItemComponent
              key={`item-${itemKey}`}
              data-item-key={dataItemKey}
              data-internal-key={dataInternalKey}
              selected={selectedItemKey === dataItemKey}
              item={itemDisplayTransform ? itemDisplayTransform(value) : value}
              onClick={(_) => handleSelect(dataItemKey, value, dataInternalKey)}
              {...itemProps}
            />
          );
        }
      });
    } else {
      throw new Error(`Unsupport type of items: ${typeof items}`);
    }
  };

  return (
    <List {...props} className="text-xs" size="compact">
      {contents(items)}
      {props.children}
    </List>
  );
}

type ListSelectionContextType = {
  selectedItemKey: string;
  setSelectedItemKey: React.Dispatch<string>;
  selectedItemInternalKey: string;
  setSelectedItemInternalKey: React.Dispatch<string>;
  handleSelect: (key: string, value: string, internalKey: string) => void;
  maxDepth: number;
  keyTransform: (key: string, value: string, isGroup: boolean) => string;
  itemProps: any;
};

const ListSelectionContext =
  React.createContext<ListSelectionContextType | null>(null);

type CompactListProps = {
  defaultValue?: string;
  onSelect?: (key: string, value: string) => void;
  maxDepth: number;
  keyTransform: (key: string, value: string, isGroup: boolean) => string;
} & CompactListRootProps;
export default function CompactList(props: CompactListProps) {
  // TODO - Better handle key-value and defaultValue (now is key)
  const [selectedItemKey, setSelectedItemKey] = useState<string>(
    props.defaultValue
  );
  const [selectedItemInternalKey, setSelectedItemInternalKey] = useState(
    props.defaultValue
  );

  function handleSelect(key, value, internalKey) {
    setSelectedItemKey(key);
    setSelectedItemInternalKey(internalKey);
    // Propagate to parents
    props.onSelect?.(key, value);
  }

  // Extract item specific props to automatically hapend handlers to each item from the root list props
  let itemProps = Object.keys(props)
    .filter((prop) => prop.startsWith("itemOn"))
    .reduce(
      (prev, propKey) => ({
        ...prev,
        [propKey.replace("itemOn", "on")]: props[propKey],
      }),
      {}
    );

  return (
    <ListSelectionContext.Provider
      value={{
        selectedItemKey,
        setSelectedItemKey,
        selectedItemInternalKey,
        setSelectedItemInternalKey,
        handleSelect, // Pass internal select handler that trigger the prop provided one to allow for more control

        maxDepth: props.maxDepth,
        keyTransform: props.keyTransform,

        itemProps,
      }}
    >
      <CompactListRoot {...props} className="text-xs" size="compact" />
    </ListSelectionContext.Provider>
  );
}
CompactList.Item = CompactListItem;
