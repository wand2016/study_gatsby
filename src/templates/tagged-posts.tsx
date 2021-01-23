import React from "react"
import { graphql } from "gatsby"
import Posts from "@/components/posts"
import Layout from "@/components/layout"

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
      <article>
        <section>
          <h3>
            <span className="pi pi-fw pi-tag p-mr-1" />
            {pageTitle}
          </h3>
          <Posts posts={posts} />
        </section>
      </article>
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
