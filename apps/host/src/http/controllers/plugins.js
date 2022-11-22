import path from "path";
import { PluginManager } from "@fuse-labs/core";
import fs from "fs-extra";
const getLogo = (req, res) => {
    let plugin = PluginManager.shared.getPlugin(path.join(req.params.pluginScope, req.params.pluginName));
    if (plugin) {
        let iconPath = path.resolve(path.join(plugin.path, "logo.png"));
        if (fs.existsSync(iconPath)) {
            res.sendFile(iconPath);
        }
        else {
            const genericPluginIconPath = path.join(process.cwd(), "public", "plugin-generic-logo.png");
            res.sendFile(genericPluginIconPath);
        }
    }
    else {
        res.sendStatus(404);
    }
};
export { getLogo };
