import PrinterDevicePage from "../../../components/page-layouts/PrinterDevicePage";
import TemperatureWidget from "../../../plugins/@fuse-labs/marlin-temperature/components/TemperatureWidget/TemperatureWidget";

export default function PrinterTemperaturePage() {
  return (
    <PrinterDevicePage>
      <TemperatureWidget />
    </PrinterDevicePage>
  )
}