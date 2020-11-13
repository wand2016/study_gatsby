import React, { useState } from "react"
import styled from "styled-components"
import ClassNames from "classnames"

type Props = {
  className?: string
  toc: string
}

const TocMenu: React.FC<Props> = ({ className, toc }) => {
  const [tocVisible, setTocVisibility] = useState<boolean>(false)

  const grayoutClassNames = ClassNames({
    "gray-out": true,
    "toc-visible": tocVisible,
  })
  const tocClassNames = ClassNames({
    toc: true,
    "toc-visible": tocVisible,
  })
  const tocButtonClassNames = ClassNames({
    "toc-button": true,
    "toc-visible": tocVisible,
  })

  return (
    <div className={className}>
      <div
        className={grayoutClassNames}
        onClick={() => {
          setTocVisibility(false)
        }}
      />
      <div className={tocClassNames}>
        <header>目次</header>
        <section>{<div dangerouslySetInnerHTML={{ __html: toc }} />}</section>
      </div>
      <nav>
        <button
          type="button"
          className={tocButtonClassNames}
          onClick={() => {
            setTocVisibility(!tocVisible)
          }}
        >
          {tocVisible ? "▼" : "▲"}目次
        </button>
      </nav>
    </div>
  )
}

export default styled(TocMenu)`
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;

  .gray-out {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
    transition: opacity 0.2s;
    opacity: 0;
    pointer-events: none;
  }
  .gray-out.toc-visible {
    opacity: 1;
    pointer-events: auto;
  }

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
    opacity: 0;
    pointer-events: none;
    position: fixed;
    bottom: 1em;
    left: 1em;
    right: 1em;
  }
  .toc.toc-visible {
    opacity: 1;
    pointer-events: auto;
  }

  nav {
    position: fixed;
    bottom: 0;
    pointer-events: none;

    .toc-button {
      box-shadow: silver 0 0 1em;
      border: none;
      background-color: silver;
      line-height: 1;
      height: 2em;
      padding: 0.5em;
      border-radius: 1em;
      position: fixed;
      left: 1em;
      bottom: 1em;
      pointer-events: auto;
    }
  }
`
