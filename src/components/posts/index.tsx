import React from "react"
import PostListItem, { PostListItemProp } from "./post-list-item"

type Props = {
  posts: readonly PostListItemProp[]
}
const Posts: React.FC<Props> = ({ posts }) => {
  if (posts.length === 0) {
    return <p>記事がありません</p>
  }

  return (
    <div className="p-grid">
      {posts.map((post, i) => (
        <PostListItem
          key={post?.fields?.slug ?? ""}
          post={post}
          className="p-col-12 p-md-12 p-lg-6"
        />
      ))}
    </div>
  )
}

export default Posts
