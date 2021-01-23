import React from "react"
import { Sidebar } from "primereact/sidebar"
import { Button } from "primereact/button"

type PropsType = {
  content: string
  visibility: boolean
  onShow: () => unknown
  onHide: () => unknown
}
const Toc: React.FC<PropsType> = ({ content, onShow, onHide, visibility }) => {
  return (
    <>
      <Button icon="pi pi-list" onClick={onShow} label="目次" />
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
