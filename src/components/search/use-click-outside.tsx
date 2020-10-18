import React, { useEffect } from "react"

type EventName = ("mousedown" | "touchstart") &
  keyof GlobalEventHandlersEventMap
type Event = GlobalEventHandlersEventMap[EventName]
const eventNames: EventName[] = ["mousedown", "touchstart"]

export default (
  ref: React.RefObject<HTMLDivElement>,
  onClickOutside: (...args: any[]) => any
) => {
  const isNode = (target: any): target is Node => target instanceof Node
  const isOutside = (element: Node) =>
    !ref.current || !ref.current.contains(element)
  const onClick = (event: Event) => {
    if (!isNode(event.target)) {
      return
    }
    if (isOutside(event.target)) {
      onClickOutside()
    }
  }

  useEffect(() => {
    for (const eventName of eventNames) {
      document.addEventListener(eventName, onClick)
    }

    return () => {
      for (const eventName of eventNames) {
        document.removeEventListener(eventName, onClick)
      }
    }
  })
}
