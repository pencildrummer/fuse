import signale from "signale";
import chalk from "chalk";
import { socketServer as io, PluginManager, useDeviceMiddleware, logger, } from "@fuse-labs/core";
export default async function _init_PluginsSocket() {
    // Get list of plugins
    const activePlugins = PluginManager.shared.activePlugins;
    // Get plugins with socket register methods
    for (const plugin of activePlugins) {
        // Define plugin namespace
        let nsPluginName = plugin.name.replace("@", "scope:");
        // Register non-scoped plugin socket eg: localhost/@fuse-labs/terminal
        if (typeof plugin.initSocket === "function") {
            let path = `/${nsPluginName}`;
            // Create server namespace
            io.of(path).on("connection", (socket) => {
                signale.start("Connected to plugin namespace:", chalk.bold(socket.nsp.name));
                // Actually register socket listeners for plugin
                plugin.initSocket(socket);
                signale.note("Registered listeners for plugin socket for plugin", chalk.bold(plugin.name));
                // Add debug disconnect listener
                socket.on("disconnect", (_) => {
                    signale.complete("Disconnected from plugin socket:", chalk.bold(socket.nsp.name));
                });
            });
            logger.success("Prepared registration for plugin socket", chalk.green(plugin.name));
        }
        else {
            signale.info(`Skip initSocket for plugin ${chalk.bold(plugin.name)}`);
        }
        // Register device scoped plugin socket if supports device types eg: localhost/device:DEVICE_ID/@fuse-labs/terminal
        if (typeof plugin.initDeviceSocket === "function") {
            let path = new RegExp(`/device:[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/${nsPluginName}`, "i");
            // Create server namespace
            io.of(path)
                .use(useDeviceMiddleware)
                .on("connection", (socket) => {
                signale.start("Connected to device plugin namespace:", chalk.bold(socket.nsp.name));
                // Actually register socket listeners for plugin
                plugin.initDeviceSocket(socket);
                signale.note("Registered listeners for device plugin socket for plugin", chalk.bold(plugin.name));
                // Add debug disconnect listener
                socket.on("disconnect", (_) => {
                    signale.complete("Disconnected from device plugin socket:", chalk.bold(socket.nsp.name));
                });
            });
            logger.success("Prepared registration for device plugin socket", chalk.green(plugin.name));
        }
        else {
            signale.info(`Skip initDeviceSocket for plugin ${chalk.bold(plugin.name)}`);
        }
    }
}
