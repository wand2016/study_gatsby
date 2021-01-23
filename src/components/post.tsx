import React from "react"
import Tags from "@/components/tags"
import { isJust } from "@/utils/assertions"
import DatetimeBreadCrumb from "@/components/datetime-bread-crumb"

type Just<T> = T extends undefined ? never : T
type Post = Just<GatsbyTypes.BlogPostBySlugQuery["markdownRemark"]>
type Props = {
  post: Post
}

const Post: React.FC<Props> = ({ post }) => {
  const tags = (post.frontmatter?.tags ?? []).filter(isJust)

  const bibliographies = post.frontmatter?.bibliography
    ? [post.frontmatter?.bibliography]
    : post.frontmatter?.bibliographies ?? []

  return (
    <article
      className="markdown-body"
      itemScope
      itemType="http://schema.org/Article"
    >
      <header>
        {post.frontmatter?.date ? (
          <DatetimeBreadCrumb date={post.frontmatter?.date} />
        ) : null}
        <h1 itemProp="headline">{post.frontmatter?.title}</h1>
      </header>
      <Tags tags={tags} />
      {bibliographies.length ? (
        <section>
          <h2>出典:&nbsp;</h2>
          <ul>
            {bibliographies.map((bibliography, i) => (
              <li key={`bibliography-${i}`}>
                <a href={bibliography} target="_blank">
                  {bibliography}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <hr />
      <section
        dangerouslySetInnerHTML={{
          __html: post.html ?? "no content",
        }}
        itemProp="articleBody"
      />
    </article>
  )
}

export default Post
