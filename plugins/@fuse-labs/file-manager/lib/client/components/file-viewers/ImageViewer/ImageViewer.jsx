/* eslint-disable @next/next/no-img-element */
export default function ImageViewer({
  file
}) {
  return <img src={file.path} alt=""/>
}