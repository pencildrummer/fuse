import fs from "fs-extra";
import path from "path";

// TODO - Make abstract
export default class FileManagerEntry {
  _stats; // For internal use only

  path;
  relativePath: string;
  name;

  mtimeMs;
  birthtimeMs;

  constructor(entryPath: string, meta?: { stats?: any }) {
    this.path = entryPath;
    this.relativePath = path.relative(process.cwd(), entryPath);
    this.name = path.basename(entryPath);
    if (meta?.stats) this.setStats(meta?.stats);
    else if (fs.existsSync(entryPath)) this.readStats();
  }

  /**
   * Retrieve stats for entry using fs.statSync and updates class stats. Calls setStats() internally.
   */
  readStats() {
    let stats = fs.statSync(this.path);
    this.setStats(stats);
  }

  setStats(stats: any) {
    this._stats = stats;
    (this.mtimeMs = this._stats?.mtimeMs),
      (this.birthtimeMs = this._stats?.birthtimeMs);
  }
}
