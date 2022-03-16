import MarlinGCodeViewerWidget from '../client/components/MarlinGCodeViewerWidget/MarlinGCodeViewerWidget'
import MarlinGCodeViewerSettingsWidget from '../client/components/MarlinGCodeViewerSettingsWidget/MarlinGCodeViewerSettingsWidget'

export default function GCodeViewerPage() {
  return (<>
    <MarlinGCodeViewerWidget />
    <MarlinGCodeViewerSettingsWidget />
  </>)
}