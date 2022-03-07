import { Controller } from "@fuse-labs/core"
import { MarlinController } from "@fuse-labs/marlin-core/server"
import signale from "signale"

Controller.registerControllerClass("marlin", MarlinController)
//signale.info('Registered bootstrap controller', Controller.getControllerClass('marlin')) 
