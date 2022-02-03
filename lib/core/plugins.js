import fs from 'fs'

export async function getPlugins() {
  const pluginsPath = 'plugins'
  let vendors = await fs.promises.readdir(pluginsPath).catch(err => console.error(err))
  let plugins = await vendors.flatMap( (vendor) => {
    let names = fs.readdirSync(pluginsPath+'/'+vendor)
    // TODO - Read info from package.json
    // TODO - Check has setting page
    return names.map(name => {return {
      name: name,
      vendor: vendor,
      title: name,
      author: vendor,
      version: '0.1',
      active: true,
      system: true
    }})
  })
  return plugins
}