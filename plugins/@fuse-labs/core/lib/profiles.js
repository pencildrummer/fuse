import fs from 'fs-extra'
import path from 'path'
import signale from 'signale'
import chalk from 'chalk'
import { PROFILES_BASE_PATH, SYSTEM_BASE_PATH } from "./constants.js"
import { titleCase } from '@fuse-labs/shared-utils'
import PrinterDeviceProfile from './models/profiles/DeviceProfile/PrinterDeviceProfile.js'
import CNCDeviceProfile from './models/profiles/CNCDeviceProfile/CNCDeviceProfile.js'

export const profiles = getProfiles()

export function getProfile(profileId) {
  return profiles[profileId]
}

export function addProfile(profileData) {
  let profile
  // Check device type
  switch (profileData.type) {
    case 'fdm_printer':
      profile = new PrinterDeviceProfile(profileData)
      break
    case 'cnc':
      profile = new CNCDeviceProfile(profileData)
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
    case 'cnc':
      profile = new CNCDeviceProfile(profileData)
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

export function deleteProfile(profileId) {
  let profile = getProfile(profileId)

  if (!fs.existsSync(profile.path)) {
    throw new Error(`Requested deletion of profile with id ${chalk.magenta(id)} but no profile file is found at path ${chalk.magenta(profile.path)}`)
  }
  fs.unlinkSync(path.join(process.cwd(), profile.path))
  // Remove from in memory
  delete profiles[profile.id]
  return true
}

/**
 * Internal
 */

function getProfiles() {
  let brandDirectories = fs.readdirSync(PROFILES_BASE_PATH, { withFileTypes: true})
    .filter(d => d.isDirectory())
  
  return brandDirectories.reduce((res, dir) => {
    fs.readdirSync(path.join(PROFILES_BASE_PATH, dir.name), { withFileTypes: true })
      .filter(d => d.isFile() && path.extname(d.name) == '.json')
      .forEach(p => {
        let profileId = [dir.name, path.parse(p.name).name].join('.')
        res[profileId] = readProfile(profileId)
      })
    return res
  }, {})
}

function readProfile(profileId) {
  let fileProfilePath = profileId.replace('.', path.sep)
  let fileContent = fs.readFileSync(path.join(process.cwd(), SYSTEM_BASE_PATH, 'profiles', fileProfilePath+'.json'))
  // Parse content
  let profileData = JSON.parse(fileContent)
  // Set brand and model in title case based on path if not specifically provided in json file
  profileData.brand = profileData.brand || titleCase(fileProfilePath.split(path.sep)[0])
  profileData.model = profileData.model || titleCase(fileProfilePath.split(path.sep).pop())

  // TODO - Validate profile structure
  let profile
  switch (profileData.type) {
    case 'fdm_printer':
      profile = new PrinterDeviceProfile(profileData)
      break
    case 'cnc':
      profile = new CNCDeviceProfile(profileData)
      break
    default:
      throw new Error('Unsupported profile type', profileData.type)
  }
  return profile
}

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