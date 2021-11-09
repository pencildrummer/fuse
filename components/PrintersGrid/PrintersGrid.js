import PrinterCard from "../PrinterCard/PrinterCard";

export default function PrintersGrid({
	printers,
}) {
	return (
		<div className="grid grid-cols-4 gap-5 p-5">
			{printers?.map(printer => <PrinterCard key={printer.id} printer={printer} />)}
		</div>
	)
}