import { Widget } from "../../..";
import PluginListItem from "./PluginListItem";

export default function PluginsList({
  plugins,
  ...props
}) {

  return <Widget title="Installed plugins">
    <ul className="flex flex-col divide-y divide-gray-700">
      {plugins?.map((plugin, i) => 
        <PluginListItem key={`plugin-${i}`} plugin={plugin} />
      )}
    </ul>
  </Widget>
}