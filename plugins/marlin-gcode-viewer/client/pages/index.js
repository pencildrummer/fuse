import MarlinGCodeViewerWidget from "../components/MarlinGCodeViewerWidget/MarlinGCodeViewerWidget";
import MarlinGCodeViewerSettingsWidget from "../components/MarlinGCodeViewerSettingsWidget/MarlinGCodeViewerSettingsWidget";

export default function GCodeViewerPage() {
  return (
    <>
      <MarlinGCodeViewerWidget />
      <MarlinGCodeViewerSettingsWidget />
    </>
  );
}
