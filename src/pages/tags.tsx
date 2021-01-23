import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "@/components/layout"
import { isJust } from "@/utils/assertions"

type Props = {
  data: GatsbyTypes.AllTagsQuery
}
const NotFoundPage: React.FC<Props> = ({ data }) => {
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
    <Layout pageTitle="タグ別記事">
      <h1>タグ一覧</h1>
      <ul>
        {tags.map((tag, i) => (
          <li key={i}>
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          tags
        }
      }
    }
  }
`
