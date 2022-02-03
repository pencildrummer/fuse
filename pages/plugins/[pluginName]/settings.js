import Page from "../../../components/pages/Page"
import { Widget } from "../../../plugins/@fuse-labs/core-ui"
import dynamic from "next/dynamic"
import { getPlugins } from "../../../lib/core/plugins"

const InstalledPluginSettingsPage = ({
  plugin,
  ...props
}) => {

  const Component = dynamic(_ => import(`plugins/${plugin.vendor}/${plugin.name}/settings/index.js`))

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
  console.log('Plugins')
  
  // TODO - Get plugin object

  // TODO - Redirect if no plugin is found?

  return {
    props: {
      plugin: {
        name: pluginName,
        vendor: '@fuse-labs'
      }
    }
  }
}