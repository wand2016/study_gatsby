import React from "react"
import { Sidebar } from "primereact/sidebar"

type PropsType = {
  content: string
  visibility: boolean
  onHide: () => unknown
}
const Toc: React.FC<PropsType> = ({ content, onHide, visibility }) => {
  return (
    <>
      <Sidebar
        visible={visibility}
        onHide={onHide}
        position="right"
        blockScroll={true}
        style={{ overflowY: "scroll" }}
      >
        <section className="toc" key={Date()}>
          <header>目次</header>
          <p dangerouslySetInnerHTML={{ __html: content }} />
        </section>
      </Sidebar>
    </>
  )
}

export default Toc
