import React from "react"
import { Link } from "gatsby"
import Tags from "@/components/tags"
import styled from "styled-components"
import { isJust } from "@/utils/assertions"
import moment from "moment"

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
    <li key={slug}>
      <article
        className={className}
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h2>
            <Link to={slug ?? "no slug"} itemProp="url">
              <span itemProp="headline">{title ?? "no title"}</span>
            </Link>
          </h2>
          <small>{dateLocal?.format("YYYY-MM-DD HH:mm:ss")}</small>
        </header>
        <section>{tags && <Tags tags={tags.filter(isJust)} />}</section>
      </article>
    </li>
  )
}

export default styled(PostListItem)`
  margin-bottom: var(--spacing-8);
  margin-top: var(--spacing-8);

  p {
    margin-bottom: var(--spacing-0);
  }

  h2 {
    font-size: var(--fontSize-4);
    color: var(--color-primary);
    margin-bottom: var(--spacing-2);
    margin-top: var(--spacing-0);
  }

  header {
    margin-bottom: var(--spacing-4);
  }
`
