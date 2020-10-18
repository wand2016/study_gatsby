import React from "react"
import styled from "styled-components"

type Contents = string

type Props = {
  className?: string
  contents: Contents
}

const Toc: React.FC<Props> = ({ className, contents }) => (
  <section className={className}>
    <details>
      <summary>目次</summary>
      <div
        className="inner"
        dangerouslySetInnerHTML={{
          __html: contents,
        }}
      />
    </details>
  </section>
)

export default styled(Toc)`
  .inner > ul {
    padding-left: 2rem;
  }

  margin-bottom: 1rem;
`
