import React from "react"
import { navigate, graphql } from "gatsby"
import Layout from "@/components/layout"
import SEO from "@/components/seo"
import CalendarHeatmap from "react-calendar-heatmap"
import "react-calendar-heatmap/dist/styles.css"
import moment from "moment"
import styled from "styled-components"
import ReactTooltip from "react-tooltip"

type CalenderHeatmapDatum = {
  date: string
  count: number
}
type CalenderHeatmapData = CalenderHeatmapDatum[]

type Props = {
  className?: string
  data: GatsbyTypes.PageQuery
  location: Location
}

const PostsIndex: React.FC<Props> = ({ className, data, location }) => {
  const siteTitle = data?.site?.siteMetadata?.title ?? `no siteTitle`
  const posts = data?.allMarkdownRemark?.nodes
  const seoTitle = `年月日別記事`

  const calenderHeatmapDictionary: Record<string, number> = {}
  const postTitlesDictionary: Record<string, string[]> = {}
  for (const post of posts) {
    const date = moment(post.frontmatter?.date ?? "").format("YYYY-MM-DD")
    calenderHeatmapDictionary[date] = (calenderHeatmapDictionary[date] ?? 0) + 1
    postTitlesDictionary[date] = (postTitlesDictionary[date] ?? []).concat([
      post?.frontmatter?.title ?? "",
    ])
  }

  const calenderHeatmapData: CalenderHeatmapData = Object.entries(
    calenderHeatmapDictionary
  ).map(([date, count]) => ({ date, count }))
  const tipDictionary: Record<string, string> = {}
  Object.entries(postTitlesDictionary).forEach(([date, titles]) => {
    tipDictionary[date] = [date, ...titles].join("<br />")
  })

  return (
    <Layout className={className} location={location} title={siteTitle}>
      <SEO title={seoTitle} />
      SP用のUIは検討中...
      <CalendarHeatmap
        values={calenderHeatmapData}
        classForValue={value =>
          value ? `color-scale-${value.count}` : "color-empty"
        }
        onClick={async (e: CalenderHeatmapDatum | null) => {
          if (!e) {
            return
          }
          await navigate(`/time/${moment(e.date).format("YYYY/MM/DD")}`)
        }}
        tooltipDataAttrs={(e: CalenderHeatmapDatum) => ({
          "data-tip": tipDictionary[e.date] ?? "",
        })}
      />
      <ReactTooltip multiline={true} />
    </Layout>
  )
}

export default styled(PostsIndex)`
  .react-calendar-heatmap .color-scale-1 {
    fill: #d6e685;
  }
  .react-calendar-heatmap .color-scale-2 {
    fill: #8cc665;
  }
  .react-calendar-heatmap .color-scale-3 {
    fill: #44a340;
  }
  .react-calendar-heatmap .color-scale-4 {
    fill: #1e6823;
  }
`

export const pageQuery = graphql`
  query TimePage {
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
          date
          title
          tags
        }
      }
    }
  }
`
