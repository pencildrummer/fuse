import { object, string } from 'yup'
import { socket } from '../../socket'

const SCHEMA = object({
  name: string().required(),
  version: string().required(),
  fuse: object().required()
})

export default class ClientPlugin {

  constructor(data) {
    let plugin = SCHEMA.validateSync(data)
  
    // Init plugin socket if needed
    if (plugin.fuse.hasSocket) {
      plugin.socket = socket(plugin.name)
    }
  
    Object.assign(this, plugin)
  }
  
}