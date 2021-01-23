import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "@/components/layout"
import { isJust } from "@/utils/assertions"
import { Tag } from "primereact/tag"

type Props = {
  data: GatsbyTypes.AllTagsQuery
}
const NotFoundPage: React.FC<Props> = ({ data }) => {
  const posts = data?.allMarkdownRemark.nodes ?? []

  function countTags() {
    const tagCounts: Record<string, number> = {}
    for (const post of posts) {
      const nodeTags = (post?.frontmatter?.tags ?? []).filter(isJust)
      for (const nodeTag of nodeTags) {
        tagCounts[nodeTag] = (tagCounts[nodeTag] ?? 0) + 1
      }
    }
    return tagCounts
  }
  const tagCounts = countTags()

  const tags = Object.keys(tagCounts).sort()
  const index: Record<string, string[]> = {}
  for (const tag of tags) {
    const firstLetter = /[a-zA-Z]/.test(tag[0])
      ? tag[0].toUpperCase()
      : "その他"
    if (!index[firstLetter]) {
      index[firstLetter] = []
    }
    index[firstLetter].push(tag)
  }

  return (
    <Layout pageTitle="タグ別記事">
      <article>
        <section>
          <h3>
            <span className="pi pi-fw pi-tags p-mr-1" />
            タグ一覧
          </h3>
          <div>
            {Object.entries(index).map(([key, tags]) => {
              return (
                <section>
                  <h4>{key}</h4>
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
                </section>
              )
            })}
          </div>
        </section>
      </article>
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
