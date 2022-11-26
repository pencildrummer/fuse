import classNames from "classnames";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import ScrollArea from "../../shared/ScrollArea/ScrollArea";
import MenuItem from "./MenuItem";
import PluginSettingsMenuItems from "./PluginsSettingMenuItems";

export default function SettingPage(props) {
  return (
    <MainLayout>
      <div className="flex-1 h-full flex flex-row">
        <div className="flex-none py-2 pl-2 space-y-2">
          <div className="dark:bg-gray-900 dark:text-gray-200 w-44 rounded-lg flex flex-col py-2">
            <ul className="px-2 flex flex-col space-y-1">
              <MenuItem href="/settings/general" strict>
                General
              </MenuItem>
              <MenuItem href="/settings/devices" strict>
                Devices
              </MenuItem>
              <MenuItem href="/settings/plugins" strict>
                Plugins
              </MenuItem>
            </ul>
          </div>

          <PluginSettingsMenuItems />

          <div className="text-xs font-bold text-center py-1 text-gray-600">
            v. 0.1
          </div>
        </div>

        <ScrollArea className="flex-1 max-w-screen-lg">
          <div className="p-2 flex flex-col space-y-3">{props.children}</div>
        </ScrollArea>
      </div>
    </MainLayout>
  );
}
