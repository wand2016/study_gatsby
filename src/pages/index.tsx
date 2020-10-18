import React from "react"
import { graphql } from "gatsby"
import Posts from "@/components/posts"
import Bio from "@/components/bio"
import Layout from "@/components/layout"
import SEO from "@/components/seo"

type Props = {
  data: GatsbyTypes.PageQuery
  pageContext: GatsbyTypes.SitePageContext
  location: Location
}
const PostsIndex: React.FC<Props> = ({ data, pageContext, location }) => {
  const siteTitle = data?.site?.siteMetadata?.title ?? `no siteTitle`
  const posts = data?.allMarkdownRemark?.nodes
  const seoTitle = `all posts`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={seoTitle} />
      <Bio />
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
