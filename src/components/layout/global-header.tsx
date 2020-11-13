import React from "react"
import { Link } from "gatsby"
import "@/style.scss"
import Search, { Index } from "@/components/search"
import styled from "styled-components"

const searchIndices: Index[] = [
  {
    name: process.env.GATSBY_ALGOLIA_INDEX ?? "Pages",
    title: "Pages",
  },
]

type Props = {
  className?: string
  title: string
}

const GlobalHeader: React.FC<Props> = ({ className, title }) => {
  return (
    <header className={className}>
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>

      <nav className="top-menu">
        <ul>
          <li>
            <Link to="/">最新記事</Link>
          </li>
          <li>年月別記事</li>
          <li>
            <Link to="/tags">タグ別記事</Link>
          </li>
          <li>
            <Search indices={searchIndices} />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default styled(GlobalHeader)`
  .main-heading {
    text-align: center;
  }
  .top-menu > ul {
    display: flex;
    align-items: center;
    list-style: none;
    width: 100%;

    > li {
      flex-grow: 1;
    }
  }
`
