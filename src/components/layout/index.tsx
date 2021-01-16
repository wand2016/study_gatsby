import styled from "styled-components"
import React from "react"
import GlobalHeader from "@/components/layout/global-header"

import "github-markdown-css/github-markdown.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import "primereact/resources/themes/saga-blue/theme.css"
import "primereact/resources/primereact.min.css"

type Props = {
  className?: string
  location: Location
  title: string
}
const Layout: React.FC<Props> = ({ className, location, title, children }) => {
  return (
    <div className={className}>
      <GlobalHeader className="global-header" title={title} />
      <main>{children}</main>
    </div>
  )
}

export default styled(Layout)`
  margin: 0 auto;
  max-width: 960px;

  main {
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 1rem;
  }
`
