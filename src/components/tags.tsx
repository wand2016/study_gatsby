import React from "react"
import { Link } from "gatsby"
import { Tag } from "primereact/tag"

type Props = {
  tags: string[]
}

const Tags: React.FC<Props> = ({ tags }) => {
  if (tags.length === 0) {
    return null
  }

  const cpy = [...tags]
  cpy.sort()

  return (
    <>
      {cpy.map((tag, i) => (
        <Link
          key={i}
          to={`/tags/${tag}/`}
          style={{ textDecoration: "none" }}
          className="p-mr-1"
        >
          <Tag rounded={true} value={tag} />
        </Link>
      ))}
    </>
  )
}

export default Tags
