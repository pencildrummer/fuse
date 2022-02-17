import fs from 'fs-extra'
import PrinterDeviceProfile from '../shared/models/DeviceProfile/PrinterDeviceProfile.js'
import { pathCase, titleCase } from '../shared/strings.js'
import path from 'path'
import { SYSTEM_BASE_PATH } from "./constants.js"
import signale from 'signale'

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

export function addProfile(profileData) {
  let profile
  // Check device type
  switch (profileData.type) {
    case 'fdm_printer':
      profile = new PrinterDeviceProfile(profileData)
      break
    default:
      throw new Error('Unsupported profile type', profileData.type)
  }
  // When implemented for server side use only use profile.save() instead?
  writeProfile(profile)
  // Return saved profile
  return profile
}

export function updateProfile(id, profileData) {
  signale.info('Updating profile', id)
  if (!id) {
    throw new Error('Profile ID to update not provided')
  }

  let profile
  // Check device type
  switch (profileData.type) {
    case 'fdm_printer':
      profile = new PrinterDeviceProfile(profileData)
      break
    default:
      throw new Error('Unsupported profile type', profileData.type)
  }

  // Check id provided is the same as the profile data
  if (id != profile.id) {
    throw new Error('Profile ID provided does not match profile generated data ID', id, '!=', profile.id)
  }

  // Check if profile already exists, otherwise throw error, addProfile should be used instead
  if (!fs.existsSync(path.join(process.cwd(), profile.path))) {
    throw new Error(`Requested profile update for profile ${profile.id} but no file found to update at path ${profile.path}`)
  }
  
  // Write profile data
  writeProfile(profile, true)
  return profile
}

/**
 * Internal
 */

function writeProfile(profile, overwrite = false) {
  let storagePath = path.join(process.cwd(), profile.path)
  // Check file already exists, prevent save
  if (!overwrite && fs.existsSync(storagePath)) {
    throw new Error('Profile already exists:', storagePath)
  }
  // Ensure file exists and directories in between
  fs.ensureFileSync(storagePath)
  // Write profile content to file
  return fs.writeFileSync(storagePath, JSON.stringify(profile, null, 2), { encoding: 'utf-8' })
}