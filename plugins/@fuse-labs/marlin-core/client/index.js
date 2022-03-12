import { ClientPlugin } from '@fuse-labs/core-client'
import MarlinJobQueueHandler from './components/MarlinJobQueueHandler/MarlinJobQueueHandler'

export default class MarlinCoreClientPlugin extends ClientPlugin {

  deviceComponents(device) {
    // Maybe move it into a config? or leave it dynamic here?
    return {
      page: {
        topBar: MarlinJobQueueHandler
      }
    }
  }
}