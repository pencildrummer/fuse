import fs from 'fs'
import path from 'path'
import { SYSTEM_BASE_PATH } from "./constants"

export function getProfiles() {
  let brandDirectories = fs.readdirSync(path.join(SYSTEM_BASE_PATH, 'profiles'), { withFileTypes: true})
    .filter(d => d.isDirectory())
  
  return brandDirectories.reduce((res, dir) => {
    res[dir.name] = fs.readdirSync(path.join(SYSTEM_BASE_PATH, 'profiles', dir.name), { withFileTypes: true })
      .filter(d => d.isFile() && path.extname(d.name) == '.json')
      .map(p => {
        // TODO - Validate profile structure
        let fileContent = fs.readFileSync(path.join(process.cwd(), SYSTEM_BASE_PATH, 'profiles', dir.name, p.name))
        // Parse content
        let profile = JSON.parse(fileContent)
        // Merge key based of filename
        profile.id = path.parse(p.name).name
        return profile
      })
    return res
  }, {})
}