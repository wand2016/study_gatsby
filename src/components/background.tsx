import React, { MouseEventHandler } from "react"
import styled from "styled-components"

type Props = {
  className?: string
  show?: boolean
  onClick?: MouseEventHandler
}

const Background: React.FC<Props> = ({ className, show = false, onClick }) => {
  return <div className={className} onClick={onClick} />
}

export default styled(Background)`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transition: opacity 0.2s;
  opacity: ${({ show }) => (show ? 1 : 0)};
  pointer-events: ${({ show }) => (show ? "auto" : "none")};
`
