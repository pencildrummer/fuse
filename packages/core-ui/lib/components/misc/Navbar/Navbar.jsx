import * as icons from "@radix-ui/react-icons";
import * as Toolbar from "@radix-ui/react-toolbar";
import { useAppContext } from "@fuse-labs/core-client";
import TabItem from "./TabItem";

export default function Navbar() {
  const { activePlugins } = useAppContext();
  console.log("App context plugins", activePlugins);
  return (
    <Toolbar.Root className="relative flex flex-row items-center h-11 dark:bg-gray-900 dark:text-gray-200">
      <div className="w-[74px]">{/* MacOS traffic light space */}</div>

      {/* <div className="flex-none w-20 flex items-center justify-center">
				<span className="font-bold">Fuse</span>
			</div> */}

      <div className="h-full flex-1 flex flex-row px-3 items-end">
        <ul className="flex-1 flex flex-row items-end">
          <TabItem href="/workspace">
            <icons.HomeIcon />
            <span>Workspace</span>
          </TabItem>
          {activePlugins?.map((plugin) => {
            let pluginComponents = plugin.components();

            if (pluginComponents.tab) {
              let Icon = plugin.icon;
              return (
                <TabItem href={`/${plugin.url}`} key={`tab-${plugin.name}`}>
                  {Icon && <Icon />}
                  <span>{plugin.displayName}</span>
                </TabItem>
              );
            }
          })}
        </ul>

        <ul className="flex flex-row items-end">
          <TabItem href="/marketplace">
            <icons.CubeIcon />
          </TabItem>

          <TabItem href="/settings">
            <icons.GearIcon />
          </TabItem>
        </ul>
      </div>
    </Toolbar.Root>
  );
}
