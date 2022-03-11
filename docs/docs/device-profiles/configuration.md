# Configuration

// Define every field available for a device profile

A device profile is a `json` file describing the device, its type and its capabilities.

Fuse supports these type of devices:
- FDM printers
- MSLA printers
- CNC
- Lasers

A device profile must specify an id representing the brand and the model of the device in a dot spearated fashion.

```js
<brand>.<modelName>
```

For example:
```js
creality.ender_3 // Profile ID for Creality (brand) Ender 3 (model)
```

:::caution
The profile ID your provide must be unique and cannot be already present in the Fuse repository
:::

#### Modified profiles

If you need to create a modified version of an already official profile to publish, you can always copy the original one and append keys to the profile ID.

```
longer.lk4_pro              # Official LONGER LK4 Pro profile ID

longer.lk4_pro.custom_size  # Customized LONGER LK4 Pro profile ID with a different volume size
```

:::note
If you need to tweak just a few settings, you can duplicate a profile in app and automatically create a new custom one
:::

See API reference to view alla available configuration fields.