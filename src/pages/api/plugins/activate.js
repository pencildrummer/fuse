import { setPluginActive } from "@fuse-labs/core/lib/plugins"

export default activate = async function (req, res) {
  // TODO - Check plugin is not a system one
  // TODO - Add validator
  if (req.body.name && req.body.activate !== null) {
    setPluginActive(req.body.name, req.body.activate)
    return res.status(200).json({})
  } else {
    return res.status(400).json({ message: 'Missing parameters' })
  }
}