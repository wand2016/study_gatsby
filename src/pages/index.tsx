import React from "react"
import { graphql } from "gatsby"
import Posts from "@/components/posts"
import Layout from "@/components/layout"
import SEO from "@/components/seo"

import "primereact/resources/themes/saga-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"

type Props = {
  data: GatsbyTypes.PageQuery
  pageContext: GatsbyTypes.SitePageContext
  location: Location
}
const PostsIndex: React.FC<Props> = ({ data, pageContext, location }) => {
  const siteTitle = data?.site?.siteMetadata?.title ?? `no siteTitle`
  const posts = data?.allMarkdownRemark?.nodes
  const seoTitle = `最新記事`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={seoTitle} />
      <Posts posts={posts} />
    </Layout>
  )
}

export default PostsIndex

export const pageQuery = graphql`
  query Page {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 10
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          date
          title
          tags
        }
      }
    }
  }
`
