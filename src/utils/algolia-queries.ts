import escapeStringRegexp from "escape-string-regexp"
const pagePath = "content/blog"
const indexName = process.env.GATSBY_ALGOLIA_INDEX
const pageQuery = `
{
  pages: allMarkdownRemark(
    filter: {
      fileAbsolutePath: { regex: "/${escapeStringRegexp(pagePath)}/" },
    }
  ) {
    edges {
      node {
        id
        frontmatter {
          title
        }
        fields {
          slug
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`

function pageToAlgoliaRecord({
  node: { id, frontmatter, fields, ...rest },
}: {
  node: GatsbyTypes.MarkdownRemark
}) {
  return {
    objectID: id,
    ...frontmatter,
    ...fields,
    ...rest,
  }
}

export default [
  {
    query: pageQuery,
    // TODO: 型
    transformer: ({ data }: { data: any }) =>
      data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
]
