import signale from "signale"
import path from 'path'
import fs from 'fs-extra'
import * as url from 'url'
import { SYSTEM_BASE_PATH } from "../../constants.js"

class ConfigManager {

  _config = {}
  get config() { return this._config }

  _initialized = false
  get initialized() { return this._initialized }

  constructor() {
    this.init()
  }

  init() {
    if (this._initialized) 
      throw new Error('Trying to re-initialize ConfigManager')

    signale.pending('Initializing ConfigManager')

    // Retrieve default config to merge even if there is an existing config file in the app
    const __dirname = url.fileURLToPath(new URL('..', import.meta.url))
    this._config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'defaults', 'config.json')))

    // Retrieve config from stored json and merge with defaults if presend
    const configPath = path.join(SYSTEM_BASE_PATH, 'config.json')
    if (fs.existsSync(configPath)) {
      // Read from existing app system config file
      const existingConfig = JSON.parse(fs.readFileSync(configPath))
      this._config = {
        ...this._config,
        ...existingConfig
      }
    }
    // And store it in app system path
    this.save()

    this._initialized = true
  
    signale.success('DeviceManager is now ready')
  }

  save() {
    fs.writeFileSync(path.join(SYSTEM_BASE_PATH, 'config.json'), JSON.stringify(this._config, null, 2))
  }

}
// Export shared manager
class Singleton {

  constructor() {
    throw new Error('Use ConfigManager.shared instead')
  }

  static get shared() {
    if (!Singleton.sharedInstance) {
      signale.note('New shared instance of ConfigManager')
      Singleton.sharedInstance = new ConfigManager();
    }
    return Singleton.sharedInstance;
  }

}
export default Singleton