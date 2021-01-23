import React, { useEffect } from "react"
import { graphql } from "gatsby"
import GatsbyImage from "gatsby-image"
import Layout from "@/components/layout"
import SEO from "@/components/seo"
import { DataTable } from "primereact/datatable"
import { isJust } from "@/utils/assertions"
import { Column } from "primereact/column"

type Props = {
  data: GatsbyTypes.BioPageQuery
}

type Certification = {
  name?: string
  since?: string
  until?: string
  embed?: string
}

const Bio: React.FC<Props> = ({ data }) => {
  const siteTitle = data?.site?.siteMetadata?.title ?? "no title"
  const author = data?.site?.siteMetadata?.author
  const social = data?.site?.siteMetadata?.social
  const github = data?.site?.siteMetadata?.siteUrls?.github
  const avatar = data?.avatar?.childImageSharp?.fixed

  const certifications: Certification[] = (
    data?.site?.siteMetadata?.certifications ?? []
  ).filter(isJust)

  useEffect(() => {
    const script = document.createElement("script")
    script.setAttribute("type", "text/javascript")
    script.src = "https://www.youracclaim.com/assets/utilities/embed.js"
    document.head.appendChild(script)
  }, [])

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
        <DataTable value={certifications}>
          <Column field="name" header="資格名" sortable />
          <Column field="since" header="取得日" sortable />
          <Column field="until" header="失効日" sortable />
          <Column
            field="embed"
            header="バッジ"
            body={(data: Certification) => (
              <div
                key={Date()}
                dangerouslySetInnerHTML={{
                  __html: decodeURIComponent(data.embed ?? ""),
                }}
              />
            )}
          />
        </DataTable>
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
