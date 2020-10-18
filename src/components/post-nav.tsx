import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

type Props = {
  className?: string
} & Pick<GatsbyTypes.SitePageContext, "previous" | "next">

const PostNav: React.FC<Props> = ({ className, previous, next }) => (
  <nav className={className}>
    <ul className="List">
      {next && (
        <li className="next">
          <Link to={next?.fields?.slug ?? "no slug"} rel="next">
            {next?.frontmatter?.title}
          </Link>
        </li>
      )}
      {previous && (
        <li className="previous">
          <Link to={previous?.fields?.slug ?? "no slug"} rel="prev">
            {previous?.frontmatter?.title}
          </Link>
        </li>
      )}
    </ul>
  </nav>
)

export default styled(PostNav)`
  .List {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
    padding: 0;
    margin: var(--spacing-0);

    .previous::before {
      content: "Previous: ";
    }

    .next::before {
      content: "Next: ";
    }
  }
`
