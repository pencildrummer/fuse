const express = require("express");
const next = require("next");
const path = require("path");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then((_) => {
  // Load port after prepare() because env vars loaded from .env files are not ready before
  const port = parseInt(process.env.PORT, 10) || 3000;

  const server = express();

  // Add custom handler to allow access to static installed file such as plugins
  console.log(
    "Serving /system from path ",
    path.join(__dirname, "/../../../..")
  );
  server.use("/system", express.static(path.join(__dirname, "/../../../..")));

  server.all("*", (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Client started on http://localhost:${port}`);
  });
});
