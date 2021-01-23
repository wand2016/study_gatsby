import React from "react"
import { navigate, graphql } from "gatsby"
import Layout from "@/components/layout"
import CalendarHeatmap from "react-calendar-heatmap"
import "react-calendar-heatmap/dist/styles.css"
import moment from "moment"
import styled from "styled-components"
import ReactTooltip from "react-tooltip"
import { isJust } from "@/utils/assertions"

type CalenderHeatmapDatum = {
  date: string
  count: number
}
type CalenderHeatmapData = CalenderHeatmapDatum[]

type Props = {
  className?: string
  data: GatsbyTypes.CalendarPageQuery
}

const PostsIndex: React.FC<Props> = ({ className, data }) => {
  const posts = data?.allMarkdownRemark?.nodes

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
  const dates = [
    ...new Set(posts.map(post => post?.frontmatter?.date).filter(isJust)),
  ].sort()
  const startDate = new Date(dates[0])

  return (
    <Layout className={className} pageTitle="日付別記事">
      <article>
        <section>
          <h3>
            <span className="pi pi-fw pi-calendar p-mr-1" />
            日付別記事
          </h3>
          SP用のUIは検討中...
          <div className="outer">
            <div className="inner">
              <CalendarHeatmap
                startDate={startDate}
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
            </div>
          </div>
          <ReactTooltip multiline={true} />
        </section>
      </article>
    </Layout>
  )
}

export default styled(PostsIndex)`
  .react-calendar-heatmap .color-empty {
    fill: var(--surface-d);
  }
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

  .outer {
    height: 160px;
    overflow-x: auto;

    .inner {
      height: 100%;
      > * {
        height: 100%;
      }
    }
  }
`

export const pageQuery = graphql`
  query CalendarPage {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        frontmatter {
          date
          title
        }
      }
    }
  }
`
