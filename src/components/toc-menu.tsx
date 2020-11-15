import React from "react"
import styled from "styled-components"

type Props = {
  className?: string
  content: string
  show?: boolean
}

const TocMenu: React.FC<Props> = ({ className, content, show = false }) => {
  return (
    <header className={className}>
      <section className="toc" key={Date()}>
        <header>目次</header>
        <p dangerouslySetInnerHTML={{ __html: content }} />
      </section>
    </header>
  )
}

export default styled(TocMenu)`
  .toc {
    padding: 1em;
    margin-left: auto;
    margin-right: auto;
    max-height: 80vh;
    overflow-x: hidden;
    overflow-y: auto;
    display: inline-height;
    background-color: white;
    border-radius: 1em;
    transition: opacity 0.2s;
    position: fixed;
    bottom: 1em;
    width: 100%;

    opacity: ${({ show }) => (show ? 1 : 0)};
    pointer-events: ${({ show }) => (show ? "auto" : "none")};
  }
`
