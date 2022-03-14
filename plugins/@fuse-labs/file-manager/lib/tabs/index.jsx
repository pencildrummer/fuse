import FileManagerProvider from '../client/components/FileManagerProvider/FileManagerProvider'
import FileManagerIndexTab from "../client/components/FileManagerIndexTab/FileManagerIndexTab";

export default function IndexPage() {

  return (
    <FileManagerProvider>
      <FileManagerIndexTab />
    </FileManagerProvider>
  )
}