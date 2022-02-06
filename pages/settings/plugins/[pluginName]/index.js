import Page from "../../../../components/page-layouts/Page"
import { Widget } from "../../../../plugins/@fuse-labs/core-ui"
import dynamic from "next/dynamic"
import { getPluginInfo, getPlugins } from "../../../../lib/core/plugins.js"

const InstalledPluginSettingsPage = ({
  plugin,
  ...props
}) => {

  const Component = dynamic(_ => import(`plugins/${plugin.name}/settings/index.js`))

  if (Component) return <Component />
  return <Page>
    <Widget>
      <span>Loading...</span>
    </Widget>
  </Page>
}

export default dynamic(_ => Promise.resolve(InstalledPluginSettingsPage), { ssr: false })

export async function getServerSideProps({ query }) {
  const { pluginName } = query

  const plugins = await getPlugins()

  // Normalize plugin name from query
  let name = pluginName.replace('*', '/')

  // TODO - Get plugin object
  let plugin = await getPluginInfo(name)

  // TODO - Redirect if no plugin is found?
  if (!plugin) {
    return {
      redirect: {
        permanent: false,
        destination: '/settings/plugins'
      }
    }
  }

  return {
    props: {
      plugin
    }
  }
}