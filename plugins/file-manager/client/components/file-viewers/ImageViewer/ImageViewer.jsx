/* eslint-disable @next/next/no-img-element */
export default function ImageViewer({ file }) {
  return <img src={file.url} alt="" className="max-h-[500px]" />;
}
