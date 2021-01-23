import React from "react"
import { Sidebar } from "primereact/sidebar"
import styled from "styled-components"

type PropsType = {
  className?: string
  content: string
  visibility: boolean
  onHide: () => unknown
}
const Toc: React.FC<PropsType> = ({
  className,
  content,
  onHide,
  visibility,
}) => {
  return (
    <div className={className}>
      <Sidebar
        visible={visibility}
        onHide={onHide}
        position="right"
        blockScroll={true}
        style={{ overflowY: "scroll" }}
      >
        <section className="toc" key={Date()}>
          <h3>目次</h3>
          <p dangerouslySetInnerHTML={{ __html: content }} />
        </section>
      </Sidebar>
    </div>
  )
}

export default styled(Toc)`
  ul {
    padding-inline-start: 1.5em;
    li {
      line-height: 1.5;
      > p {
        margin-block-start: 0;
        margin-block-end: 0;
      }
    }
  }
`
