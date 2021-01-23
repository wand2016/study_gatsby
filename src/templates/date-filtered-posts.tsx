import React from "react"
import { graphql } from "gatsby"
import Posts from "@/components/posts"
import Layout from "@/components/layout"
import moment from "moment"

type Props = {
  data: GatsbyTypes.DateFilteredPostsQuery
  pageContext: GatsbyTypes.SitePageContext
}
const DateFilteredPostsIndex: React.FC<Props> = ({ data, pageContext }) => {
  const posts = data?.allMarkdownRemark?.nodes
  const periodStart = moment(pageContext.periodStart)
  const periodEnd = moment(pageContext.periodEnd)

  const period = `${periodStart.format("YYYY/MM/DD")} - ${periodEnd.format(
    "YYYY/MM/DD"
  )}`
  const pageTitle = `posts during ${period}`

  return (
    <Layout pageTitle={pageTitle}>
      {pageTitle}
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
