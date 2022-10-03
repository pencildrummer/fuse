import FileManagerProvider from '../components/FileManagerProvider/FileManagerProvider.jsx'
import FileManagerIndexTab from "../components/FileManagerIndexTab/FileManagerIndexTab.jsx";

export default function IndexPage() {

  return (
    <FileManagerProvider>
      <FileManagerIndexTab />
    </FileManagerProvider>
  )
}