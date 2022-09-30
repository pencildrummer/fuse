import { Plugin, DeviceManager, DeviceType } from "@fuse-labs/core";
import { v4 as uuidv4 } from "uuid";
import DeviceTerminal from "../DeviceTerminal/DeviceTerminal.js";
import signale from "signale";
import chalk from "chalk";

export default class TerminalPlugin extends Plugin {
  // initSocket(socket) {
  //   //
  // }

  initDeviceSocket(socket) {
    // Terminal should be intiialized and refrence the socket opened and the dispose the socket when closed
    // Or use the deviceSocket and namespace there
    // Doing this, the first time the socket is opened, the temrinal is created, but once the socket is closed
    // the terminal hold the reference to the old closed that was closed
    this._initDeviceTerminal(socket);

    // TODO - Device Id here should not be needed, we can get is from the namespace
    socket.on("open", (deviceId, fn) => {
      let device = socket.device;

      if (!device.terminal) {
        signale.error(
          "No terminal initialized for device",
          chalk.bold(device.name),
          device.id
        );
        return fn?.(false);
      }

      if (device.terminal.isOpen) {
        this._sendNamespaceMessage("Already connected", "server", socket.nsp);
        return fn?.(true);
      } else {
        // Send message from server notify connection start process
        this._sendNamespaceMessage(
          "Connecting to device...",
          "server",
          socket.nsp
        );
        device.terminal.open();
      }
    });

    // Received terminal message from socket
    socket.on("message", (args, fn) => {
      // Broadcast the same message, attaching received flag, to notify client
      signale.note("Resending as received to socket", socket.id);
      socket.nsp.emit("message", {
        ...args,
        received: true,
      });

      // TODO - Device Id here should not be needed, we can get is from the namespace

      const { message, deviceId } = args;

      let device = socket.device;

      if (device.terminal) {
        // Send message to serial port, as recevied, CR or NL must be added in Terminal when sending
        device.terminal.send(message);
        fn?.(true);
      } else {
        signale.error(
          "No terminal initialized for device",
          chalk.bold(device.name),
          device.id
        );
        fn?.(false);
      }
    });

    /**
     * Request manual disconnect from serial port
     */
    socket.on("close", (deviceId, fn) => {
      // TODO - Device Id here should not be needed, we can get is from the namespace
      let device = socket.device;

      if (!device.terminal) {
        signale.error(
          "No serial port to close for device",
          chalk.bold(device.name),
          device.id
        );
        return fn?.(false);
      }

      // Request close of connection
      device.terminal.close();
    });

    /**
     * Received disconnection event from client socket
     */
    socket.on("disconnect", (_) => {
      // signale.warn('Should close terminal connection')
      // // We need to know which device, or get every device and close all terminals
      // let device = DeviceManager.shared.getDevice(deviceId)
      // if (!device) {
      //   console.warn('No device to disconnect from')
      // } else {
      //   device.terminal?.close()
      // }
    });
  }

  // Initialize terminal on Device objects
  _initDeviceTerminal(deviceSocket) {
    let device = deviceSocket.device;
    let deviceNamespace = deviceSocket.nsp;

    if (!device) {
      return signale.error("Unexpected. No device found on socket");
    }

    // Check for existing device terminal
    if (device.terminal)
      return console.info("Device already has a DeviceTerminal attached");

    // Create DeviceTerminal
    device.terminal = new DeviceTerminal(device, (err) => {
      signale.log("Connecting DeviceTerminal in server");
      if (err) {
        signale.error("Error creating DeviceTerminal:", err);
        this._sendNamespaceMessage(
          "Error connecting to device - " + err.message,
          "server",
          deviceNamespace
        );
        // terminalSocket.emit('message', {
        //   id: 'server-'+uuidv4(),
        //   from: 'server',
        //   message: 'Error connecting to device - ' + err.message
        // })
      }
    });

    // Add DeviceTerminal listeners
    device.terminal.on("open", (_) => {
      signale.success(
        "Terminal connected to device",
        chalk.greenBright(device.name)
      );
      // Broadcast open connection result
      deviceNamespace.emit("connected", device.id);
      // Send human readable message
      this._sendNamespaceMessage(
        "Connection opened",
        "device",
        deviceNamespace
      );
      // Call callback function
      //fn?.(true)

      // signale.info('Attaching listener for data')

      // // This is for Marlin based
      // // Attach readyParser and then pipi readline parser to readyParser
      // let readyParser = device.terminal.serialPort.pipe(new ReadyParser({ delimiter: 'start' }))
      // readyParser.on('ready', _ => signale.success('READY received!'))
      // let parser = readyParser.pipe(new ReadlineParser({ delimiter: '\n' }))
      // //let parser = device.terminal.serialPort.pipe(new ReadlineParser({ delimiter: '\n' }))
      // parser.on('data', data => {
      //   signale.info('Received data from parser', data)
      //   socketSendMessage(data, 'device')
      // })

      // let okParser = device.terminal.serialPort.pipe(new ReadyParser({ delimiter: 'ok' }))
      // okParser.on('ready', _ => signale.star('OK RECEIVED!'))
      // okParser.on('data', data => signale.star('AFTER OK data:', data.toString()))

      // let readyParser = device.terminal.serialPort.pipe(new ReadyParser({ delimiter: 'start' }))
      // readyParser.on('ready', _ => signale.info('READY received!'))
      // readyParser.on('data', data => signale.debug('Received data on parser', data))

      //
      // This is for - ARDUINO - GRBL - Make different conneciton based on device connecte
      //
      // let parser = device.terminal.serialPort.pipe(new ReadlineParser({ delimiter: '\r\n'}))
      // // Attach data listener on parser instead of port to get data already parsed
      // parser.on('data', data => {
      //   signale.info('Received data from parser', data)
      //   socket.emit('message', {
      //     id: 'device-data-'+Math.floor(Math.random()*100000).toString(),
      //     from: 'device',
      //     message: data
      //   })
      // })
    });

    device.terminal.on("close", (error) => {
      if (error) {
        signale.error("Closed device terminal connection due to error", error);
        this._sendNamespaceMessage(
          "Connection closed due to error: " + error.message,
          "device",
          deviceNamespace
        );
      } else {
        signale.info(
          "Closed device terminal connection for ",
          device.id,
          deviceNamespace.name
        );
        // Normal close request
        this._sendNamespaceMessage(
          "Connection closed",
          "device",
          deviceNamespace
        );
      }
    });

    // TEST
    device.terminal.on("write", (data) => {
      this._sendNamespaceMessage(data, "controller", deviceNamespace);
    });

    device.terminal.on("data", (data) => {
      signale.info("Received data from parser", data);
      this._sendNamespaceMessage(data, "device", deviceNamespace);
    });

    device.terminal.on("error", (error) => {
      signale.error("Error received", error);
      this._sendNamespaceMessage(
        "Error: " + error.message,
        "device",
        deviceNamespace
      );
    });

    signale.star(
      "Added terminal to device ",
      chalk.bold(device.name),
      device.id
    );
  }

  _sendNamespaceMessage(message, from, nsp) {
    nsp.emit("message", {
      id: from.toLowerCase() + "-" + uuidv4(),
      from: from.toLowerCase(),
      message: message,
    });
  }
}
