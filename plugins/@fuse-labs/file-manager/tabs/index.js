import FileManagerProvider from "../components/FileManagerProvider";
import FileManagerIndexTab from "../components/FileManagerIndexTab/FileManagerIndexTab";

export default function IndexPage() {

  return (
    <FileManagerProvider>
      <FileManagerIndexTab />
    </FileManagerProvider>
  )
}