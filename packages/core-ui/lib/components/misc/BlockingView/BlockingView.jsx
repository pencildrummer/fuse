import React from "react"

export default function BlockingView(props) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {props.children}
    </div>
  )
}