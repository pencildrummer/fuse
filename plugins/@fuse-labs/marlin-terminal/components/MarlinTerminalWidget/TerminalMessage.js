export default function TerminalMessage({
  message,
}) {
  return (
    <div>
      <span className="font-bold text-cyan-700">device@192.168.0.0: </span>
      <span>{message}</span>
    </div>
  )
}