import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "@/components/layout"
import Post from "@/components/post"
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LineShareButton,
  LineIcon,
} from "react-share"
import Toc from "@/components/toc"

type Props = {
  className?: string
  data: GatsbyTypes.BlogPostBySlugQuery
  location: Location
}

type Just<T> = T extends undefined ? never : T
type PostFooterMenuPropsType = {
  location: Location
  post: Just<GatsbyTypes.BlogPostBySlugQuery["markdownRemark"]>
}
const PostFooterMenu: React.FC<PostFooterMenuPropsType> = ({
  location,
  post,
}) => {
  const [tocVisibility, setTocVisibility] = useState(false)
  const url = location.href
  const iconSize = 28

  return (
    <footer className="p-p-3">
      <div className="p-d-flex">
        <div className="p-d-inline-flex">
          <TwitterShareButton url={url} title={post?.frontmatter?.title}>
            <TwitterIcon round size={iconSize} />
          </TwitterShareButton>
        </div>
        <div className="p-d-inline-flex p-ml-2">
          <FacebookShareButton url={url} quote={post?.excerpt}>
            <FacebookIcon round size={iconSize} />
          </FacebookShareButton>
        </div>
        <div className="p-d-inline-flex p-ml-2">
          <LineShareButton url={url}>
            <LineIcon round size={iconSize} />
          </LineShareButton>
        </div>
        {post.tableOfContents ? (
          <div className="p-d-inline-flex p-ml-auto">
            <Toc
              content={post.tableOfContents}
              visibility={tocVisibility}
              onShow={() => setTocVisibility(true)}
              onHide={() => setTocVisibility(false)}
            />
          </div>
        ) : null}
      </div>
    </footer>
  )
}

const BlogPostTemplate: React.FC<Props> = ({ className, data, location }) => {
  const post = data?.markdownRemark

  return post ? (
    <Layout
      className={className}
      pageTitle={post?.frontmatter?.title ?? "untitled"}
      seoProps={{ description: post?.excerpt ?? "no description" }}
      footer={<PostFooterMenu location={location} post={post} />}
    >
      <Post post={post} />
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
