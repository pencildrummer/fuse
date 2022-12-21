import { logger } from "@fuse-labs/core";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import pluginsRoutes from "../http/routes/plugins.js";

export default function _init_HTTPServer() {
  const HOST_HTTP_PORT = process.env.HOST_HTTP_PORT || 8898;
  // Set parsed value even if not existing on start
  process.env.HOST_HTTP_PORT = HOST_HTTP_PORT.toString();

  const app = express();

  app.use("/plugin", pluginsRoutes);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  app.use(
    "/storage",
    express.static(path.join(__dirname, "..", "..", "storage"))
  );

  app.listen(HOST_HTTP_PORT, () => {
    logger.ready(`> Host http server ready on PORT: ${HOST_HTTP_PORT}`);
  });
}
