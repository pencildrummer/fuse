import classNames from "classnames"
import { useEffect, useState } from "react"

function TerminalSpinner() {
  const frames = [
    "⣾",
    "⣽",
    "⣻",
    "⢿",
    "⡿",
    "⣟",
    "⣯",
    "⣷"
  ]

  const [frame, setFrame] = useState(0)

  useEffect(_ => {
    let timer = setInterval(_ => setFrame(frame => frame >= frames.length-1 ? 0 : frame+1), 80)
    return _ => clearInterval(timer)
  })

  return frames[frame]
}

export default function TerminalLine({
  data,
}) {

  const { message, from, received } = data

  return (
    <div>
      <span className={classNames(
        'font-bold',
        'whitespace-pre',
        {
          'text-purple-500': from == 'user',
          'text-cyan-400': from == 'server',
          'text-amber-400': from == 'device',
        }
      )}>
        {from == 'user' &&   'user  '}
        {from == 'server' && 'server'}
        {from == 'device' && 'device'}
        <span> </span>
        {from == 'user' && !received ? <TerminalSpinner /> : '>'}
        <span> </span>
      </span>
      <span>{message}</span>
    </div>
  )
}