import { PaperPlaneIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Button, Widget, ScrollArea } from "../../../core-ui";
import terminal from "../../lib/client/terminal.ts";
import TerminalLine from "./TerminalMessage";

export default function MarlinTerminalWidget() {

  const scrollArea = useRef()
  const scrollAreaViewport = useRef()

  const [inputMessage, setInputMessage] = useState('')
  const [data, setData] = useState([])

  const appendData = newItem => {
    setData(data => {
      if (newItem.from == 'user') {
        // Check if already in data array
        let itemIndex = data.findIndex(item => item.id == newItem.id)
        // If server broadcasted same user message, then replace it in the array
        if (itemIndex > -1) {
          let newData = [...data]
          newData[itemIndex] = newItem
          return newData
        }
      }
      // Simply add, do not check for duplicates?
      return [...data, newItem]
    })
    // Scroll automatically to bottom of terminal window
    setTimeout(scrollToBottom, 50)
  }

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
    // Configure listeners
    let listener = (data) => appendData(data)
    terminal.onMessageReceived(listener)
    return _ => {
      terminal.offMessageReceived(listener)
    }
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()
    if (inputMessage.length) {
      // Send message to terminal
      let data = terminal.sendMessage(inputMessage)
      appendData(data)
      setInputMessage('')
    }
  }

  return <Widget title="Terminal" version="0.1" className="h-96">

    <div className="flex-1 overflow-hidden">
      <ScrollArea ref={scrollArea} className="h-full px-1 rounded-md bg-gray-800 text-gray-300 font-mono text-xs">
        {data?.map((dataItem, i) => <TerminalLine key={`line-${dataItem.id}`} data={dataItem} />)}
      </ScrollArea>
    </div>

    <form onSubmit={handleSubmit} className="flex flex-row space-x-2">
      <input type="text" 
        value={inputMessage}
        onChange={e => setInputMessage(e.target.value)}
        className={classNames(
          'w-full',
          'text-xs px-1.5 py-1',
          'rounded-md',
          'font-mono font-medium',
          'bg-gray-900 border border-gray-600 text-gray-300',
          'focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600',
        )} autoCorrect="false" autoComplete="false" spellCheck="false"/>
      <Button type="submit">
        <PaperPlaneIcon />
      </Button>
    </form>

  </Widget>
}