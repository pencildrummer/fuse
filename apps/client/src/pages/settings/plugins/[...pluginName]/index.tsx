import { Page, Widget, usePluginComponents } from "@fuse-labs/core-ui";
//import dynamic from 'next/dynamic'
import { usePlugin } from "@fuse-labs/core-client";
import { useRouter } from "next/router";

export default function InstalledPluginSettingsPage() {
  // TODO - Convert this be a page called settings.js inside the plugins package
  const router = useRouter();
  const { query } = router;
  const { pluginName } = query;

  const plugin = usePlugin(
    Array.isArray(pluginName) ? pluginName.join("/") : pluginName
  );
  const PluginSettingsComponent = usePluginComponents(plugin, "page.settings");

  // TODO - Make return component from plugin class?
  //const PluginSettingsComponent = dynamic(_ => import(`plugins/${plugin.name}/pages/settings.js`))

  if (PluginSettingsComponent) return <PluginSettingsComponent />;
  return (
    <Page>
      <Widget>
        <span>Loading...</span>
      </Widget>
    </Page>
  );
}
