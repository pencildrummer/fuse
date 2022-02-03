import { useRouter } from "next/router"
import DevicePage from "./DevicePage"

export default function PrinterDevicePage(props) {
  const router = useRouter()
  const { printerID } = router.query
  return <DevicePage deviceID={printerID} {...props}/>
}