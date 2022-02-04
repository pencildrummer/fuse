import DeviceConnectionWidget from "../../../components/DeviceSettings/DeviceConnectionWidget/DeviceConnectionWidget";
import PrinterDevicePage from "../../../components/page-layouts/PrinterDevicePage";
import PrinterProfileWidget from "../../../plugins/@fuse-labs/marlin-core/components/PrinterProfileWidget/PrinterProfileWidget";

export default function ConfigPage() {
  return (
    <PrinterDevicePage>
      <DeviceConnectionWidget />
      <PrinterProfileWidget />
    </PrinterDevicePage>
  )
}