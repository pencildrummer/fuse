import { useAppContext } from "@fuse-labs/core-client";
import MenuItem from "./MenuItem";

export default function PluginSettingsMenuItems() {
  const { activePlugins } = useAppContext();

  let activePluginsWithSettings = activePlugins?.filter((plugin) =>
    Boolean(plugin.components().page?.settings)
  );

  if (!activePluginsWithSettings?.length) return null;

  return (
    <div className="dark:bg-gray-900 dark:text-gray-200 w-44 rounded-lg flex flex-col py-2">
      <ul className="px-2 flex flex-col space-y-1">
        {activePluginsWithSettings.map((plugin) => (
          <MenuItem href={`/settings/plugins/${plugin.name}`}>
            <div className="flex space-x-2 items-center">
              {plugin.icon && <plugin.icon className="flex-none" />}
              <span className="truncate">{plugin.displayTitle}</span>
            </div>
          </MenuItem>
        ))}
      </ul>
    </div>
  );
}
