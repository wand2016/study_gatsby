import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "@/components/layout"
import { isJust } from "@/utils/assertions"
import { Panel } from "primereact/panel"
import { Tag } from "primereact/tag"

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
      <Panel
        header={() => (
          <>
            <span className="pi pi-fw pi-tags p-mr-1" />
            タグ一覧
          </>
        )}
      >
        <div style={{ lineHeight: 2 }}>
          {tags.map((tag, i) => (
            <Link
              key={i}
              to={`/tags/${tag}`}
              style={{ textDecoration: "none" }}
            >
              <Tag
                rounded
                className="p-mr-1"
                value={`${tag} (${tagCounts[tag]})`}
              />
            </Link>
          ))}
        </div>
      </Panel>
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
