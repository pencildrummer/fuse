import { Group, Label } from "../../../core-ui";
import filesize from 'filesize'
import { useIntl } from 'react-intl'

export default function FileInfo({
  file
}) {

  const { formatMessage } = useIntl()

  const metadata = {
    created_at: new Date(file.birthtimeMs),
    modified_at: new Date(file.mtimeMs),

    // Image metadata
    dimensions: {
      width: 5472,
      height: 3648
    },
    resolution: 72,
  }

  function formatFileType(file) {

    function parseMimeForIntl(mime) {
      return 'mime.'+mime.replace('/', '.')
    }

    if (!file.mime) 
      return formatMessage({ id: 'unknown-file-type', defaultMessage: 'Unknown file type'})
    return formatMessage({id: parseMimeForIntl(file.mime)})
  }

  // TODO - Move into plugin file meta parser
  function parseMeta(key, value) {
    if (key == 'dimensions') {
      return value.width+'x'+value.height
    } else if (value instanceof Date) {
      return value.toString()
    } else {
      return value
    }
  }

  return (
    <div className="flex flex-col">
      <Group>
        <span className="font-semibold text-xl">
          {file.name}
        </span>
      </Group>

      <Group className="font-semibold text-gray-500">
        <span>
          {formatFileType(file)} - {filesize(file.size, { round: 1 })}
        </span>
      </Group>

      <div className="pt-5">
        <ul className="text-xs flex flex-col divide-y divide-gray-700">
          {metadata && Object.keys(metadata).map((key, i) => {
            let value = metadata[key];
            return (
            <li key={key} className="px-0.5 py-1 flex flex-row justify-between">
              <span className="font-semibold text-gray-500">
                {key}
              </span>
              <span className="font-semibold text-gray-300">
                {parseMeta(key, value)}
              </span>
            </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}