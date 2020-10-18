import React from "react"
import styled from "styled-components"
import Tags from "@/components/tags"
import Toc from "@/components/toc"
import { isJust } from "@/utils/assertions"
import moment from "moment"

type Post = GatsbyTypes.BlogPostBySlugQuery["markdownRemark"]
type Props = {
  className?: string
  post: Post
}

const Post: React.FC<Props> = ({ className, post }) => {
  const tags = (post?.frontmatter?.tags ?? []).filter(isJust)
  const date = post?.frontmatter?.date
  const dateLocal = date ? moment(date).local() : undefined

  return (
    <article
      className={className}
      itemScope
      itemType="http://schema.org/Article"
    >
      <header>
        <h1 itemProp="headline">{post?.frontmatter?.title}</h1>
        <p>{dateLocal?.format("YYYY-MM-DD HH:mm:ss")}</p>
      </header>
      <Tags tags={tags} />
      {post?.tableOfContents && <Toc contents={post?.tableOfContents} />}
      {post?.frontmatter?.bibliography && (
        <section>
          出典:&nbsp;
          <a href={post?.frontmatter?.bibliography} target="_blank">
            {post?.frontmatter?.bibliography}
          </a>
        </section>
      )}
      <section
        dangerouslySetInnerHTML={{
          __html: post?.html ?? "no content",
        }}
        itemProp="articleBody"
      />
    </article>
  )
}

export default styled(Post)`
  header h1 {
    margin: var(--spacing-0) var(--spacing-0) var(--spacing-4) var(--spacing-0);
  }

  header p {
    font-size: var(--fontSize-2);
    font-family: var(--font-heading);
  }

  section > ol,
  section > ul {
    padding-left: 2rem;
  }
`
