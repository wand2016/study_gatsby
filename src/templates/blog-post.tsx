import React, { useState } from "react"
import { graphql, navigate } from "gatsby"
import Layout from "@/components/layout"
import SEO from "@/components/seo"
import Post from "@/components/post"
import Share from "@/components/share"
import Toc from "@/components/toc"
import DatetimeBreadCrumb from "@/components/datetime-bread-crumb"

type Props = {
  className?: string
  data: GatsbyTypes.BlogPostBySlugQuery
  location: Location
}

const BlogPostTemplate: React.FC<Props> = ({ className, data, location }) => {
  const post = data?.markdownRemark
  const siteTitle = data?.site?.siteMetadata?.title || `Title`
  const date = post?.frontmatter?.date
  const tocContent = post?.tableOfContents

  const [tocVisibility, setTocVisibility] = useState(false)

  return (
    <Layout className={className} title={siteTitle}>
      <SEO
        pageTitle={post?.frontmatter?.title}
        description={post?.excerpt ?? "no description"}
      />
      {date ? <DatetimeBreadCrumb date={date} /> : null}

      <Post post={post} />
      <hr />
      <Share post={post} location={location} />

      {tocContent ? (
        <Toc
          content={tocContent}
          visibility={tocVisibility}
          onShow={() => setTocVisibility(true)}
          onHide={() => setTocVisibility(false)}
        />
      ) : null}
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
        bibliographies
      }
    }
  }
`
