import PrinterDevicePage from "../../../components/page-layouts/PrinterDevicePage";
import ExtruderWidget from "../../../plugins/@fuse-labs/marlin-extruder/components/ExtruderWidget/ExtruderWidget";
import MarlinMiscWidget from "../../../plugins/@fuse-labs/marlin-extra/components/MarlinMiscWidget/MarlinMiscWidget";
import FeedRateWidget from "../../../plugins/@fuse-labs/marlin-move/components/FeedRateWidget/FeedRateWidget";
import MoveWidget from "../../../plugins/@fuse-labs/marlin-move/components/MoveWidget/MoveWidget";

export default function PrinterMovePage() {
  return (
    <PrinterDevicePage>
      <div className="grid gap-2 grid-cols-3">
        <div className="space-y-2">
          <MoveWidget />
          <FeedRateWidget />
        </div>
        <ExtruderWidget />
        <MarlinMiscWidget />
      </div>
    </PrinterDevicePage>
  )
}