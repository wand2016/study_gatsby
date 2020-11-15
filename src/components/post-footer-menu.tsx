import React from "react"
import styled from "styled-components"

type Props = {
  className?: string
}

const PostFooterMenu: React.FC<Props> = ({ className, children }) => {
  return (
    <footer className={className}>
      <nav>{children}</nav>
    </footer>
  )
}

export default styled(PostFooterMenu)`
  nav {
    width: 100vw;
    max-width: var(--maxWidth-wrapper);
    position: fixed;
    bottom: 0;
    left: 50vw;
    transform: translate(-50%);
`
