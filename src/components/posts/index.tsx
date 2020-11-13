import React from "react"
import PostListItem from "./post-list-item"
import styled from "styled-components"

type Props = {
  className?: string
  posts: GatsbyTypes.PageQuery["allMarkdownRemark"]["nodes"]
}

const Posts: React.FC<Props> = ({ className, posts }) => {
  if (posts.length === 0) {
    return <p>記事がありません</p>
  }

  return (
    <ol className={className}>
      {posts.map(post => (
        <PostListItem post={post} />
      ))}
    </ol>
  )
}

export default styled(Posts)`
  list-style: none;
  padding-left: 0;

  > li:not(:first-child) {
    border-top: 1px solid silver;
  }
`
