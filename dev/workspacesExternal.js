// TODO - Get list of packages defined in root package.json workspaces

export const workspacesExternalPackages = [
  '@fuse-labs/core',
  '@fuse-labs/core-ui',
  '@fuse-labs/core-client',
  '@fuse-labs/file-manager',
  '@fuse-labs/grbl-move',
  '@fuse-labs/grbl-settings',
  '@fuse-labs/marlin-core',
  '@fuse-labs/marlin-extra',
  '@fuse-labs/marlin-extruder',
  '@fuse-labs/marlin-gcode-viewer',
  '@fuse-labs/marlin-move',
  '@fuse-labs/marlin-settings',
  '@fuse-labs/marlin-temperature',
  '@fuse-labs/shared-utils',
  '@fuse-labs/terminal',
  'next/link',
  'next/router',
]

export default function workspacesExternal() {
  return function (id, parentId, isResolved) {
    console.log('Checking ID', id, parentId, isResolved)
    return workspacesExternalPackages.includes(id)
  }
}