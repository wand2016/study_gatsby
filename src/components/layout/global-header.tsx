import React from "react"
import { Link } from "gatsby"
import "@/style.scss"
import Search, { Index } from "@/components/search"

const searchIndices: Index[] = [
  {
    name: process.env.GATSBY_ALGOLIA_INDEX ?? "Pages",
    title: "Pages",
  },
]

type Props = {
  className?: string
  location: Location
  title: string
}

const GlobalHeader: React.FC<Props> = ({ className, location, title }) => {
  const tagsPath = `${__PATH_PREFIX__}/tags`
  const isTagsPath = location.pathname === tagsPath

  return (
    <header className={className}>
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>

      <Search indices={searchIndices} />
      <br />
      {!isTagsPath ? <Link to="/tags">タグ一覧</Link> : null}
    </header>
  )
}

export default GlobalHeader
