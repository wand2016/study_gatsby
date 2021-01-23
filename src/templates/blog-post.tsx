import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "@/components/layout"
import Post from "@/components/post"
import PostFooterMenu from "@/components/post-footer-menu"
import Toc from "@/components/toc"

type Props = {
  className?: string
  data: GatsbyTypes.BlogPostBySlugQuery
  location: Location
}

const BlogPostTemplate: React.FC<Props> = ({ className, data, location }) => {
  const post = data?.markdownRemark
  const [tocVisibility, setTocVisibility] = useState(false)
  return post ? (
    <Layout
      className={className}
      pageTitle={post?.frontmatter?.title ?? "untitled"}
      seoProps={{ description: post?.excerpt ?? "no description" }}
      footer={
        <PostFooterMenu
          location={location}
          post={post}
          onTocShown={() => setTocVisibility(true)}
        />
      }
    >
      <Post post={post} />
      {post.tableOfContents ? (
        <Toc
          content={post.tableOfContents}
          visibility={tocVisibility}
          onHide={() => setTocVisibility(false)}
        />
      ) : null}
    </Layout>
  ) : null
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      tableOfContents(
        absolute: false
        pathToSlugField: "frontmatter.path"
        maxDepth: 5
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
