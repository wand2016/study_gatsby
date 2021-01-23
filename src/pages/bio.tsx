import React from "react"
import { graphql } from "gatsby"
import GatsbyImage from "gatsby-image"
import Layout from "@/components/layout"
import SEO from "@/components/seo"

type Props = {
  data: GatsbyTypes.BioPageQuery
}

const Bio: React.FC<Props> = ({ data }) => {
  const siteTitle = data?.site?.siteMetadata?.title ?? "no title"
  const author = data?.site?.siteMetadata?.author
  const social = data?.site?.siteMetadata?.social
  const github = data?.site?.siteMetadata?.siteUrls?.github
  const avatar = data?.avatar?.childImageSharp?.fixed

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="bio" />
      <h1>bio</h1>
      <article>
        {avatar && (
          <GatsbyImage
            fixed={avatar}
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
        <div className="bio-links">
          <ul>
            <li>
              <a href={`https://twitter.com/${social?.twitter ?? ""}`}>
                twitter
              </a>
            </li>
            <li>
              <a href={github}>GitHub</a>
            </li>
          </ul>
        </div>
      </article>
    </Layout>
  )
}

export default Bio

export const pageQuery = graphql`
  query BioPage {
    avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
      childImageSharp {
        fixed(width: 50, height: 50, quality: 95) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        title
        author {
          name
          summary
        }
        description
        siteUrls {
          github
        }
        social {
          twitter
        }
        certifications {
          name
          since
          until
          embed
        }
      }
    }
  }
`
