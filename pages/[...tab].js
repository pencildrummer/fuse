import { getPluginInfo } from "lib/core/plugins";
import dynamic from "next/dynamic";
import MainLayout from "../components/layouts/MainLayout";

export default function DynamicPage({
  plugin,
  ...props
}) {

  const TabPluginComponent = dynamic(_ => import(`plugins/${plugin.name}/tabs/index.js`))

  return <MainLayout>
    <TabPluginComponent />
  </MainLayout>
}

export async function getServerSideProps(ctx) {
  const { query } = ctx
  const { tab } = query

  let pluginName = tab.join('/')
  let plugin = getPluginInfo(pluginName)

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