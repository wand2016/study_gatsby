import React, { useEffect, useState } from "react"
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

  type BadgeInnerHTMLs = Record<string, string | undefined>
  const [badgeInnerHTMLs, setBadgeInnerHTMLs] = useState<BadgeInnerHTMLs>({})

  const updateBadgeInnerHTMLs = () => {
    const badgeInnerHTMLs: BadgeInnerHTMLs = {}
    document.querySelectorAll(".badge-placeholder").forEach(badgeElem => {
      const name = (badgeElem as HTMLBaseElement).dataset.name
      badgeInnerHTMLs[name ?? ""] = badgeElem.innerHTML
    })
    setBadgeInnerHTMLs(badgeInnerHTMLs)
  }

  useEffect(() => {
    const script = document.createElement("script")
    script.setAttribute("type", "text/javascript")
    script.src = "https://www.youracclaim.com/assets/utilities/embed.js"

    // バッジのdivがiframeに置換されたあとで
    script.addEventListener("load", updateBadgeInnerHTMLs)

    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="bio" />
      <article>
        <section>
          <h3>About Me</h3>
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
          <ul>
            <li>
              <a
                href={`https://twitter.com/${social?.twitter ?? ""}`}
                target="_blank"
              >
                twitter
              </a>
            </li>
            <li>
              <a href={github} target="_blank">
                GitHub
              </a>
            </li>
          </ul>
        </section>
        <section>
          <h3>保有資格</h3>
          <DataTable
            value={certifications}
            sortField={"since"}
            sortOrder={-1}
            dataKey={"name"}
          >
            <Column field="name" header="資格名" sortable />
            <Column field="since" header="取得日" sortable />
            <Column field="until" header="失効日" sortable />
            <Column
              field="embed"
              header="バッジ"
              body={(data: Certification) => (
                <div
                  dangerouslySetInnerHTML={{
                    __html: badgeInnerHTMLs[data.name ?? ""] ?? "",
                  }}
                />
              )}
            />
          </DataTable>
        </section>
      </article>
      <aside>
        {
          // youracclaimのスクリプトでdivタグをiframeに置換したものを保持する用
          certifications.map(cert => (
            <div
              key={cert.name}
              className="badge-placeholder"
              data-name={cert.name}
              dangerouslySetInnerHTML={{ __html: cert.embed ?? "" }}
              style={{ display: "none" }}
            />
          ))
        }
      </aside>
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
