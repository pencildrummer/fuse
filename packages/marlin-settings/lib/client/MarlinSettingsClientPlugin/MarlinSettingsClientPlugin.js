import { ClientPlugin } from '@fuse-labs/core-client'
import MarlinSettingsPage from '../pages/index'

export default class MarlinSettingsClientPlugin extends ClientPlugin {

  deviceComponents(device) {
    return {
      page: {
        plugin: MarlinSettingsPage
      }
    }
  }

}