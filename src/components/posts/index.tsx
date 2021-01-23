import React from "react"
import PostListItem, { PostListItemProp } from "./post-list-item"

type Props = {
  posts: readonly PostListItemProp[]
}
const Posts: React.FC<Props> = ({ posts }) => {
  return (
    <div className="p-grid">
      {posts.length ? (
        posts.map((post, i) => (
          <PostListItem
            key={post?.fields?.slug ?? ""}
            post={post}
            className="p-col-12 p-md-12 p-lg-6"
          />
        ))
      ) : (
        <p>記事がありません</p>
      )}
    </div>
  )
}

export default Posts
