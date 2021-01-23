import styled from "styled-components"
import React, { PropsWithChildren } from "react"
import SEO, { SEOProps } from "@/components/seo"
import GlobalHeader from "@/components/layout/global-header"
import "github-markdown-css/github-markdown.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import "primereact/resources/themes/saga-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "@/style.scss"

type Props = {
  className?: string
  pageTitle: SEOProps["pageTitle"]
  seoProps?: Omit<SEOProps, "pageTitle">
  footer?: PropsWithChildren<any>["children"]
}
const Layout: React.FC<Props> = ({
  className,
  pageTitle,
  seoProps,
  children,
  footer,
}) => {
  const mergedSeoProps: SEOProps = {
    pageTitle,
    ...seoProps,
  }
  return (
    <div className={className}>
      <div className="wrapper">
        <SEO {...mergedSeoProps} />
        <GlobalHeader className="global-header" />
        <main className="p-p-3">{children}</main>
        {footer ? <footer>{footer}</footer> : null}
      </div>
    </div>
  )
}

export default styled(Layout)`
  background-color: var(--surface-f);

  .wrapper {
    background-color: var(--surface-b);
    margin: 0 auto;
    max-width: 960px;

    > main {
      border: 1px solid var(--surface-d);
    }

    > footer {
      background-color: var(--surface-c);
      border: 1px solid var(--surface-d);
      position: sticky;
      bottom: 0;
    }
  }
`
