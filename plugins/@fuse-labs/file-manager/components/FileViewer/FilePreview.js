import ImageViewer from "../file-viewers/image/ImageViewer"

function getFileViewer(file) {
  // TODO - Dynamically import correct registered file previewer (maybe generate js file with all registered file viewer on plugin install?)
  switch(file.type) {
    case 'image': return <ImageViewer file={file} />
  }
}

export default function FilePreview({
  file
}) {
  console.log(file)
  return (
    <div className="flex items-center justify-center overflow-hidden">
      <div className="rounded-md overflow-hidden">
        {getFileViewer(file)}
      </div>
    </div>
  )
}