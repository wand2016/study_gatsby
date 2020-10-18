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
  const tags = [
    ...new Set(
      posts.reduce((tags: string[], post) => {
        const nodeTags = (post?.frontmatter?.tags ?? []).filter(isJust)
        return tags.concat(nodeTags)
      }, [])
    ),
  ].sort()

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All Tags" />
      <h1>タグ一覧</h1>
      <ul>
        {tags.map(tag => (
          <li>
            <Link to={`/tags/${tag}`}>{tag}</Link>
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
