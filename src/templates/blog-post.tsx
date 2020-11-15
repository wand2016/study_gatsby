import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "@/components/layout"
import SEO from "@/components/seo"
import TocMenu from "@/components/toc-menu"
import Post from "@/components/post"
import Share from "@/components/share"
import moment from "moment"

type Props = {
  data: GatsbyTypes.BlogPostBySlugQuery
  pageContext: GatsbyTypes.SitePageContext
  location: Location
}

const BlogPostTemplate: React.FC<Props> = ({ data, pageContext, location }) => {
  const post = data?.markdownRemark
  const siteTitle = data?.site?.siteMetadata?.title || `Title`
  const date = post?.frontmatter?.date
  const dateLocal = date ? moment(date).local() : undefined

  const year = dateLocal?.format("YYYY") ?? ""
  const month = dateLocal?.format("MM") ?? ""
  const day = dateLocal?.format("DD") ?? ""
  const time = dateLocal?.format("HH:mm:SS") ?? ""

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post?.frontmatter?.title ?? "no title"}
        description={post?.excerpt ?? "no description"}
      />
      <p>
        <Link to={`/time/${year}/`}>{year}</Link>/
        <Link to={`/time/${year}/${month}/`}>{month}</Link>/
        <Link to={`/time/${year}/${month}/${day}`}>{day}</Link> &nbsp;{time}
      </p>

      <Post post={post} />
      <hr />
      <Share post={post} location={location} />
      {post?.tableOfContents && <TocMenu toc={post?.tableOfContents} />}
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
