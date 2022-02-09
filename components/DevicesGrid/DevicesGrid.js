import DeviceCard from "../DeviceCard/DeviceCard";

export default function DevicesGrid({
	devices,
}) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3">
			{devices?.map(device => <DeviceCard key={device.id} device={device} />)}
		</div>
	)
}