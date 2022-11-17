import { socketServer as io } from "@fuse-labs/core";
import _init_Socket from "./lib/_init_Socket.mjs";
import _init_PluginsSocket from "./lib/_init_PluginsSocket.mjs";
import express from "express";
import path from "path";

// Boostrap server
import "./lib/_bootstrap_.mjs";

// Init main socket
await _init_Socket();
// Init plugins sockets
await _init_PluginsSocket();

// Start socket server
let port = process.env.SOCKET_PORT || 8888;

io.httpServer.listen(port, () => {
  console.log(`> Socket ready on PORT: ${port}`);
});

// Start http server
import "./lib/_http_.mjs";
