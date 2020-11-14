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
  const github = data?.site?.siteMetadata?.siteUrls?.github
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
          {author.name}
          <br />
          {author?.summary ?? ""}
        </p>
      )}
      <p className="bio-links">
        <ul>
          <li>
            <a href={`https://twitter.com/${social?.twitter ?? ""}`}>twitter</a>
          </li>
          <li>
            <a href={github}>GitHub</a>
          </li>
        </ul>
      </p>
    </div>
  )
}

export default styled(Bio)`
  display: flex;

  p {
    margin: 0;
    text-align: left;
  }

  .bio-avatar {
    margin-right: var(--spacing-4);
    margin-bottom: var(--spacing-0);
    min-width: 50px;
    border-radius: 100%;
  }

  .bio-links {
    padding-left: 2em;
    ul {
      margin: 0;
    }
  }
`

export const pageQuery = graphql`
  query Bio {
    avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
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
        siteUrls {
          github
        }
      }
    }
  }
`
