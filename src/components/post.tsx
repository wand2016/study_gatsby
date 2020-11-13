import React from "react"
import styled from "styled-components"
import Tags from "@/components/tags"
import { isJust } from "@/utils/assertions"

type Post = GatsbyTypes.BlogPostBySlugQuery["markdownRemark"]
type Props = {
  className?: string
  post: Post
}

const Post: React.FC<Props> = ({ className, post }) => {
  const tags = (post?.frontmatter?.tags ?? []).filter(isJust)

  return (
    <article
      className={className}
      itemScope
      itemType="http://schema.org/Article"
    >
      <header>
        <h1 itemProp="headline">{post?.frontmatter?.title}</h1>
      </header>
      <Tags tags={tags} />
      {post?.frontmatter?.bibliography && (
        <section>
          出典:&nbsp;
          <a href={post?.frontmatter?.bibliography} target="_blank">
            {post?.frontmatter?.bibliography}
          </a>
        </section>
      )}
      <hr />
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
