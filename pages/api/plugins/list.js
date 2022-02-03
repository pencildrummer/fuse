import { getPlugins } from 'lib/core/plugins'

export default async function (req, res) {
  let plugins = await getPlugins()
  return res.status(200).json(plugins)
}