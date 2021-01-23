import React from "react"
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LineShareButton,
  LineIcon,
} from "react-share"
import styled from "styled-components"

type PostProp = GatsbyTypes.BlogPostBySlugQuery["markdownRemark"]
type Props = {
  className?: string
  location: Location
  post: PostProp
}

const Share: React.FC<Props> = ({ className, location, post }) => {
  const url = location.href
  const iconSize = 36

  return (
    <ul className={className}>
      <li>
        <TwitterShareButton url={url} title={post?.frontmatter?.title}>
          <TwitterIcon round size={iconSize} />
        </TwitterShareButton>
      </li>
      <li>
        <FacebookShareButton url={url} quote={post?.excerpt}>
          <FacebookIcon round size={iconSize} />
        </FacebookShareButton>
      </li>
      <li>
        <LineShareButton url={url}>
          <LineIcon round size={iconSize} />
        </LineShareButton>
      </li>
    </ul>
  )
}

export default styled(Share)`
  list-style: none;
  display: flex;

  li:not(:first-child) {
    margin-left: var(--spacing-2);
  }
`
