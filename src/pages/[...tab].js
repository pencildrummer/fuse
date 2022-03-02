import { getPlugin } from "@fuse-labs/core";
import dynamic from "next/dynamic";
import { MainLayout } from "@fuse-labs/core-ui";

export default function DynamicPage({
  plugin,
  ...props
}) {

  // TODO - Create dynamic retrieval manager or something more abstract than pure path in here
  const TabPluginComponent = dynamic(_ => import(`plugins/${plugin.name}/tabs/index.js`))

  return <MainLayout>
    <TabPluginComponent />
  </MainLayout>
}

export async function getServerSideProps(ctx) {
  const { query } = ctx
  const { tab } = query

  let pluginName = tab.join('/')
  let plugin = getPlugin(pluginName)

  if (!plugin) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      plugin: plugin
    }
  }
}