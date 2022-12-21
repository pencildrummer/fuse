import { Plugin, File, CoreSocket } from "@fuse-labs/core";
import FileManagerEntry from "@fuse-labs/core/dist/models/file-system/FileManagerEntry.js";
interface ClientToServerFileManagerEvents {
    "dir:list": (args: any, callback: (entries: FileManagerEntry[]) => void) => void;
    "file:add": (args: any, callback: (file: File) => void) => void;
}
interface ServerToClientFileManagerEvents {
    "file:added": (file: File) => void;
}
export default class FileManagerPlugin extends Plugin {
    initSocket(socket: CoreSocket<ClientToServerFileManagerEvents, ServerToClientFileManagerEvents>): void;
}
export {};
