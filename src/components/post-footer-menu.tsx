import React, { useState } from "react"
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LineShareButton,
  LineIcon,
} from "react-share"
import Toc from "@/components/toc"

type Just<T> = T extends undefined ? never : T
type PropsType = {
  location: Location
  post: Just<GatsbyTypes.BlogPostBySlugQuery["markdownRemark"]>
}
const PostFooterMenu: React.FC<PropsType> = ({ location, post }) => {
  const [tocVisibility, setTocVisibility] = useState(false)
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
            <Toc
              content={post.tableOfContents}
              visibility={tocVisibility}
              onShow={() => setTocVisibility(true)}
              onHide={() => setTocVisibility(false)}
            />
          </div>
        ) : null}
      </div>
    </footer>
  )
}

export default PostFooterMenu
