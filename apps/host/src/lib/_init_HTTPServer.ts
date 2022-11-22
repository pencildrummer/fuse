import { logger } from "@fuse-labs/core";
import express from "express";
import pluginsRoutes from "../http/routes/plugins.js";

export default function _init_HTTPServer() {
  const HOST_HTTP_PORT = 8898;
  const app = express();

  app.use("/plugin", pluginsRoutes);

  app.listen(HOST_HTTP_PORT, () => {
    logger.ready(`> Host http server ready on PORT: ${HOST_HTTP_PORT}`);
  });
}
