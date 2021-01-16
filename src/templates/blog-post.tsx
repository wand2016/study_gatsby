import React, { useState } from "react"
import { graphql, Link, navigate } from "gatsby"
import Layout from "@/components/layout"
import SEO from "@/components/seo"
import Background from "@/components/background"
import PostFooterMenu from "@/components/post-footer-menu"
import TocMenu from "@/components/toc-menu"
import Post from "@/components/post"
import Share from "@/components/share"
import moment from "moment"
import styled from "styled-components"
import { BreadCrumb } from "primereact/breadcrumb"
import { MenuItem } from "primereact/api"

type Props = {
  className?: string
  data: GatsbyTypes.BlogPostBySlugQuery
  pageContext: GatsbyTypes.SitePageContext
  location: Location
}

const BlogPostTemplate: React.FC<Props> = ({
  className,
  data,
  pageContext,
  location,
}) => {
  const post = data?.markdownRemark
  const siteTitle = data?.site?.siteMetadata?.title || `Title`
  const date = post?.frontmatter?.date
  const dateLocal = date ? moment(date).local() : undefined

  const year = dateLocal?.format("YYYY") ?? ""
  const month = dateLocal?.format("MM") ?? ""
  const day = dateLocal?.format("DD") ?? ""
  const time = dateLocal?.format("HH:mm:SS") ?? ""

  const breadcrumbItems: MenuItem[] = [
    {
      label: year,
      command(e: { originalEvent: Event; item: MenuItem }) {
        navigate(`/time/${year}/`)
      },
    },
    {
      label: month,
      command(e: { originalEvent: Event; item: MenuItem }) {
        navigate(`/time/${year}/${month}/`)
      },
    },
    {
      label: day,
      command(e: { originalEvent: Event; item: MenuItem }) {
        navigate(`/time/${year}/${month}/${day}/`)
      },
    },
    {
      label: time,
    },
  ]

  const home: MenuItem = {
    icon: "pi pi-calendar",
    async command(e: { originalEvent: Event; item: MenuItem }) {
      await navigate("/calendar")
    },
  }

  const [tocVisibility, setTocVisibility] = useState(false)

  return (
    <Layout className={className} location={location} title={siteTitle}>
      <SEO
        title={post?.frontmatter?.title ?? "no title"}
        description={post?.excerpt ?? "no description"}
      />
      <BreadCrumb model={breadcrumbItems} home={home} />

      <Post post={post} />
      <hr />
      <Share post={post} location={location} />

      <Background
        show={tocVisibility}
        onClick={() => setTocVisibility(false)}
      />
      <PostFooterMenu>
        {post?.tableOfContents ? (
          <>
            <TocMenu show={tocVisibility} content={post?.tableOfContents} />
            <button
              type="button"
              className="toc-button"
              onClick={() => setTocVisibility(!tocVisibility)}
            >
              {tocVisibility ? "▼" : "▲"}目次
            </button>
          </>
        ) : null}
      </PostFooterMenu>
    </Layout>
  )
}

export default styled(BlogPostTemplate)`
  .toc-button {
    cursor: pointer;
    box-shadow: silver 0 0 1em;
    border: none;
    background-color: silver;
    line-height: 1;
    height: 2em;
    padding: 0.5em;
    border-radius: 1em;
    white-space: nowrap;
    position: absolute;
    display: inline-block;
    left: 1em;
    bottom: 1em;
    pointer-events: auto;
  }
`

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
