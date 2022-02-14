import fs from 'fs'
import { titleCase } from 'lib/shared/strings'
import path from 'path'
import signale from 'signale'
import { SYSTEM_BASE_PATH } from "./constants"

export function getProfiles() {
  let brandDirectories = fs.readdirSync(path.join(SYSTEM_BASE_PATH, 'profiles'), { withFileTypes: true})
    .filter(d => d.isDirectory())
  
  return brandDirectories.reduce((res, dir) => {
    res[dir.name] = fs.readdirSync(path.join(SYSTEM_BASE_PATH, 'profiles', dir.name), { withFileTypes: true })
      .filter(d => d.isFile() && path.extname(d.name) == '.json')
      .map(p => {
        let profileId = [dir.name, path.parse(p.name).name].join('.')
        return getProfile(profileId)
      })
    return res
  }, {})
}

export function getProfile(profileId) {
  let fileProfilePath = profileId.replace('.', path.sep)
  let fileContent = fs.readFileSync(path.join(process.cwd(), SYSTEM_BASE_PATH, 'profiles', fileProfilePath+'.json'))
  // Parse content
  let profile = JSON.parse(fileContent)
  // TODO - Validate profile structure

  // Merge key based of filename
  profile.id = profileId

  // Set brand and model in title case based on path if not specifically provided in json file
  profile.brand = profile.brand || titleCase(fileProfilePath.split(path.sep)[0])
  profile.model = profile.model || titleCase(fileProfilePath.split(path.sep).pop())

  return profile
}