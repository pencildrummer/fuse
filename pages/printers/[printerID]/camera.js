import PrinterDevicePage from "../../../components/pages/PrinterDevicePage";
import CameraSettingsWidget from "../../../plugins/@fuse-labs/camera/components/CameraSettingsWidget/CameraSettingsWidget";
import CameraWidget from "../../../plugins/@fuse-labs/camera/components/CameraWidget/CameraWidget";

export default function PrinterCameraPage() {
  return (
    <PrinterDevicePage>
      <CameraWidget />
      <CameraSettingsWidget />
    </PrinterDevicePage>
  )
}