import signale from "signale";
import chalk from "chalk";
import {
  _start_SocketServer,
  socketServer as io,
  useDeviceMiddleware,
  logger,
} from "@fuse-labs/core";

export default async function _init_Socket() {
  // Add listener
  io.on("connection", async (socket) => {
    logger.success("Connected to main localhost socket");
  });

  // Actually start and init the socket server
  await _start_SocketServer();

  logger.info("Registering device namespace on connection handler");

  // Create dynamic devices namespace (eg: /device-42424242-4242-4242-4242-424242424242)
  let devicePath =
    /^\/device:[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/i;
  // Create namespace for device IDs
  io.of(devicePath)
    .use(useDeviceMiddleware)
    .on("connection", async (deviceSocket) => {
      logger.ready(
        "Connected device socket:",
        chalk.blueBright(deviceSocket.nsp.name)
      );

      deviceSocket.on("disconnect", (reason) => {
        logger.complete(
          "Disconnected from namespace",
          deviceSocket.nsp.name,
          "Cause",
          reason
        );
      });
    });
}
