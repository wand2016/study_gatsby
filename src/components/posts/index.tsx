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
    <>
      {posts.map((post, i) => (
        <PostListItem key={i} post={post} />
      ))}
    </>
  )
}

export default styled(Posts)``
