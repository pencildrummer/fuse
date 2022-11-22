declare class ConfigManager {
    _config: {};
    get config(): {};
    _initialized: boolean;
    get initialized(): boolean;
    constructor();
    init(): void;
    save(): void;
}
declare class Singleton {
    private static sharedInstance;
    constructor();
    static get shared(): ConfigManager;
}
export default Singleton;
//# sourceMappingURL=ConfigManager.d.ts.map