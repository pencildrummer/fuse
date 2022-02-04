import { PaperPlaneIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { Button, Widget } from "../../../core-ui";
import ScrollArea from "../../../core-ui/components/shared/ScrollArea/ScrollArea";

export default function MarlinTerminalWidget() {

  const scrollArea = useRef()
  const scrollAreaViewport = useRef()
  const [rxBuffer, setRxBuffer] = useState([])

  useEffect(_ => {
    let timer
    const addText = _ => {
      let rxText = 'Random text'
      setRxBuffer(rxBuffer => [...rxBuffer, rxText])

      // Scroll to bottom of scrollArea
      if (scrollArea.current) {
        if (!scrollAreaViewport.current) {
          scrollAreaViewport.current = Array.from(scrollArea.current.children).find(e => e.hasAttribute('data-radix-scroll-area-viewport'))
        }
        scrollAreaViewport.current.scrollTop = scrollAreaViewport.current.scrollHeight
      }

      // Restart faker
      timer = setTimeout(addText, Math.floor(Math.random() * 4)*350)
    }
    timer = setTimeout(addText, 1000)
    addText()
    return _ => clearTimeout(timer)
  }, [])

  return <Widget title="Terminal" version="0.1" className="h-96">

    <div className="flex-1 overflow-hidden">
      <ScrollArea ref={scrollArea} className="h-full px-1 rounded-md bg-gray-800 text-gray-300 font-mono text-xs">
        {rxBuffer?.map((buf, i) => 
          <div key={i}>
            <span className="font-bold text-cyan-700">device@192.168.0.0: </span>{buf}
          </div>
        )}
      </ScrollArea>
    </div>
    <div className="flex flex-row space-x-2">
      <input type="text" className={classNames(
        'w-full',
        'text-xs px-1.5 py-1',
        'rounded-md',
        'font-mono font-medium',
        'bg-gray-900 border border-gray-600 text-gray-300',
        'focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600',
      )} autoCorrect="false" autoComplete="false" spellCheck="false"/>
      <Button>
        <PaperPlaneIcon />
      </Button>
    </div>

  </Widget>
}