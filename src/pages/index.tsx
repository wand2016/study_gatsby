import React from "react"
import { graphql } from "gatsby"
import Posts from "@/components/posts"
import Layout from "@/components/layout"
import SEO from "@/components/seo"

type Props = {
  data: GatsbyTypes.PageQuery
  pageContext: GatsbyTypes.SitePageContext
  location: Location
}
const PostsIndex: React.FC<Props> = ({ data, pageContext, location }) => {
  const posts = data?.allMarkdownRemark?.nodes

  return (
    <Layout pageTitle="最新記事">
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
