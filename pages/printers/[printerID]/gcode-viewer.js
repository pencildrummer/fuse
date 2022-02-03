import PrinterDevicePage from "../../../components/pages/PrinterDevicePage";
import MarlinGCodeViewerSettingsWidget from "../../../plugins/@fuse-labs/marlin-gcode-viewer/components/MarlinGCodeViewerSettingsWidget/MarlinGCodeViewerSettingsWidget";
import MarlinGCodeViewerWidget from "../../../plugins/@fuse-labs/marlin-gcode-viewer/components/MarlinGCodeViewerWidget/MarlinGCodeViewerWidget";

export default function PrinterGCodeViewerPage() {
  return (
    <PrinterDevicePage>
      <MarlinGCodeViewerWidget />
      <MarlinGCodeViewerSettingsWidget />
    </PrinterDevicePage>
  )
}