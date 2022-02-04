import fs, { existsSync } from 'fs'
import path from 'path'
import signale from 'signale'

const PLUGINS_BASE_PATH = 'plugins'

export async function getPlugins() {
  let dirs = await fs.promises.readdir(PLUGINS_BASE_PATH).catch(err => console.error(err))
  let scopes = dirs.filter(dir => dir.startsWith("@"))
  let scopedPlugins = scopes.flatMap( scope => 
    fs.readdirSync(path.join(PLUGINS_BASE_PATH, scope)).map(name => path.join(scope, name))
  )

  let pluginNames = [
    ...scopedPlugins,
    dirs.filter(d => !scopes.includes(d))
  ].flat()

  return await pluginNames.reduce(async (result, pluginName) => {
    let res = await result
    // Get info for plugin
    let info = await getPluginInfo(pluginName)
    if (info) {
      res.push(info)
    }
    return res
  }, [])
}

async function getPluginInfo(name) {
  let packagePath = path.join(PLUGINS_BASE_PATH, name, 'package.json')
  
  try {
    if (!existsSync(packagePath)) {
      signale.error('No package found for', name)
      return null
    }
  } catch (e) {
    signale.error('Error retrieving package for', name)
    return null
  }


  let info = await fs.promises.readFile(packagePath)
    .then(res => JSON.parse(res))
    .catch(e => signale.error('Error reading package', e))

  // Add fuse key to safely add custom settings if not provided by package.json
  info.fuse = { ...info.fuse }

  // Check has setting page
  if (existsSync(path.join(PLUGINS_BASE_PATH, name, 'settings/index.js'))) {
    info.fuse.settings = true
  }

  // TODO - Check plugin is active

  return info
}