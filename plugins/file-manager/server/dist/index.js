import path from "path";
import { Plugin, File, Directory, logger } from "@fuse-labs/core";
export default class FileManagerPlugin extends Plugin {
    // TODO: this socket is the namespace of the plugin! should be changed in Plugin ts def also
    initSocket(socket) {
        logger.ready("REGISTERING on socket from file manager");
        socket.on("dir:list", ({ path: targetPath }, fn) => {
            // TODO - Validate if path is inside project scope?
            let directory = new Directory(targetPath);
            directory.read();
            fn(directory.entries);
        });
        socket.on("file:add", ({ filename, data }, fn) => {
            // TODO - Check file exists already
            logger.info("Requested save of file " + filename);
            let filePath = path.join(process.cwd(), "storage", filename);
            // Create new file and write it to disk
            let file = new File(filePath);
            file.writeSync(data);
            // Notify callback
            fn?.(file);
            // Broadcast file creation
            socket.emit("file:added", file);
        });
    }
}
//# sourceMappingURL=index.js.map