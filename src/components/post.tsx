import React from "react"
import Tags from "@/components/tags"
import { isJust } from "@/utils/assertions"
import DatetimeBreadCrumb from "@/components/datetime-bread-crumb"
import styled from "styled-components"
import { Card } from "primereact/card"

type Just<T> = T extends undefined ? never : T
type Post = Just<GatsbyTypes.BlogPostBySlugQuery["markdownRemark"]>
type Props = {
  className?: string
  post: Post
}

const Post: React.FC<Props> = ({ className, post }) => {
  const tags = (post.frontmatter?.tags ?? []).filter(isJust)

  const bibliographies = post.frontmatter?.bibliography
    ? [post.frontmatter?.bibliography]
    : post.frontmatter?.bibliographies ?? []

  return (
    <>
      {post.frontmatter?.date ? (
        <DatetimeBreadCrumb date={post.frontmatter?.date} />
      ) : null}

      <article
        className={className}
        itemScope
        itemType="http://schema.org/Article"
      >
        <section className="p-p-3">
          <h1 itemProp="headline">{post.frontmatter?.title}</h1>
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
        </section>
        <Card>
          <section
            className="markdown-body"
            dangerouslySetInnerHTML={{
              __html: post.html ?? "no content",
            }}
            itemProp="articleBody"
          />
        </Card>
      </article>
    </>
  )
}

export default styled(Post)`
  .markdown-body {
    background-color: var(--surface-a);
  }
`
