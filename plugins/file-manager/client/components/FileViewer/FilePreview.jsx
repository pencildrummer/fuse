import ImageViewer from "../file-viewers/ImageViewer/ImageViewer.jsx"

function getFileViewer(file) {
  // TODO - Dynamically import correct registered file previewer (maybe generate js file with all registered file viewer on plugin install?)
  switch(file.ext.replace('.', '')) {
    case 'ico':
    case 'jpeg':
    case 'jpg':
    case 'png': return <ImageViewer file={file} />
  }
}

export default function FilePreview({
  file
}) {
  return (
    <div className="flex items-center justify-center overflow-hidden">
      <div className="rounded-md overflow-hidden">
        {getFileViewer(file)}
      </div>
    </div>
  )
}