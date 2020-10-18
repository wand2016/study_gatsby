import { GatsbyNode } from "gatsby"
import { isJust } from "../../src/utils/assertions"

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions

  // Get all markdown blog posts sorted by date
  const result = await graphql<GatsbyTypes.Query>(
    `
      query Markdown {
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
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  await (async () => {
    // Define a template for blog post
    const blogPost = require.resolve(`../../src/templates/blog-post.tsx`)

    const posts = result?.data?.allMarkdownRemark.nodes ?? []
    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1]
      const next = index === 0 ? null : posts[index - 1]

      createPage({
        path: post.fields?.slug ?? "",
        component: blogPost,
        context: {
          slug: post.fields?.slug ?? "",
          previous,
          next,
        },
      })
    })
  })()

  await (async () => {
    const posts = result?.data?.allMarkdownRemark.nodes ?? []
    const tags = [
      ...new Set(
        posts.reduce((tags: string[], post) => {
          const nodeTags = (post?.frontmatter?.tags ?? []).filter(isJust)
          return tags.concat(nodeTags)
        }, [])
      ),
    ]

    // Define a template for blog post
    const taggedPosts = require.resolve(`../../src/templates/tagged-posts.tsx`)
    ;[...new Set(tags)].forEach(tag => {
      createPage({
        path: `/tags/${tag}/`,
        component: taggedPosts,
        context: {
          tag,
        },
      })
    })
  })()
}
