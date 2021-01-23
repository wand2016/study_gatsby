import React from "react"
import { graphql } from "gatsby"
import Layout from "@/components/layout"

type Props = {
  data: GatsbyTypes.NotFoundPageQuery
  location: Location
}

const NotFoundPage: React.FC<Props> = ({ data, location }) => {
  return (
    <Layout pageTitle="404: Not Found">
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
