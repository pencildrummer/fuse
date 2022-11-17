import express from "express";
import path from "path";
import { PluginManager } from "@fuse-labs/core";
import fs from "fs-extra";

const HOST_HTTP_PORT = 8898;
const httpServer = express();

// TODO :  Serve plugins icons
httpServer.get("/plugin/:pluginScope/:pluginName/logo", (req, res, next) => {
  let plugin = PluginManager.shared.getPlugin(
    path.join(req.params.pluginScope, req.params.pluginName)
  );

  if (plugin) {
    let iconPath = path.resolve(path.join(plugin._path, "logo.png"));
    if (fs.existsSync(iconPath)) {
      res.sendFile(iconPath);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(404);
  }
});

httpServer.listen(HOST_HTTP_PORT, (_) => {
  console.log(`> Host http server ready on PORT: ${HOST_HTTP_PORT}`);
});
