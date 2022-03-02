import MarlinGCodeViewerWidget from '../components/MarlinGCodeViewerWidget/MarlinGCodeViewerWidget.js'
import MarlinGCodeViewerSettingsWidget from '../components/MarlinGCodeViewerSettingsWidget/MarlinGCodeViewerSettingsWidget.js'

export default function GCodeViewerPage() {
  return (<>
    <MarlinGCodeViewerWidget />
    <MarlinGCodeViewerSettingsWidget />
  </>)
}