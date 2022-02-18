import { PaperPlaneIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { Button } from "plugins/@fuse-labs/core-ui";
import { InputRaw } from "plugins/@fuse-labs/core-ui/components/shared/Input/Input";
import { useState } from "react";
import { useTerminalContext } from "./TerminalProvider";

export default function TerminalPrompt() {

  const { terminal, appendData } = useTerminalContext()
  const [inputMessage, setInputMessage] = useState('')

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
  
  return (
    <form onSubmit={handleSubmit} className="flex flex-row space-x-2">
      <InputRaw type="text" 
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
  )
}