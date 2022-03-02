import { DisplayGroup, Separator, Group } from "@fuse-labs/core-ui";

export default function FDMPrinterDeviceProfilePreview({
  profile
}) {
  return <>

    <DisplayGroup label="X (Width)" value={profile.volume.width} />
    <DisplayGroup label="Y (Depth)" value={profile.volume.depth} />
    <DisplayGroup label="Z (Height)" value={profile.volume.height} />
    <DisplayGroup label="Form factor" value={profile.volume.formFactor} />
    <DisplayGroup label="Heated bed" value={profile.bed?.heated ? 'Yes' : 'No'} />
    <DisplayGroup label="Origin" value={profile.volume.origin} />

    <Separator />

    <DisplayGroup label="GCode version" value={profile.gCodeVersion} />

    <Separator />

    <DisplayGroup label="Feedrate max X" value={profile.xAxis?.maxSpeed} />
    <DisplayGroup label="Feedrate max Y" value={profile.yAxis?.maxSpeed} />
    <DisplayGroup label="Feedrate max Z" value={profile.zAxis?.maxSpeed} />

    <Separator />
    
    <DisplayGroup label="Extruders" value={profile.extruders?.length || 0} />
    {profile.extruders?.map((extruder, i) => (
      <Group key={`extruder-${i}`} orientation="vertical">
        <DisplayGroup label="Nozzle diameter" value={extruder.nozzleDiameter} />
        <DisplayGroup label="X offset" value={extruder.xOffset} />
        <DisplayGroup label="Y offset" value={extruder.yOffset} />
      </Group>
    ))}
  </>
}