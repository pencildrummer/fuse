import fs from "fs-extra";
import path from "path";
import FileManager from "./FileManager.js";
import FileManagerEntry from "./FileManagerEntry.js";
export default class Directory extends FileManagerEntry {
    constructor(dirPath, meta) {
        super(dirPath, meta);
        this.isDir = true; // TODO : Make it readonly with Typescript laer on
        Object.defineProperty(this, "isDir", {
            value: true,
            writable: false,
            configurable: false,
        });
    }
    read() {
        this.entries = fs.readdirSync(this.path).reduce((entries, entryPath) => {
            const itemPath = path.join(this.path, entryPath);
            let entry = FileManager.get(itemPath);
            return [...entries, entry];
        }, []);
    }
}
