import fs from "fs-extra"
import path from 'path'
import signale from "signale"

export default class FileManagerEntry {
  
  _stats // For internal use only

  path
  name

  mtimeMs
  birthtimeMs
  
  constructor(entryPath, { stats } = {}) {
    this.path = entryPath
    this.relativePath = path.relative(process.cwd(), entryPath)
    this.name = path.basename(entryPath)
    if (stats) 
      this.setStats(stats)
    else if (fs.existsSync(entryPath))
      this.readStats()
  }

  /**
   * Retrieve stats for entry using fs.statSync and updates class stats. Calls setStats() internally.
   */
  readStats() {
    let stats = fs.statSync(this.path)
    this.setStats(stats)
  }

  setStats(stats) {
    this._stats = stats
    this.mtimeMs = this._stats?.mtimeMs,
    this.birthtimeMs = this._stats?.birthtimeMs
  }
  
}