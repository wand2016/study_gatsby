import React from "react"
import { graphql } from "gatsby"

import Layout from "@/components/layout"
import SEO from "@/components/seo"

type Props = {
  data: GatsbyTypes.NotFoundPageQuery
  location: Location
}

const NotFoundPage: React.FC<Props> = ({ data, location }) => {
  const siteTitle = data?.site?.siteMetadata?.title ?? "no title"

  return (
    <Layout title={siteTitle}>
      <SEO pageTitle="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query NotFoundPage {
    site {
      siteMetadata {
        title
      }
    }
  }
`
