import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "@/components/layout"
import SEO from "@/components/seo"
import { isJust } from "@/utils/assertions"

type Props = {
  data: GatsbyTypes.PageQuery
  location: Location
}

const NotFoundPage: React.FC<Props> = ({ data, location }) => {
  const siteTitle = data?.site?.siteMetadata?.title ?? "no title"
  const posts = data?.allMarkdownRemark.nodes ?? []

  const tagCounts: Record<string, number> = {}
  for (const post of posts) {
    const nodeTags = (post?.frontmatter?.tags ?? []).filter(isJust)
    for (const nodeTag of nodeTags) {
      tagCounts[nodeTag] = (tagCounts[nodeTag] ?? 0) + 1
    }
  }
  const tags = Object.keys(tagCounts).sort()

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="タグ別記事" />
      <h1>タグ一覧</h1>
      <ul>
        {tags.map(tag => (
          <li>
            <Link to={`/tags/${tag}`}>
              {tag} ({tagCounts[tag]})
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query AllTags {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          tags
        }
      }
    }
  }
`
