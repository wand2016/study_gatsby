import React from "react"
import { graphql } from "gatsby"
import Posts from "@/components/posts"
import Layout from "@/components/layout"

type Props = {
  data: GatsbyTypes.LatestQuery
}
const PostsIndex: React.FC<Props> = ({ data }) => {
  const posts = data?.allMarkdownRemark?.nodes ?? []
  const pageTitle = "最新記事"
  return (
    <Layout pageTitle={pageTitle}>
      <article>
        <section>
          <h3>
            <span className="pi pi-fw pi-home p-mr-1" />
            {pageTitle}
          </h3>
          <Posts posts={posts} />
        </section>
      </article>
    </Layout>
  )
}

export default PostsIndex

export const pageQuery = graphql`
  query Latest {
    allMarkdownRemark(
      limit: 10
      sort: { fields: [frontmatter___date], order: DESC }
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
