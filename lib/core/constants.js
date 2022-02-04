import path from 'path'

export const PLUGINS_BASE_PATH = 'plugins'
export const SYSTEM_BASE_PATH = 'system'
export const ACTIVE_PLUGINS_PATH = path.resolve(path.join(SYSTEM_BASE_PATH,'active_plugins.json'))
export const SYSTEM_PLUGINS = [
  '@fuse-labs/core',
  '@fuse-labs/core-ui',
]