import { ScrollArea } from "plugins/@fuse-labs/core-ui";
import { useEffect, useRef } from "react";
import TerminalLine from "./TerminalLine";
import { useTerminalContext } from "./TerminalProvider";

export default function TerminalWindow({
  autoscroll
}) {

  const { terminal, data, appendData } = useTerminalContext()

  const scrollArea = useRef()
  const scrollAreaViewport = useRef()

  function scrollToBottom() {
    // Scroll to bottom of scrollArea
    if (scrollArea.current) {
      if (!scrollAreaViewport.current) {
        scrollAreaViewport.current = Array.from(scrollArea.current.children).find(e => e.hasAttribute('data-radix-scroll-area-viewport'))
      }
      scrollAreaViewport.current.scrollTop = scrollAreaViewport.current.scrollHeight
    }
  }

  useEffect(_ => {
    // Scroll automatically to bottom of terminal window
    if (autoscroll) {
      setTimeout(scrollToBottom, 50)
    }
  }, [data])

  /**
   * Attach listener for incoming messages to be displayed
   */
  useEffect(_ => {
    if (!terminal) return
    // Configure listeners for socket terminal communication
    let listener = (data) => appendData(data)
    terminal.onMessageReceived(listener)
    // Return cleanup to remove listener on unmount
    return _ => terminal.offMessageReceived(listener)
  }, [terminal])

  return (
    <div className="flex-1 overflow-hidden">
      <ScrollArea ref={scrollArea} className="h-full px-1 rounded-md bg-gray-800 text-gray-200 font-semibold font-mono text-xs">
        {data?.map((dataItem, i) =>
          <TerminalLine key={`line-${dataItem.id}`} data={dataItem} />)
        }
      </ScrollArea>
    </div>
  )
}