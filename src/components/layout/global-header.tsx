import React from "react"
import { Link } from "gatsby"
import "@/style.scss"
import Search, { Index } from "@/components/search"
import styled from "styled-components"
import Bio from "@/components/bio"

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
      <div className="main-heading">
        <h1 className="title">
          <Link to="/">{title}</Link>
        </h1>
        <Bio className="bio" />
      </div>

      <nav className="top-menu">
        <ul>
          <li>
            <Link to="/">最新記事</Link>
          </li>
          <li>
            <Link to="/time">年月日別記事</Link>
          </li>
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
    background-color: #333;
    color: #eee;
    text-align: center;
    padding: var(--spacing-5);
    margin: 0;
    display: flex;
    align-items: center;

    .title {
      margin: 0;
      color: #eee;
      flex-grow: 1;
    }
    .bio a {
      color: #eee;
    }
  }
  .top-menu > ul {
    display: flex;
    align-items: center;
    list-style: none;
    width: 100%;
    margin: 0 auto;
    border-bottom: 1px solid #ddd;

    > li {
      flex-grow: 1;
      padding: 0 var(--spacing-5);
    }
  }
`
