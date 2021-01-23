import React from "react"
import { graphql } from "gatsby"
import Posts from "@/components/posts"
import Layout from "@/components/layout"
import SEO from "@/components/seo"

type Props = {
  data: GatsbyTypes.TaggedPostsQuery
  pageContext: GatsbyTypes.SitePageContext
}
const TaggedPostsIndex: React.FC<Props> = ({ data, pageContext }) => {
  const tag = pageContext.tag ?? "no tag"
  const siteTitle = data?.site?.siteMetadata?.title ?? `no siteTitle`
  const posts = data?.allMarkdownRemark?.nodes
  const seoTitle = `searched by tag ${tag}`

  return (
      <SEO title={seoTitle} />
      {`Searched by tag "${tag}"`}
    <Layout title={siteTitle}>
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
