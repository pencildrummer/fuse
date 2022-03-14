import DisplayLabel from "../DisplayLabel/DisplayLabel";
import DisplayValue from "../DisplayValue/DisplayValue";
import Group from "../Group/Group";

export default function DisplayGroup({
  label,
  value,
  ...props
}) {
  return <Group {...props}>
    <DisplayLabel>{label}</DisplayLabel>
    <DisplayValue>{value}</DisplayValue>
  </Group>
}