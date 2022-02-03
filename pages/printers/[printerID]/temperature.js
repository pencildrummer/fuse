import PrinterDevicePage from "../../../components/pages/PrinterDevicePage";
import TemperatureWidget from "../../../plugins/@fuse-labs/marlin-temp/components/TemperatureWidget/TemperatureWidget";

export default function PrinterTemperaturePage() {
  return (
    <PrinterDevicePage>
      <TemperatureWidget />
    </PrinterDevicePage>
  )
}