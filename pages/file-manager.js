import Page from 'plugins/@fuse-labs/file-manager/pages/index.js'
import MainLayout from '../components/layouts/MainLayout'

export default function FileManagerPage(props) {
  // TODO: Dynamically import from [page].js
  return <MainLayout>
    <Page {...props} />
  </MainLayout>
}