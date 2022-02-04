import { Widget } from "../../../core-ui";
import PluginListItem from "./PluginListItem";

export default function PluginsList({
  plugins,
  ...props
}) {

  return <Widget>
    <ul className="flex flex-col divide-y divide-gray-700">
      {plugins?.map((plugin, i) => 
        <PluginListItem key={`plugin-${i}`} plugin={plugin} />
      )}
    </ul>
  </Widget>
}