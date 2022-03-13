import dynamic from "next/dynamic";
import { BlockingView, Group, InactivePluginView, MainLayout } from "@fuse-labs/core-ui";
import { ClientPluginManager } from "@fuse-labs/core-client";
import { useRouter } from "next/router";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function DynamicPage({
  ...props
}) {

  const router = useRouter()
  const { query } = router
  const { tab } = query

  const pluginName = tab.join('/')

  const plugin = ClientPluginManager.shared.getPlugin(pluginName)

  if (!plugin) {
    return (
      <BlockingView>
         <Group orientation='vertical' className="items-center">
          <ExclamationTriangleIcon className='w-20 h-20 text-gray-700'/>
          <span className="font-bold text-gray-500">
            Plugin not found
          </span>
        </Group>
      </BlockingView>
    )
  }

  if (!plugin.active) {
    return <InactivePluginView />
  }

  // TODO - Create dynamic retrieval manager or something more abstract than pure path in here
  const TabPluginComponent = dynamic(_ => import(`plugins/${plugin.name}/tabs/index.js`))

  return <MainLayout>
    <TabPluginComponent />
  </MainLayout>
}