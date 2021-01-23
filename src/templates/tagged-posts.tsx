import React from "react"
import { graphql } from "gatsby"
import Posts from "@/components/posts"
import Layout from "@/components/layout"

type Props = {
  data: GatsbyTypes.TaggedPostsQuery
  pageContext: GatsbyTypes.SitePageContext
}
const TaggedPostsIndex: React.FC<Props> = ({ data, pageContext }) => {
  const tag = pageContext.tag ?? "no tag"
  const posts = data?.allMarkdownRemark?.nodes
  const pageTitle = `searched by tag ${tag}`

  return (
    <Layout pageTitle={pageTitle}>
      {pageTitle}
      <Posts posts={posts} />
    </Layout>
  )
}

export default TaggedPostsIndex

export const pageQuery = graphql`
  query TaggedPosts($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      nodes {
        excerpt
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
