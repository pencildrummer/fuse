import _bootstrap_ from "./lib/_bootstrap_";
import _init_HTTPServer from "./lib/_init_HTTPServer";
import _init_Socket from "./lib/_init_Socket";
import _init_PluginsSocket from "./lib/_init_PluginsSocket";

(async () => {
  // Boostrap server
  await _bootstrap_();
  // Init main socket
  await _init_Socket();
  // Init plugins sockets
  await _init_PluginsSocket();
  // Start http server
  await _init_HTTPServer();
})();