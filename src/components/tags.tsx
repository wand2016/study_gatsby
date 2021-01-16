import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { Tag } from "primereact/tag"

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
    <div className={className}>
      {cpy.map((tag, i) => (
        <Link to={`/tags/${tag}/`} style={{ textDecoration: "none" }}>
          <Tag key={i} rounded={true} className="p-mr-1" value={tag} />
        </Link>
      ))}
    </div>
  )
}

export default styled(Tags)``
