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
    <footer className={className}>
      <div
        className={grayoutClassNames}
        onClick={() => {
          setTocVisibility(false)
        }}
      />
      <div className="wrapper">
        <section className={tocClassNames}>
          <header>目次</header>
          <p dangerouslySetInnerHTML={{ __html: toc }} />
        </section>
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
    </footer>
  )
}

export default styled(TocMenu)`
  .gray-out {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: opacity 0.2s;
    opacity: 0;
    pointer-events: none;
  }
  .gray-out.toc-visible {
    opacity: 1;
    pointer-events: auto;
  }

  .wrapper {
    width: 100vw;
    max-width: var(--maxWidth-wrapper);
    position: fixed;
    bottom: 0;
    left: 50vw;
    transform: translate(-50%);

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
      bottom: 0;
      pointer-events: none;

      .toc-button {
        cursor: pointer;
        box-shadow: silver 0 0 1em;
        border: none;
        background-color: silver;
        line-height: 1;
        height: 2em;
        padding: 0.5em;
        border-radius: 1em;
        white-space: nowrap;
        position: absolute;
        display: inline-block;
        left: 1em;
        bottom: 1em;
        pointer-events: auto;
      }
    }
  }
`
