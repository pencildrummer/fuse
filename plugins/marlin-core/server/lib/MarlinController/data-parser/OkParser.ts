import { DataParser } from "@fuse-labs/core";

export default class OkParser extends DataParser<any> {
  match(data) {
    return data.startsWith("ok");
  }

  parse(data) {
    return data;
  }
}
