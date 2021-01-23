import React from "react"
import { graphql } from "gatsby"
import Layout from "@/components/layout"
import { isJust } from "@/utils/assertions"
import Author from "@/components/author"
import Certifications from "@/components/certifications"
import { Panel } from "primereact/panel"

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
  const certifications: Certification[] = (
    data?.site?.siteMetadata?.certifications ?? []
  ).filter(isJust)

  return (
    <Layout pageTitle="bio">
      <article>
        <Panel
          header={() => (
            <>
              <span className="pi pi-fw pi-user p-mr-1" /> About Me
            </>
          )}
          className="p-mb-3"
        >
          <Author
            author={{
              avatar: data?.avatar?.childImageSharp?.fixed,
              name: data?.site?.siteMetadata?.author?.name ?? "",
              summary: data?.site?.siteMetadata?.author?.summary ?? "",
              social: {
                twitter: data?.site?.siteMetadata?.social?.twitter,
              },
              github: data?.site?.siteMetadata?.siteUrls?.github,
            }}
          />
        </Panel>
        <Panel
          header={() => (
            <>
              <span className="pi pi-fw pi-pencil p-mr-1" /> 保有資格
            </>
          )}
        >
          <Certifications certifications={certifications} />
        </Panel>
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
