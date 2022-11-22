import path from "path";
import FileManagerEntry from "./FileManagerEntry.js";
import fs from "fs-extra";

export default class File extends FileManagerEntry {
  ext;
  size;

  constructor(filePath: string, meta?: any) {
    super(filePath, meta);
    this.ext = path.extname(filePath);
    // Call also in constructor, setStats on creation does not seem to set the value
    this.size = this._stats?.size;
  }

  setStats(stats) {
    super.setStats(stats);
    this.size = stats?.size;
  }

  writeSync(data) {
    // Write file on system
    fs.writeFileSync(this.path, data);
    // Reload stats
    this.readStats();
  }
}
