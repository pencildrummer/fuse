import PrinterDevicePage from "../../../components/pages/PrinterDevicePage"
import MarlinTerminalSettingsWidget from "../../../plugins/@fuse-labs/marlin-terminal/components/MarlinTerminalSettingsWidget/MarlinTerminalSettingsWidget"
import MarlinTerminalWidget from "../../../plugins/@fuse-labs/marlin-terminal/components/MarlinTerminalWidget/MarlinTerminalWidget"

export default function PrinterTerminalPage() {

  return (
    <PrinterDevicePage>
      <MarlinTerminalWidget />
      <MarlinTerminalSettingsWidget />
    </PrinterDevicePage>
  )
}