import { PaperPlaneIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Button, Widget, ScrollArea } from "../../../core-ui";
import terminal from "../../lib/client/terminal.ts";
import TerminalMessage from "./TerminalMessage";

export default function MarlinTerminalWidget() {

  const scrollArea = useRef()
  const scrollAreaViewport = useRef()

  const [inputMessage, setInputMessage] = useState('')
  const [messages, setMessages] = useState([])

  const appendMessage = msg => {
    setMessages(messages => [...messages, msg])
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
    let listener = (message) => appendMessage(message)
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
      terminal.sendMessage(inputMessage)
      setInputMessage('')
    }
  }

  return <Widget title="Terminal" version="0.1" className="h-96">

    <div className="flex-1 overflow-hidden">
      <ScrollArea ref={scrollArea} className="h-full px-1 rounded-md bg-gray-800 text-gray-300 font-mono text-xs">
        {messages?.map((msg, i) => <TerminalMessage key={`message-${i}`} message={msg} />)}
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