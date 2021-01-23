import React from "react"
import { graphql } from "gatsby"
import Posts from "@/components/posts"
import Layout from "@/components/layout"
import { Panel } from "primereact/panel"

type Props = {
  data: GatsbyTypes.LatestQuery
}
const PostsIndex: React.FC<Props> = ({ data }) => {
  const posts = data?.allMarkdownRemark?.nodes ?? []
  const pageTitle = "最新記事"
  return (
    <Layout pageTitle={pageTitle}>
      <Panel header={pageTitle}>
        <Posts posts={posts} />
      </Panel>
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
