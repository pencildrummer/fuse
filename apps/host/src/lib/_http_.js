import express from "express";
import pluginsRoutes from "../http/routes/plugins.js";

const HOST_HTTP_PORT = 8898;
const app = express();

app.use("/plugin", pluginsRoutes);

app.listen(HOST_HTTP_PORT, (_) => {
  console.log(`> Host http server ready on PORT: ${HOST_HTTP_PORT}`);
});
