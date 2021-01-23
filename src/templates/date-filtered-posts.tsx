import React from "react"
import { graphql } from "gatsby"
import Posts from "@/components/posts"
import Layout from "@/components/layout"
import SEO from "@/components/seo"
import moment from "moment"

type Props = {
  data: GatsbyTypes.DateFilteredPostsQuery
  pageContext: GatsbyTypes.SitePageContext
}
const DateFilteredPostsIndex: React.FC<Props> = ({ data, pageContext }) => {
  const siteTitle = data?.site?.siteMetadata?.title ?? `no siteTitle`
  const posts = data?.allMarkdownRemark?.nodes
  const periodStart = moment(pageContext.periodStart)
  const periodEnd = moment(pageContext.periodEnd)

  const period = `${periodStart.format("YYYY/MM/DD")} - ${periodEnd.format(
    "YYYY/MM/DD"
  )}`
  const seoTitle = `posts during ${period}`

  return (
      <SEO title={seoTitle} />
      {seoTitle}
    <Layout title={siteTitle}>
      <Posts posts={posts} />
    </Layout>
  )
}

export default DateFilteredPostsIndex

export const pageQuery = graphql`
  query DateFilteredPosts($periodStart: Date!, $periodEnd: Date!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { date: { gte: $periodStart, lte: $periodEnd } } }
    ) {
      totalCount
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
