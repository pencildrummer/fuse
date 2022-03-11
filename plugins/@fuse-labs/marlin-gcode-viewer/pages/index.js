import MarlinGCodeViewerWidget from '../client/components/MarlinGCodeViewerWidget/MarlinGCodeViewerWidget.js'
import MarlinGCodeViewerSettingsWidget from '../client/components/MarlinGCodeViewerSettingsWidget/MarlinGCodeViewerSettingsWidget.js'

export default function GCodeViewerPage() {
  return (<>
    <MarlinGCodeViewerWidget />
    <MarlinGCodeViewerSettingsWidget />
  </>)
}