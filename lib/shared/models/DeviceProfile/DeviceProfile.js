import { SYSTEM_BASE_PATH } from "../../../core/constants.js";
import { pathCase } from "../../strings.js"
import path from 'path'

export default class DeviceProfile {

  id;
  type;   // Device type: 'fdm_printer', 'msla_printer', 'cnc', 'laser'
  brand;
  model;

  // Storage path relative to project root
  get path() {
    let pathBrand = pathCase(this.brand)
    let pathModel = pathCase(this.model)
    return path.join(SYSTEM_BASE_PATH, 'profiles', pathBrand, pathModel+'.json')
  }

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