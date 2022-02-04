import { setPluginActive } from "../../../lib/core/plugins"

export default async function (req, res) {
  // TODO - Check plugin is not a system one
  // TODO - Add validator
  if (req.body.name && req.body.activate !== null) {
    await setPluginActive(req.body.name, req.body.activate)
      .catch(e => console.error(e))
    return res.status(200).end()
  } else {
    return res.status(400).json('Missing parameters')
  }
}