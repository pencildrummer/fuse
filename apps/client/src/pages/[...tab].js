import dynamic from "next/dynamic";
import {
  BlockingView,
  Group,
  InactivePluginView,
  PluginNotFoundView,
  MainLayout,
} from "@fuse-labs/core-ui";
import { ClientPluginManager } from "@fuse-labs/core-client";
import { useRouter } from "next/router";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useEffect, useState, useMemo } from "react";

export default function DynamicPage({ ...props }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [pluginName, setPluginName] = useState();

  useEffect(
    (_) => {
      if (router.isReady) {
        setIsLoading(false);

        const { query } = router;
        const { tab } = query;

        console.log(router);
        const pluginName = tab.join("/");
        console.log("Plugin name", pluginName);
        setPluginName(pluginName);
      } else {
        setIsLoading(true);
      }
    },
    [router.isReady]
  );

  const plugin = useMemo(
    (_) =>
      pluginName ? ClientPluginManager.shared.getPlugin(pluginName) : false,
    [pluginName]
  );

  if (!plugin && !isLoading) {
    return <PluginNotFoundView pluginName={pluginName} />;
  }

  if (!plugin.active) {
    return <InactivePluginView />;
  }

  // TODO - When added support for multiple tabs this should be changed
  const pluginComponents = plugin?.components();

  if (!pluginComponents.tab) {
    return (
      <BlockingView>
        <Group orientation="vertical" className="items-center">
          <ExclamationTriangleIcon className="w-20 h-20 text-gray-700" />
          <span className="font-bold text-gray-500">Plugin tab not found</span>
        </Group>
      </BlockingView>
    );
  }

  let TabPluginComponent = pluginComponents.tab;

  return (
    <MainLayout>
      <TabPluginComponent />
    </MainLayout>
  );
}
