import fs from "fs-extra";
import Directory from "./Directory.js";
import File from "./File.js";

export default class FileManager {
  static get(entryPath) {
    const stats = fs.statSync(entryPath);
    if (stats.isDirectory()) {
      return new Directory(entryPath, { stats: stats });
    } else {
      return new File(entryPath, { stats: stats });
    }
  }
}
