/* eslint-disable import/no-anonymous-default-export */
import { PluginManager } from "@fuse-labs/core"

export default async function (req, res) {
  // TODO - Check plugin is not a system one
  // TODO - Add validator
  if (req.body.name && req.body.activate !== null) {
    let pluginName = req.body.name
    let activate = req.body.activate
    PluginManager.shared.setPluginActive(pluginName, activate)
    return res.status(200).json({})
  } else {
    return res.status(400).json({ message: 'Missing parameters' })
  }
}