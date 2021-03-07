import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

type MetaProps = JSX.IntrinsicElements["meta"]
export type SEOProps = {
  description?: string
  lang?: string
  meta?: MetaProps[]
  pageTitle: string
}
const SEO: React.FC<SEOProps> = ({
  description,
  lang = "ja",
  meta = [],
  pageTitle,
}) => {
  const { site } = useStaticQuery<GatsbyTypes.SiteQuery>(pageQuery)

  const metaDescription =
    (description || site?.siteMetadata?.description) ?? "no description"
  const defaultTitle = site?.siteMetadata?.title
  const defaultMeta: MetaProps[] = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: pageTitle,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: site?.siteMetadata?.social?.twitter || ``,
    },
    {
      name: `twitter:title`,
      content: pageTitle,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
  ]

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={pageTitle}
      titleTemplate={`%s | ${defaultTitle}`}
      meta={defaultMeta.concat(meta || [])}
    />
  )
}

export default SEO

export const pageQuery = graphql`
  query Site {
    site {
      siteMetadata {
        title
        description
        social {
          twitter
        }
      }
    }
  }
`
