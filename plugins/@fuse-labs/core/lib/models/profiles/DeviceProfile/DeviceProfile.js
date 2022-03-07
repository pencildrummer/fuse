import path from 'path'
import { SYSTEM_BASE_PATH } from "../../../constants.js";
import { pathCase } from '@fuse-labs/shared-utils';
import { object, string } from 'yup'

export const DEVICE_PROFILE_SCHEMA = object({
  id: string().required(),
  type: string().required(), // Add validation for supported types
  brand: string().required(),
  model: string().required(),

  firmware: string().required(),
  connection: string().required() // Add validation for available types of connection
})

export default class DeviceProfile {

  id;
  type;   // Device type: 'fdm_printer', 'msla_printer', 'cnc', 'laser'
  brand;
  model;

  firmware; // String identify which firmware is used on the motherboard. It will use to determine which Controller to use

  // Storage path relative to project root
  get path() {
    let pathBrand = pathCase(this.brand)
    let pathModel = pathCase(this.model)
    return path.join(SYSTEM_BASE_PATH, 'profiles', pathBrand, pathModel+'.json')
  }

  // Costructor using JSON parsed content
  constructor(data) {
    if (this.constructor == DeviceProfile) {
      throw new Error('DeviceProfile cannot be instantiated, is in an abstract class')
    }

    // Manually set ID on creation
    data.id = [pathCase(data.brand), pathCase(data.model)].join('.')
    // Validate data and set on instance
    let profileData = DEVICE_PROFILE_SCHEMA.validateSync(data, { stripUnknown: true })
    Object.assign(this, profileData)

    // const { type, brand, model, ...rest} = params

    // this.id = [pathCase(brand), pathCase(model)].join('.')
    // this.type = type
    // this.brand = brand
    // this.model = model
  }

  // 
  save() {
    // TODO - Implement for server side use only
  }
}