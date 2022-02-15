import { pathCase } from "../../strings.js"

export default class DeviceProfile {

  id;
  type;   // Device type: 'fdm_printer', 'msla_printer', 'cnc', 'laser'
  brand;
  model;

  // Costructor using JSON parsed content
  constructor(params) {
    const { type, brand, model, ...rest} = params

    this.id = [pathCase(brand), pathCase(model)].join('.')
    this.type = type
    this.brand = brand
    this.model = model
  }

  // 
  save() {
    // TODO - Implement for server side use only
  }
}