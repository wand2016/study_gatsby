import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

type Props = {
  className?: string
}

const Bio: React.FC<Props> = ({ className }) => {
  const data = useStaticQuery<GatsbyTypes.BioQuery>(pageQuery)

  const author = data?.site?.siteMetadata?.author
  const social = data?.site?.siteMetadata?.social
  const avatar = data?.avatar?.childImageSharp?.fixed

  return (
    <div className={className}>
      {avatar && (
        <Image
          fixed={avatar}
          alt={author?.name ?? ""}
          className="bio-avatar"
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      )}
      {author?.name && (
        <p className="bio-description">
          <strong>{author.name}</strong>
          <br />
          {author?.summary ?? ""}&nbsp;
          <a href={`https://twitter.com/${social?.twitter ?? ""}`}>twitter</a>
        </p>
      )}
    </div>
  )
}

export default styled(Bio)`
  display: flex;
  margin-bottom: var(--spacing-16);

  .bio-description {
    margin-bottom: var(--spacing-0);
  }

  .bio-avatar {
    margin-right: var(--spacing-4);
    margin-bottom: var(--spacing-0);
    min-width: 50px;
    border-radius: 100%;
  }
`

export const pageQuery = graphql`
  query Bio {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50, quality: 95) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author {
          name
          summary
        }
        social {
          twitter
        }
      }
    }
  }
`
