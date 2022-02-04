import { getPlugins } from 'lib/core/plugins'
import { getActivePlugins } from '../../../lib/core/plugins'

export default async function (req, res) {
  let plugins = await getPlugins()
  let activePlugins = getActivePlugins()
  
  plugins = plugins.map(plugin => {
    return {
      ...plugin,
      active: activePlugins.includes(plugin.name)
    }
  })
  return res.status(200).json(plugins)
}