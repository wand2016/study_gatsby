import React from "react"
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LineShareButton,
  LineIcon,
} from "react-share"
import { Button } from "primereact/button"

type Just<T> = T extends undefined ? never : T
type PropsType = {
  location: Location
  post: Just<GatsbyTypes.BlogPostBySlugQuery["markdownRemark"]>
  onTocShown: () => unknown
}
const PostFooterMenu: React.FC<PropsType> = ({
  location,
  post,
  onTocShown,
}) => {
  const url = location.href
  const iconSize = 28

  return (
    <footer className="p-p-3">
      <div className="p-d-flex">
        <div className="p-d-inline-flex">
          <TwitterShareButton url={url} title={post?.frontmatter?.title}>
            <TwitterIcon round size={iconSize} />
          </TwitterShareButton>
        </div>
        <div className="p-d-inline-flex p-ml-2">
          <FacebookShareButton url={url} quote={post?.excerpt}>
            <FacebookIcon round size={iconSize} />
          </FacebookShareButton>
        </div>
        <div className="p-d-inline-flex p-ml-2">
          <LineShareButton url={url}>
            <LineIcon round size={iconSize} />
          </LineShareButton>
        </div>
        {post.tableOfContents ? (
          <div className="p-d-inline-flex p-ml-auto">
            <Button
              icon="pi pi-list"
              onClick={() => onTocShown()}
              label="目次"
            />
          </div>
        ) : null}
      </div>
    </footer>
  )
}

export default PostFooterMenu
