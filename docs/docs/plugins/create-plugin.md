---
sidebar_position: 1
---

# Create a plugin

## Automatically

:::note
Still in beta, not yet correct structure! This is here as a reminder to be completed in the docs
:::

Using `create-fuse-plugin` you can create a new plugin already with the correct folder structure. The script will ask you question to interactively create your plugin.

```bash
npx run ./bin/create-fuse-plugin # TODO - Decide how to run
```

## Manually

You can create manually a Fuse plugin by providing a folder with the following structure and providing configurations in your `package.json`.

#### Folder structure

```bash
plugin # Root directory of your plugin
├── server # Your client server plugin definition
│  ├── YourPlugin.js
│  └── index.js
├── client # Your client side plugin definition
│  ├── YourClientPlugin.js
│  └── index.js
├── pages           # Optional pages folder
├── tabs            # Optional tabs folder
└── package.json    # Main package.json
```

#### Package config
```json title="package.json"
{
  "name": "<your-plugin>",
  "version": "<your-plugin-version>",
  // Fuse specific fields
  "fuse": {
    "title": "Your plugin",
  }
}
```

See all available configuration fields in [Configuration](configuration)

:::tip
To easily create a plugin folder with a minimum package.json you can use `npm init`.
Fuse plugin are npm packages with additional features attached.
:::


### Server side

```js
import { Plugin } from '@fuse-labs/core/server'

export default class MyAwesomePlugin extends Plugin {

}
```

:::caution
Must inherit `Plugin` from `@fuse-labs/core/server`
:::

### Client side

```js
import { ClientPlugin } from '@fuse-labs/core-client'

export default class MyAwesomeClientPlugin extends ClientPlugin {

}
```

:::caution
Must inherit `ClientPlugin` from `@fuse-labs/core-client`
:::