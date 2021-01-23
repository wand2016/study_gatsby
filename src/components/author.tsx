import React from "react"
import GatsbyImage, { FixedObject } from "gatsby-image"

type PropsType = {
  author: Partial<{
    avatar: FixedObject
    name: string
    summary: string
    social: Partial<{
      twitter: string
    }>
    github: string
  }>
}
const author: React.FC<PropsType> = ({ author }) => {
  return (
    <>
      {author.avatar && (
        <GatsbyImage
          fixed={author.avatar}
          alt={author?.name ?? ""}
          className="bio-avatar"
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      )}
      {author?.name && (
        <div className="bio-description">
          {author.name}
          <br />
          {author?.summary ?? ""}
        </div>
      )}
      <ul>
        <li>
          <a
            href={`https://twitter.com/${author.social?.twitter ?? ""}`}
            target="_blank"
          >
            twitter
          </a>
        </li>
        <li>
          <a href={author.github} target="_blank">
            GitHub
          </a>
        </li>
      </ul>
    </>
  )
}

export default author
