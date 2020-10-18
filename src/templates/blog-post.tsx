import React from "react"
import { graphql } from "gatsby"
import Layout from "@/components/layout"
import SEO from "@/components/seo"
import PostNav from "@/components/post-nav"
import Post from "@/components/post"
import Share from "@/components/share"

type Props = {
  data: GatsbyTypes.BlogPostBySlugQuery
  pageContext: GatsbyTypes.SitePageContext
  location: Location
}

const BlogPostTemplate: React.FC<Props> = ({ data, pageContext, location }) => {
  const post = data?.markdownRemark
  const siteTitle = data?.site?.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post?.frontmatter?.title ?? "no title"}
        description={post?.excerpt ?? "no description"}
      />
      <Post post={post} />
      <hr />
      <Share post={post} location={location} />
      <PostNav previous={pageContext.previous} next={pageContext.next} />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      tableOfContents(
        absolute: false
        pathToSlugField: "frontmatter.path"
        maxDepth: 3
      )
      frontmatter {
        title
        date
        tags
        bibliography
      }
    }
  }
`
