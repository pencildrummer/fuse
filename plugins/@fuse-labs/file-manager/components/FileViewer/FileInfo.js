import { Group, Label } from "../../../core-ui";
import filesize from 'filesize'
import { useIntl } from 'react-intl'

export default function FileInfo({
  file
}) {

  const { formatMessage } = useIntl()

  const metadata = {
    created_at: new Date(),
    modified_at: new Date(),

    // Image metadata
    dimensions: {
      width: 5472,
      height: 3648
    },
    resolution: 72,
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

  function parseMimeForIntl(mime) {
    return 'mime.'+mime.replace('/', '.')
  }

  return (
    <div className="flex flex-col">
      <Group>
        <span className="font-semibold text-xl">
          {file.name}.{file.ext}
        </span>
      </Group>

      <Group className="font-semibold text-gray-500">
        <span>
          {formatMessage({id: parseMimeForIntl(file.mime)})} - {filesize(file.size, { round: 1 })}
        </span>
      </Group>

      <div className="pt-5">
        <ul className="text-xs flex flex-col divide-y divide-gray-700">
          {metadata && Object.keys(metadata).map((key, i) => {
            let value = metadata[key];
            return (
            <li className="px-0.5 py-1 flex flex-row justify-between">
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