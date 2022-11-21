import ClientDevice from "../../ClientDevice/ClientDevice";

export default class ClientController {
  readonly device: ClientDevice;

  constructor(device: ClientDevice) {
    this.device = device;
  }
}
