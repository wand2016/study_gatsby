import React, { useState } from "react"
import { graphql, navigate } from "gatsby"
import Layout from "@/components/layout"
import SEO from "@/components/seo"
import Post from "@/components/post"
import Share from "@/components/share"
import DatetimeBreadCrumb from "@/components/datetime-bread-crumb"
import { Sidebar } from "primereact/sidebar"
import { Button } from "primereact/button"

type Props = {
  className?: string
  data: GatsbyTypes.BlogPostBySlugQuery
  location: Location
}

const BlogPostTemplate: React.FC<Props> = ({ className, data, location }) => {
  const post = data?.markdownRemark
  const siteTitle = data?.site?.siteMetadata?.title || `Title`
  const date = post?.frontmatter?.date

  const [tocVisibility, setTocVisibility] = useState(false)

  return (
    <Layout className={className} location={location} title={siteTitle}>
      <SEO
        title={post?.frontmatter?.title ?? "no title"}
        description={post?.excerpt ?? "no description"}
      />
      {date ? <DatetimeBreadCrumb date={date} /> : null}

      <Post post={post} />
      <hr />
      <Share post={post} location={location} />

      {post?.tableOfContents ? (
        <>
          <Button
            icon="pi pi-list"
            onClick={() => setTocVisibility(true)}
            label="目次"
          />
          <Sidebar
            visible={tocVisibility}
            onHide={() => setTocVisibility(false)}
            position="right"
            blockScroll={true}
            style={{ overflowY: "scroll" }}
          >
            <section className="toc" key={Date()}>
              <header>目次</header>
              <p dangerouslySetInnerHTML={{ __html: post?.tableOfContents }} />
            </section>
          </Sidebar>
        </>
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
