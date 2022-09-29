import { Group, Label, ScrollArea, CheckboxRaw } from "@fuse-labs/core-ui";
import { useEffect, useRef } from "react";
import TerminalLine from "./TerminalLine";
import { useTerminalContext } from "./TerminalProvider";

export default function TerminalWindow() {

  const { terminal, data, appendData, autoscroll, setAutoscroll } = useTerminalContext()

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
      setTimeout(_ => {
        scrollToBottom()
        setAutoscroll(true)
      }, 50)
    }
  }, [autoscroll, data, setAutoscroll])

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
  }, [appendData, terminal])

  function handleScroll(e) {
    if (autoscroll) {
      setAutoscroll(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col space-y-3 overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <ScrollArea ref={scrollArea} className="h-full px-1 rounded-md bg-gray-800 text-gray-200 font-semibold font-mono text-xs"
          onScroll={handleScroll}>
          {data?.map((dataItem, i) =>
            <TerminalLine key={`line-${dataItem.id}`} data={dataItem} />)
          }
        </ScrollArea>
      </div>
      <Group className="!justify-start text-xs font-normal">
        <CheckboxRaw checked={autoscroll} onCheckedChange={setAutoscroll} />
        <Label >Scroll automatically to bottom on new message</Label>
      </Group>
    </div>
  )
}