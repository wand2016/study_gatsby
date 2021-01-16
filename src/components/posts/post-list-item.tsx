import React from "react"
import { Link } from "gatsby"
import Tags from "@/components/tags"
import styled from "styled-components"
import { isJust } from "@/utils/assertions"
import moment from "moment"
import { Card } from "primereact/card"

type Post = GatsbyTypes.PageQuery["allMarkdownRemark"]["nodes"][number]
type Props = {
  className?: string
  post: Post
}
const PostListItem: React.FC<Props> = ({ className, post }) => {
  const slug = post?.fields?.slug
  const title = post?.frontmatter?.title ?? slug
  const date = post?.frontmatter?.date
  const dateLocal = date ? moment(date).local() : undefined
  const tags = post?.frontmatter?.tags

  return (
    <div className={className}>
      <Link to={slug ?? "/"} style={{ textDecoration: "none" }}>
        <Card
          key={slug}
          title={title ?? "untitled"}
          subTitle={dateLocal?.format("YYYY-MM-DD HH:mm:ss")}
          style={{ marginBottom: "1em" }}
        >
          <section>{tags && <Tags tags={tags.filter(isJust)} />}</section>
        </Card>
      </Link>
    </div>
  )
}

export default PostListItem
