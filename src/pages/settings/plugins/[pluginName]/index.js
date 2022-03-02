import Page from "@fuse-labs/core-ui/components/pages/Page"
import { Widget } from "@fuse-labs/core-ui"
import dynamic from 'next/dynamic'
import { getPlugin } from "@/server/lib/plugins.js"

const InstalledPluginSettingsPage = ({
  plugin,
  ...props
}) => {

  const Component = dynamic(_ => import(`@/plugins/${plugin.name}/settings/index.js`))

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

  // Normalize plugin name from query
  let name = pluginName.replace('*', '/')

  // Get plugin object
  let plugin = getPlugin(name)

  // Redirect if no plugin is found?
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