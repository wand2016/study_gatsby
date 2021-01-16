import React, { useState } from "react"
import { graphql, navigate } from "gatsby"
import Layout from "@/components/layout"
import SEO from "@/components/seo"
import Post from "@/components/post"
import Share from "@/components/share"
import moment from "moment"
import { BreadCrumb } from "primereact/breadcrumb"
import { MenuItem } from "primereact/api"
import { Sidebar } from "primereact/sidebar"
import { Button } from "primereact/button"

type Props = {
  className?: string
  data: GatsbyTypes.BlogPostBySlugQuery
  pageContext: GatsbyTypes.SitePageContext
  location: Location
}

const DatetimeBreadCrumb: React.FC<{ date: string | undefined }> = ({
  date,
}) => {
  const dateLocal = date ? moment(date).local() : undefined

  const year = dateLocal?.format("YYYY") ?? ""
  const month = dateLocal?.format("MM") ?? ""
  const day = dateLocal?.format("DD") ?? ""
  const time = dateLocal?.format("HH:mm:SS") ?? ""

  const breadcrumbItems: MenuItem[] = [
    {
      label: year,
      async command(e: { originalEvent: Event; item: MenuItem }) {
        await navigate(`/time/${year}/`)
      },
    },
    {
      label: month,
      async command(e: { originalEvent: Event; item: MenuItem }) {
        await navigate(`/time/${year}/${month}/`)
      },
    },
    {
      label: day,
      async command(e: { originalEvent: Event; item: MenuItem }) {
        await navigate(`/time/${year}/${month}/${day}/`)
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
  return <BreadCrumb model={breadcrumbItems} home={home} />
}

const BlogPostTemplate: React.FC<Props> = ({
  className,
  data,
  pageContext,
  location,
}) => {
  const post = data?.markdownRemark
  const siteTitle = data?.site?.siteMetadata?.title || `Title`

  const [tocVisibility, setTocVisibility] = useState(false)

  return (
    <Layout className={className} location={location} title={siteTitle}>
      <SEO
        title={post?.frontmatter?.title ?? "no title"}
        description={post?.excerpt ?? "no description"}
      />
      <DatetimeBreadCrumb date={post?.frontmatter?.date} />

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
