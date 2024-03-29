import _bootstrap_ from "./lib/_bootstrap_.js";
import _init_HTTPServer from "./lib/_init_HTTPServer.js";
import _init_Socket from "./lib/_init_Socket.js";
import _init_PluginsSocket from "./lib/_init_PluginsSocket.js";
import { AppManager, socketServer } from "@fuse-labs/core";

(async () => {
  // Boostrap server
  await _bootstrap_();
  // Init plugins sockets
  await _init_PluginsSocket();
  // Init main socket
  await _init_Socket();
  // Start http server
  await _init_HTTPServer();
  // Broadcast initialized data
  socketServer.emit("app:data", AppManager.data);
})();
