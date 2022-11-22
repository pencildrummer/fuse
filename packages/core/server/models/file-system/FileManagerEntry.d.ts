export default class FileManagerEntry {
    _stats: any;
    path: any;
    relativePath: string;
    name: any;
    mtimeMs: any;
    birthtimeMs: any;
    constructor(entryPath: string, meta?: {
        stats?: any;
    });
    /**
     * Retrieve stats for entry using fs.statSync and updates class stats. Calls setStats() internally.
     */
    readStats(): void;
    setStats(stats: any): void;
}
//# sourceMappingURL=FileManagerEntry.d.ts.map