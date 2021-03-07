import { GatsbyNode } from "gatsby"
import { isJust } from "../../src/utils/assertions"
import moment from "moment"

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
              date
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
    tags.forEach(tag => {
      createPage({
        path: `/tags/${tag}/`,
        component: taggedPosts,
        context: {
          tag,
        },
      })
    })
  })()

  // year, year-month, year-month-day

  await (async () => {
    const posts = result?.data?.allMarkdownRemark.nodes ?? []
    const dates = [
      ...new Set(
        posts.reduce((dates: Date[], post) => {
          const date = new Date(post?.frontmatter?.date ?? "")
          return dates.concat(date)
        }, [])
      ),
    ]

    const dateFilteredPosts = require.resolve(
      `../../src/templates/date-filtered-posts.tsx`
    )

    const years = [...new Set(dates.map(date => date.getFullYear()))]
    // 1..12
    const months = [...Array(12).keys()].map((_, i) => i + 1)

    for (const year of years) {
      for (const month of months) {
        createMonthPage(year, month, dateFilteredPosts)
      }
    }
  })()

  function createMonthPage(
    year: number,
    month: number,
    dateFilteredPosts: string
  ) {
    const periodStart = moment()
      .year(year)
      .month(month - 1)
      .startOf("month")
      .toISOString()
    const periodEnd = moment()
      .year(year)
      .month(month - 1)
      .endOf("month")
      .toISOString()
    const monthInPath = ("0" + month).slice(-2)

    createPage({
      path: `/time/${year}/${monthInPath}`,
      component: dateFilteredPosts,
      context: {
        periodStart,
        periodEnd,
      },
    })
  }
}
