import FileManagerEntry from "./FileManagerEntry.js";
export default class File extends FileManagerEntry {
    ext: any;
    size: any;
    constructor(filePath: string, meta?: any);
    setStats(stats: any): void;
    writeSync(data: any): void;
}
//# sourceMappingURL=File.d.ts.map