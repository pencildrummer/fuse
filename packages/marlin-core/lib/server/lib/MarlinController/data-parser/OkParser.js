import { DataParser } from "@fuse-labs/core/server"

export default class OkParser extends DataParser {

  match(data) {
    return data.startsWith('ok')
  }

  parse(data) {
    return data
  }

}