import { ClientPlugin } from '@fuse-labs/core-client';
import { DeviceFileManagerWidget } from './components/index.js';

export * from './components/index.js'

export default class FileManagerClientPlugin extends ClientPlugin {

  deviceComponents(device) {
    return {
      page: {
        home: DeviceFileManagerWidget
      }
    }
  }
  
}