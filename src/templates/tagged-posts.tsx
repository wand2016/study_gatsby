import React from "react"
import { graphql } from "gatsby"
import Posts from "@/components/posts"
import Layout from "@/components/layout"
import { Panel } from "primereact/panel"

type Props = {
  data: GatsbyTypes.TaggedPostsQuery
  pageContext: GatsbyTypes.SitePageContext
}
const TaggedPostsIndex: React.FC<Props> = ({ data, pageContext }) => {
  const tag = pageContext.tag ?? "no tag"
  const posts = data?.allMarkdownRemark?.nodes
  const pageTitle = `"${tag}" でタグ付けされた記事`

  return (
    <Layout pageTitle={pageTitle}>
      <Panel
        header={() => (
          <>
            <span className="pi pi-fw pi-tag p-mr-1" />
            {pageTitle}
          </>
        )}
      >
        <Posts posts={posts} />
      </Panel>
    </Layout>
  )
}

export default TaggedPostsIndex

export const pageQuery = graphql`
  query TaggedPosts($tag: String) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
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
