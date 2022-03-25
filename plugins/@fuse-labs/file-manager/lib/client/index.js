import { ClientPlugin } from '@fuse-labs/core-client';
import { DeviceFileManagerWidget } from './components/index.js';
import IndexPage from '../tabs/index'

export * from './components/index.js'

export default class FileManagerClientPlugin extends ClientPlugin {

  components() {
    // TODO - Add support multiple tabs later in ClientPlugin
    return {
      tab: IndexPage
    }
  }

  deviceComponents(device) {
    return {
      page: {
        home: DeviceFileManagerWidget
      }
    }
  }
  
}