import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

type Props = {
  className?: string
  tags: string[]
}

const Tags: React.FC<Props> = ({ className, tags }) => {
  if (tags.length === 0) {
    return null
  }

  const cpy = [...tags]
  cpy.sort()

  return (
    <ul className={className}>
      {cpy.map(tag => (
        <li>
          <Link className="Tag" to={`/tags/${tag}/`}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default styled(Tags)`
  font-size: 1rem;
  line-height: 1;
  display: flex;
  list-style: none;

  li {
    font-size: inherit;
    line-height: inherit;
    border: 1px solid grey;
    border-radius: 0.75rem;
    padding: 0.25rem 0.25rem;
    transition: background-color 0.2s;

    &:not(:first-child) {
      margin-left: 0.5rem;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    &:hover {
      background-color: #eee;
    }
  }
`
