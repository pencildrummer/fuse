import FileManagerEntry from "./FileManagerEntry.js";
export default class Directory extends FileManagerEntry {
    isDir: boolean;
    entries: any;
    constructor(dirPath: string, meta?: any);
    read(): void;
}
//# sourceMappingURL=Directory.d.ts.map